export declare class GeminiLiveClient {
    private ai;
    private inputContext;
    private outputContext;
    private stream;
    private processor;
    private source;
    private nextStartTime;
    private isConnected;
    private activeAudioSources;
    private session;
    private callEndTimer;
    onStatusChange: (status: 'connecting' | 'listening' | 'speaking' | 'thinking' | 'disconnected' | 'error') => void;
    onTranscript: (text: string, isUser: boolean) => void;
    onAudioData: (amplitude: number) => void;
    constructor(apiKey: string);
    connect(): Promise<void>;
    private setupAudioInput;
    private handleMessage;
    private decodeAudio;
    private interruptAudio;
    private resetCallEndTimer;
    private clearCallEndTimer;
    disconnect(): Promise<void>;
}
//# sourceMappingURL=geminiLiveService.d.ts.map