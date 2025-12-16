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
function floatTo16BitPCM(input: Float32Array): ArrayBuffer {
  const output = new DataView(new ArrayBuffer(input.length * 2));
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
  return output.buffer;
}

function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export class GeminiLiveClient {
  private ai: GoogleGenAI;
  private inputContext: AudioContext | null = null;
  private outputContext: AudioContext | null = null;
  private stream: MediaStream | null = null;
  private processor: ScriptProcessorNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private nextStartTime = 0;
  private isConnected = false;
  private activeAudioSources: AudioBufferSourceNode[] = [];
  private session: any = null;
  private callEndTimer: NodeJS.Timeout | null = null;

  public onStatusChange: (status: 'connecting' | 'listening' | 'speaking' | 'thinking' | 'disconnected' | 'error') => void = () => {};
  public onTranscript: (text: string, isUser: boolean) => void = () => {};
  public onAudioData: (amplitude: number) => void = () => {};

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async connect() {
    if (this.isConnected) return;

    try {
      this.onStatusChange('connecting');

      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      this.inputContext = new AudioContext({ sampleRate: 16000 });
      this.outputContext = new AudioContext({ sampleRate: 24000 });

      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      console.log('Attempting to connect to Gemini Live API...');
      console.log('API Key present:', !!this.ai);
      
      // Try different model names - Live API model names may vary
      // Common model names: 
      // - gemini-2.0-flash-exp (experimental)
      // - gemini-1.5-flash-latest
      // - gemini-2.0-flash-thinking-exp-001
      // - For native audio: gemini-2.0-flash-exp (may support audio natively)
      // If you get invalid_argument errors, try a different model name
      const modelToUse = 'gemini-2.0-flash-exp'; // Try a more standard model name first
      console.log('Using model:', modelToUse);
      console.log('API Key length:', this.ai ? 'present' : 'missing');
      
      // Build config object - start with minimal config to avoid invalid_argument errors
      const config: any = {
        responseModalities: [Modality.AUDIO],
        systemInstruction: SYSTEM_INSTRUCTION,
      };
      
      // Add speech config - common voice names: Aoede, Charon, Fenrir, Kore, Puck
      // If you get invalid_argument, try removing this or using a different voice name
      config.speechConfig = {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Aoede' } }
      };
      
      // Add transcription configs
      config.inputAudioTranscription = {};
      config.outputAudioTranscription = {};
      
      console.log('Connection config:', JSON.stringify(config, null, 2));
      
      // The connect() method returns a promise that resolves to the session
      // We need to handle both the promise and the callbacks
      const sessionPromise = this.ai.live.connect({
        model: modelToUse,
        config,
        callbacks: {
          onopen: async () => {
            console.log('onopen callback fired');
            this.isConnected = true;
            
            // The session should be available from the promise
            try {
              // Wait for the session promise to resolve
              this.session = await sessionPromise;
              console.log('Session obtained in onopen:', this.session ? 'yes' : 'no');
              
              if (!this.session) {
                console.error('Session is null after awaiting promise');
                this.onStatusChange('error');
                return;
              }
            } catch (error) {
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
            
            // Don't send any initial text - let the AI respond naturally to audio input
            // The system instruction should make it introduce itself when it receives audio
            // Sending text immediately might cause invalid_argument errors if the session isn't fully ready
          },

          onmessage: async (msg: LiveServerMessage) => {
            console.log('Message received:', {
              type: typeof msg,
              keys: Object.keys(msg),
              hasServerContent: !!msg.serverContent,
            });
            this.handleMessage(msg);
          },

          onclose: (event?: any) => {
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

          onerror: (err: any) => {
            console.error('=== CONNECTION ERROR ===');
            console.error('Error type:', typeof err);
            console.error('Error message:', err?.message);
            console.error('Error code:', err?.code);
            console.error('Error name:', err?.name);
            console.error('Error stack:', err?.stack);
            console.error('Full error object:', err);
            
            // Handle structured error objects from Gemini API
            if (err?.error) {
              console.error('Error.error:', err.error);
              console.error('Error.details:', err.details);
            }
            
            // Check for specific error types
            if (err?.message?.includes('invalid_argument') || err?.code === 'invalid_argument' || err?.error === 'ERROR_BAD_REQUEST') {
              console.error('Invalid argument error detected - this may be due to:');
              console.error('1. Invalid API key');
              console.error('2. Invalid model name');
              console.error('3. Invalid configuration parameters');
              console.error('4. Empty or malformed input');
            }
            
            console.error('Error JSON:', JSON.stringify(err, null, 2));
            console.error('========================');
            this.onStatusChange('error');
            // Don't disconnect immediately - let onclose handle it
            // This prevents double disconnection
          }
        }
      });
      
      // Also catch any immediate promise rejections from connect()
      // This handles cases where the connection fails synchronously
      sessionPromise.catch((error: any) => {
        console.error('Session promise rejected immediately:', error);
        console.error('This usually means the connection failed before callbacks were set up');
        console.error('Error details:', {
          message: error?.message,
          code: error?.code,
          error: error?.error,
          details: error?.details
        });
        this.onStatusChange('error');
      });
      
    } catch (error: any) {
      console.error('Connection failed:', error);
      console.error('Error message:', error?.message);
      console.error('Error code:', error?.code);
      console.error('Error name:', error?.name);
      console.error('Error stack:', error?.stack);
      
      // Handle structured error objects from Gemini API
      if (error?.error) {
        console.error('Error.error:', error.error);
        console.error('Error.details:', error.details);
        
        // Provide user-friendly error messages
        if (error.error === 'ERROR_BAD_REQUEST') {
          console.error('Bad Request Error - Possible causes:');
          console.error('1. Invalid API key - check VITE_GEMINI_API_KEY');
          console.error('2. Invalid model name - model may not be available');
          console.error('3. Invalid configuration - check API permissions');
        }
      }
      
      console.error('Full error:', JSON.stringify(error, null, 2));
      this.onStatusChange('error');
    }
  }

  private setupAudioInput() {
    if (!this.inputContext || !this.stream) return;

    this.source = this.inputContext.createMediaStreamSource(this.stream);
    this.processor = this.inputContext.createScriptProcessor(4096, 1, 1);

    this.processor.onaudioprocess = (e) => {
      const inputData = e.inputBuffer.getChannelData(0);

      // Calculate amplitude for visualization
      let sum = 0;
      for (let i = 0; i < inputData.length; i++) sum += inputData[i] * inputData[i];
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
        } catch (error: any) {
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

  private async handleMessage(message: LiveServerMessage) {
    // Handle text transcription
    const transcription = message.serverContent?.modelTurn?.parts?.find((part: any) => part.text)?.text ||
                         (message.serverContent as any)?.parts?.find((part: any) => part.text)?.text;

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
    
    if (!audioData && (message.serverContent as any)?.parts) {
      for (const part of (message.serverContent as any).parts) {
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
      } catch (error) {
        console.error('Error playing audio:', error);
        this.onStatusChange('listening');
      }
    }
  }

  private async decodeAudio(base64: string, ctx: AudioContext): Promise<AudioBuffer> {
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

  private interruptAudio() {
    this.activeAudioSources.forEach(source => {
      try {
        source.stop();
      } catch (e) {
        // Source may already be stopped
      }
    });
    this.activeAudioSources = [];
    this.nextStartTime = 0;
    this.onStatusChange('listening');
  }

  private resetCallEndTimer() {
    this.clearCallEndTimer();
    this.callEndTimer = setTimeout(() => {
      this.disconnect();
    }, 30000);
  }

  private clearCallEndTimer() {
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
      } catch (e) {
        console.error('Error disconnecting processor:', e);
      }
      this.processor = null;
    }

    if (this.source) {
      try {
        this.source.disconnect();
      } catch (e) {
        console.error('Error disconnecting source:', e);
      }
      this.source = null;
    }

    if (this.inputContext) {
      try {
        this.inputContext.close();
      } catch (e) {
        console.error('Error closing input context:', e);
      }
      this.inputContext = null;
    }

    if (this.outputContext) {
      try {
        this.outputContext.close();
      } catch (e) {
        console.error('Error closing output context:', e);
      }
      this.outputContext = null;
    }

    if (this.stream) {
      this.stream.getTracks().forEach(track => {
        try {
          track.stop();
        } catch (e) {
          console.error('Error stopping track:', e);
        }
      });
      this.stream = null;
    }

    if (this.session) {
      try {
        if (typeof this.session.close === 'function') {
          await this.session.close();
        } else if (typeof this.session.disconnect === 'function') {
          await this.session.disconnect();
        }
      } catch (e) {
        console.error('Error closing session:', e);
      }
      this.session = null;
    }

    this.onStatusChange('disconnected');
  }
}

