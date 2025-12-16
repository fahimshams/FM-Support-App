// src/services/geminiLiveService.ts
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
// System instruction for ZOJE Machineries Support
const SYSTEM_INSTRUCTION = `You are a friendly and helpful AI assistant for ZOJE Machineries Support in Bangladesh. 

Important: The company name is "Z O J E" (spelled Z-O-J-E), pronounced as "ZOJEE" (like "zoh-jee").

Your role is to provide after-sales support for industrial sewing machines and equipment. You help customers with:
- Machine troubleshooting and problem-solving
- Maintenance tips and best practices
- Technical questions about their equipment
- Finding manuals and documentation
- General support inquiries

CRITICAL: When the conversation starts, you MUST introduce yourself first. Say something like:
"Hello! I'm your Quick Help assistant from ZOJE Machineries. I'm here to help you with any questions about your machines, troubleshooting, or maintenance. How can I assist you today?"

Guidelines:
- ALWAYS speak first when the conversation begins - introduce yourself warmly
- Be conversational, warm, and natural - speak like a helpful colleague, not a robot
- Use the company name "ZOJE" (pronounced ZOJEE) when referring to the company
- Be patient and understanding - many customers may not be technically savvy
- Provide step-by-step instructions when helping with problems
- If you don't know something, suggest contacting the support team directly
- Keep responses clear and practical - focus on actionable solutions
- Use simple language that factory workers can understand
- Show empathy when customers are frustrated with machine issues

When speaking:
- Use a natural, conversational tone
- Ask clarifying questions if needed
- Provide encouragement and reassurance
- Be concise but thorough

Remember: You're representing ZOJE (ZOJEE) Machineries, a trusted partner in Bangladesh's garment industry.`;
// Audio Utils for PCM
function floatTo16BitPCM(input) {
    const output = new DataView(new ArrayBuffer(input.length * 2));
    for (let i = 0; i < input.length; i++) {
        const s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
    return output.buffer;
}
function base64ToUint8Array(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}
export class GeminiLiveClient {
    ai;
    inputContext = null;
    outputContext = null;
    stream = null;
    processor = null;
    source = null;
    nextStartTime = 0;
    isConnected = false;
    activeAudioSources = [];
    session = null;
    callEndTimer = null;
    onStatusChange = () => { };
    onTranscript = () => { };
    onAudioData = () => { };
    constructor(apiKey) {
        this.ai = new GoogleGenAI({ apiKey });
    }
    async connect() {
        if (this.isConnected)
            return;
        try {
            this.onStatusChange('connecting');
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.inputContext = new AudioContext({ sampleRate: 16000 });
            this.outputContext = new AudioContext({ sampleRate: 24000 });
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log('Attempting to connect to Gemini Live API...');
            console.log('API Key present:', !!this.ai);
            // Try different model names - Live API might use different naming
            // Note: Live API models might be different from regular API models
            const modelToUse = 'gemini-2.5-flash-native-audio-preview-09-2025';
            console.log('Using model:', modelToUse);
            console.log('API Key length:', this.ai ? 'present' : 'missing');
            const sessionPromise = this.ai.live.connect({
                model: modelToUse,
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Aoede' } }
                    },
                    systemInstruction: SYSTEM_INSTRUCTION,
                    inputAudioTranscription: {},
                    outputAudioTranscription: {},
                },
                callbacks: {
                    onopen: async () => {
                        console.log('onopen callback fired');
                        this.isConnected = true;
                        // Wait for session to be ready - this is critical
                        try {
                            this.session = await sessionPromise;
                            console.log('Session obtained in onopen:', this.session ? 'yes' : 'no');
                            if (!this.session) {
                                console.error('Session is null after awaiting promise');
                                this.onStatusChange('error');
                                return;
                            }
                        }
                        catch (error) {
                            console.error('Error getting session in onopen:', error);
                            this.onStatusChange('error');
                            return;
                        }
                        if (this.outputContext && this.outputContext.state === 'suspended') {
                            await this.outputContext.resume();
                        }
                        // Setup audio input - this starts sending audio data immediately
                        // The connection might need audio input to stay alive
                        this.setupAudioInput();
                        this.resetCallEndTimer();
                        console.log('Connection ready, audio input active');
                        console.log('Session state:', {
                            hasSession: !!this.session,
                            hasSendRealtimeInput: this.session && typeof this.session.sendRealtimeInput === 'function',
                            isConnected: this.isConnected
                        });
                        // Start in listening mode - AI should introduce itself from system instruction
                        this.onStatusChange('listening');
                        // Send a minimal text input to trigger the AI to start
                        // The system instruction tells it to introduce itself
                        // We'll do this after a very short delay to ensure everything is ready
                        setTimeout(async () => {
                            if (!this.isConnected) {
                                console.log('Connection already closed, skipping trigger');
                                return;
                            }
                            try {
                                if (this.session && typeof this.session.sendRealtimeInput === 'function') {
                                    console.log('Sending initial trigger to start conversation...');
                                    // Send minimal text to trigger AI response
                                    // The system instruction will make it introduce itself
                                    await this.session.sendRealtimeInput({ text: '' }); // Empty text just to trigger
                                    console.log('Initial trigger sent');
                                    this.onStatusChange('speaking'); // AI should respond now
                                }
                                else {
                                    console.warn('Session not ready for trigger');
                                }
                            }
                            catch (error) {
                                console.error('Error sending initial trigger:', error);
                                console.error('Error details:', {
                                    message: error?.message,
                                    code: error?.code,
                                    name: error?.name
                                });
                                // Don't change status on error - let user try speaking
                            }
                        }, 500); // Very short delay - just to ensure session is fully ready
                    },
                    onmessage: async (msg) => {
                        console.log('Message received:', {
                            type: typeof msg,
                            keys: Object.keys(msg),
                            hasServerContent: !!msg.serverContent,
                        });
                        this.handleMessage(msg);
                    },
                    onclose: (event) => {
                        console.log('=== CONNECTION CLOSED ===');
                        console.log('isConnected state:', this.isConnected);
                        console.log('Close event:', event);
                        console.log('Close event type:', typeof event);
                        if (event) {
                            console.log('Close event code:', event.code);
                            console.log('Close event reason:', event.reason);
                            console.log('Close event wasClean:', event.wasClean);
                        }
                        console.log('========================');
                        this.clearCallEndTimer();
                        // Don't call disconnect here if we're still trying to connect
                        // The disconnect will be handled by error handler or manual disconnect
                        if (this.isConnected) {
                            this.disconnect();
                        }
                    },
                    onerror: (err) => {
                        console.error('=== CONNECTION ERROR ===');
                        console.error('Error type:', typeof err);
                        console.error('Error message:', err?.message);
                        console.error('Error code:', err?.code);
                        console.error('Error name:', err?.name);
                        console.error('Error stack:', err?.stack);
                        console.error('Full error object:', err);
                        console.error('Error JSON:', JSON.stringify(err, null, 2));
                        console.error('========================');
                        this.onStatusChange('error');
                        // Don't disconnect immediately - let onclose handle it
                        // This prevents double disconnection
                    }
                }
            });
        }
        catch (error) {
            console.error('Connection failed:', error);
            console.error('Error message:', error?.message);
            console.error('Error stack:', error?.stack);
            console.error('Full error:', JSON.stringify(error, null, 2));
            this.onStatusChange('error');
        }
    }
    setupAudioInput() {
        if (!this.inputContext || !this.stream)
            return;
        this.source = this.inputContext.createMediaStreamSource(this.stream);
        this.processor = this.inputContext.createScriptProcessor(4096, 1, 1);
        this.processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            // Calculate amplitude for visualization
            let sum = 0;
            for (let i = 0; i < inputData.length; i++)
                sum += inputData[i] * inputData[i];
            const rms = Math.sqrt(sum / inputData.length);
            this.onAudioData(rms);
            // Interruption detection
            const isUserSpeaking = rms > 0.01;
            if (isUserSpeaking && this.activeAudioSources.length > 0) {
                this.interruptAudio();
                this.resetCallEndTimer();
            }
            // Convert to PCM16 and send
            const pcm16 = floatTo16BitPCM(inputData);
            let binary = '';
            const bytes = new Uint8Array(pcm16);
            for (let i = 0; i < bytes.byteLength; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            const base64 = btoa(binary);
            // Only send if connected and session is ready
            if (!this.isConnected || !this.session) {
                return;
            }
            // Use this.session directly since it's already available
            if (typeof this.session.sendRealtimeInput === 'function') {
                try {
                    this.session.sendRealtimeInput({
                        media: {
                            mimeType: 'audio/pcm;rate=16000',
                            data: base64
                        }
                    });
                    this.resetCallEndTimer();
                }
                catch (error) {
                    // If WebSocket is closed, stop sending
                    if (error?.message?.includes('CLOSING') || error?.message?.includes('CLOSED')) {
                        console.log('WebSocket closed, stopping audio input');
                        return;
                    }
                    console.error('Error sending audio:', error);
                }
            }
        };
        this.source.connect(this.processor);
        this.processor.connect(this.inputContext.destination);
    }
    async handleMessage(message) {
        // Handle text transcription
        const transcription = message.serverContent?.modelTurn?.parts?.find((part) => part.text)?.text ||
            message.serverContent?.parts?.find((part) => part.text)?.text;
        if (transcription) {
            this.onTranscript(transcription, false);
            const lowerText = transcription.toLowerCase();
            const endPhrases = ['goodbye', 'good bye', 'thank you', 'have a great day'];
            if (endPhrases.some(phrase => lowerText.includes(phrase))) {
                setTimeout(() => this.disconnect(), 2000);
            }
        }
        // Handle audio output - check multiple possible paths
        let audioData = null;
        if (message.serverContent?.modelTurn?.parts) {
            for (const part of message.serverContent.modelTurn.parts) {
                if (part.inlineData?.data) {
                    audioData = part.inlineData.data;
                    break;
                }
            }
        }
        if (!audioData && message.serverContent?.parts) {
            for (const part of message.serverContent.parts) {
                if (part.inlineData?.data) {
                    audioData = part.inlineData.data;
                    break;
                }
            }
        }
        console.log('Audio data found:', !!audioData, 'Output context:', !!this.outputContext);
        if (audioData && this.outputContext) {
            try {
                if (this.outputContext.state === 'suspended') {
                    await this.outputContext.resume();
                }
                this.onStatusChange('speaking');
                const audioBuffer = await this.decodeAudio(audioData, this.outputContext);
                if (!audioBuffer || audioBuffer.length === 0) {
                    this.onStatusChange('listening');
                    return;
                }
                this.nextStartTime = Math.max(this.outputContext.currentTime, this.nextStartTime);
                const source = this.outputContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(this.outputContext.destination);
                this.activeAudioSources.push(source);
                source.start(this.nextStartTime);
                this.nextStartTime += audioBuffer.duration;
                source.onended = () => {
                    const index = this.activeAudioSources.indexOf(source);
                    if (index > -1) {
                        this.activeAudioSources.splice(index, 1);
                    }
                    if (this.outputContext && this.outputContext.currentTime >= this.nextStartTime) {
                        this.onStatusChange('listening');
                        this.resetCallEndTimer();
                    }
                };
            }
            catch (error) {
                console.error('Error playing audio:', error);
                this.onStatusChange('listening');
            }
        }
    }
    async decodeAudio(base64, ctx) {
        const uint8Array = base64ToUint8Array(base64);
        const int16Array = new Int16Array(uint8Array.buffer);
        const float32Array = new Float32Array(int16Array.length);
        for (let i = 0; i < int16Array.length; i++) {
            float32Array[i] = int16Array[i] / 32768.0;
        }
        const buffer = ctx.createBuffer(1, float32Array.length, 24000);
        buffer.getChannelData(0).set(float32Array);
        return buffer;
    }
    interruptAudio() {
        this.activeAudioSources.forEach(source => {
            try {
                source.stop();
            }
            catch (e) {
                // Source may already be stopped
            }
        });
        this.activeAudioSources = [];
        this.nextStartTime = 0;
        this.onStatusChange('listening');
    }
    resetCallEndTimer() {
        this.clearCallEndTimer();
        this.callEndTimer = setTimeout(() => {
            this.disconnect();
        }, 30000);
    }
    clearCallEndTimer() {
        if (this.callEndTimer) {
            clearTimeout(this.callEndTimer);
            this.callEndTimer = null;
        }
    }
    async disconnect() {
        this.isConnected = false;
        this.clearCallEndTimer();
        this.interruptAudio();
        if (this.processor) {
            try {
                this.processor.disconnect();
            }
            catch (e) {
                console.error('Error disconnecting processor:', e);
            }
            this.processor = null;
        }
        if (this.source) {
            try {
                this.source.disconnect();
            }
            catch (e) {
                console.error('Error disconnecting source:', e);
            }
            this.source = null;
        }
        if (this.inputContext) {
            try {
                this.inputContext.close();
            }
            catch (e) {
                console.error('Error closing input context:', e);
            }
            this.inputContext = null;
        }
        if (this.outputContext) {
            try {
                this.outputContext.close();
            }
            catch (e) {
                console.error('Error closing output context:', e);
            }
            this.outputContext = null;
        }
        if (this.stream) {
            this.stream.getTracks().forEach(track => {
                try {
                    track.stop();
                }
                catch (e) {
                    console.error('Error stopping track:', e);
                }
            });
            this.stream = null;
        }
        if (this.session) {
            try {
                if (typeof this.session.close === 'function') {
                    await this.session.close();
                }
                else if (typeof this.session.disconnect === 'function') {
                    await this.session.disconnect();
                }
            }
            catch (e) {
                console.error('Error closing session:', e);
            }
            this.session = null;
        }
        this.onStatusChange('disconnected');
    }
}
//# sourceMappingURL=geminiLiveService.js.map