// src/pages/AIAssistantPage.tsx
import { useState, useRef, useEffect } from "react";
import Card from "../components/Card";
import Icon from "../components/Icon";
import { GeminiLiveClient } from "../services/geminiLiveService";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

type Mode = "chat" | "voice";
type VoiceStatus = "idle" | "connecting" | "listening" | "speaking" | "thinking" | "disconnected" | "error";

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your Quick Help assistant from ZOJE Machineries. I can help you with machine problems, maintenance tips, and answer questions about your equipment.\n\nTry asking:\n• 'How do I fix thread breaking?'\n• 'What maintenance does my machine need?'\n• 'Where can I find the user manual?'",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<Mode>("chat");
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>("idle");
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [audioAmplitude, setAudioAmplitude] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const liveClientRef = useRef<GeminiLiveClient | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize Gemini Live Client
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
    if (apiKey && !liveClientRef.current) {
      liveClientRef.current = new GeminiLiveClient(apiKey);
      
      liveClientRef.current.onStatusChange = (status) => {
        setVoiceStatus(status);
      };

      liveClientRef.current.onTranscript = (text, isUser) => {
        setVoiceTranscript(text);
        if (!isUser) {
          // Add AI transcript as message
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: "assistant",
            content: text,
            timestamp: new Date(),
          }]);
        }
      };

      liveClientRef.current.onAudioData = (amplitude) => {
        setAudioAmplitude(amplitude);
      };
    }

    return () => {
      if (liveClientRef.current) {
        liveClientRef.current.disconnect();
      }
    };
  }, []);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I'm having trouble connecting right now. Please try again or contact support.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startVoiceCall = async () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
    
    if (!apiKey) {
      alert("Gemini API key not configured. Please set VITE_GEMINI_API_KEY in your .env file.");
      return;
    }

    console.log('Starting voice call...');
    console.log('API Key present:', !!apiKey);
    console.log('API Key length:', apiKey.length);

    // Always create a new client instance to ensure fresh connection
    if (liveClientRef.current) {
      try {
        await liveClientRef.current.disconnect();
      } catch (e) {
        console.error('Error disconnecting previous client:', e);
      }
    }

    liveClientRef.current = new GeminiLiveClient(apiKey);
    
    liveClientRef.current.onStatusChange = (status) => {
      console.log('Status changed to:', status);
      setVoiceStatus(status);
    };

    liveClientRef.current.onTranscript = (text, isUser) => {
      console.log('Transcript received:', { text, isUser });
      setVoiceTranscript(text);
      if (!isUser) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: "assistant",
          content: text,
          timestamp: new Date(),
        }]);
      }
    };

    liveClientRef.current.onAudioData = (amplitude) => {
      setAudioAmplitude(amplitude);
    };

    try {
      console.log('Calling connect()...');
      await liveClientRef.current.connect();
      console.log('Connect() completed');
    } catch (error) {
      console.error("Error starting voice call:", error);
      console.error("Error details:", error);
      setVoiceStatus("error");
      alert("Failed to start voice call. Please check the console for details.");
    }
  };

  const stopVoiceCall = async () => {
    if (liveClientRef.current) {
      await liveClientRef.current.disconnect();
      setVoiceTranscript("");
      setAudioAmplitude(0);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const exampleQuestions = [
    "How do I fix thread breaking?",
    "What maintenance does my machine need?",
    "Where can I find the user manual?",
    "My machine is making strange noises",
  ];

  return (
    <div className="page-container">
      <div className="header-row">
        <div>
          <h1 className="page-title">Quick Help</h1>
          <p className="page-subtitle">
            Get instant help with your machines. Ask questions or get troubleshooting tips.
          </p>
        </div>
      </div>

      {/* Quick Help Layout */}
      <div className="quick-help-layout">
        {/* Left Column - Quick Actions & Examples */}
        <div className="quick-help-sidebar">
          {/* Mode Toggle */}
          <Card className="mode-toggle-card">
            <div className="mode-toggle-group">
              <button
                onClick={() => {
                  setMode("chat");
                  if (voiceStatus !== "idle" && voiceStatus !== "disconnected") {
                    stopVoiceCall();
                  }
                }}
                className={`mode-button ${mode === "chat" ? "active" : ""}`}
              >
                <Icon name="chat" />
                Chat
              </button>
              <button
                onClick={() => {
                  setMode("voice");
                  if (voiceStatus === "idle" || voiceStatus === "disconnected") {
                    startVoiceCall();
                  }
                }}
                className={`mode-button ${mode === "voice" ? "active" : ""}`}
              >
                <Icon name="contact" />
                Voice
              </button>
            </div>
            {mode === "voice" && voiceStatus !== "idle" && voiceStatus !== "disconnected" && (
              <div className="voice-warning">
                {voiceStatus === "connecting" && "🔄 Connecting to AI..."}
                {voiceStatus === "listening" && "👂 Listening - speak naturally"}
                {voiceStatus === "speaking" && "🗣️ AI is speaking"}
                {voiceStatus === "thinking" && "🤔 AI is thinking..."}
                {voiceStatus === "error" && "❌ Connection error"}
              </div>
            )}
          </Card>

          {/* Example Questions */}
          <Card className="example-questions-card">
            <h3 className="example-questions-title">Try Asking:</h3>
            <div className="example-questions-list">
              {exampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(question);
                    handleSend(question);
                  }}
                  className="example-question-button"
                  disabled={isLoading}
                >
                  <Icon name="chat" />
                  {question}
                </button>
              ))}
            </div>
          </Card>

          {/* Help Tips */}
          <Card className="help-tips-card">
            <h3 className="help-tips-title">💡 Tips</h3>
            <ul className="help-tips-list">
              <li>Be specific about your machine model</li>
              <li>Describe the problem clearly</li>
              <li>Include any error messages</li>
              <li>Ask follow-up questions if needed</li>
            </ul>
          </Card>
        </div>

        {/* Right Column - Chat or Voice Interface */}
        <div className="quick-help-main">
          {mode === "chat" ? (
            <Card className="chat-container">
              <div className="chat-messages">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${message.role === "user" ? "user-message" : "assistant-message"}`}
                  >
                    <div className="message-avatar">
                      {message.role === "user" ? (
                        <Icon name="user" />
                      ) : (
                        <div className="ai-avatar">AI</div>
                      )}
                    </div>
                    <div className="message-content">
                      <div className="message-text">{message.content}</div>
                      <div className="message-time">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="message assistant-message">
                    <div className="message-avatar">
                      <div className="ai-avatar">AI</div>
                    </div>
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="chat-input-container">
                <div className="input-wrapper">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="chat-input"
                    rows={1}
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className="send-button"
                  >
                    <Icon name="send" />
                  </button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="voice-container">
              <div className="voice-interface">
                {/* Audio Visualizer Box */}
                <div className={`audio-box ${voiceStatus === "listening" ? "listening" : voiceStatus === "speaking" ? "speaking" : voiceStatus === "connecting" ? "listening" : "idle"}`}>
                  <div className="audio-box-content">
                    {voiceStatus === "connecting" ? (
                      <>
                        <div className="audio-icon listening-icon">
                          <Icon name="contact" />
                        </div>
                        <div className="audio-status">Connecting...</div>
                        <div className="audio-waves">
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <p className="audio-hint">Setting up voice connection</p>
                      </>
                    ) : voiceStatus === "listening" ? (
                      <>
                        <div className="audio-icon listening-icon">
                          <Icon name="contact" />
                        </div>
                        <div className="audio-status">Listening...</div>
                        <div className="audio-waves" style={{ opacity: 0.3 + audioAmplitude * 10 }}>
                          <span style={{ height: `${20 + audioAmplitude * 200}px` }}></span>
                          <span style={{ height: `${20 + audioAmplitude * 200}px` }}></span>
                          <span style={{ height: `${20 + audioAmplitude * 200}px` }}></span>
                          <span style={{ height: `${20 + audioAmplitude * 200}px` }}></span>
                          <span style={{ height: `${20 + audioAmplitude * 200}px` }}></span>
                        </div>
                        {voiceTranscript && (
                          <div className="voice-transcript-preview listening">
                            <strong>You said:</strong> {voiceTranscript}
                          </div>
                        )}
                        <p className="audio-hint">Speak naturally - I'm listening</p>
                      </>
                    ) : voiceStatus === "speaking" ? (
                      <>
                        <div className="audio-icon speaking-icon">
                          <Icon name="contact" />
                        </div>
                        <div className="audio-status">AI Speaking...</div>
                        <div className="audio-waves">
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        {voiceTranscript && (
                          <div className="voice-transcript-preview">
                            <strong>AI:</strong> {voiceTranscript}
                          </div>
                        )}
                        <p className="audio-hint">You can interrupt by speaking</p>
                      </>
                    ) : voiceStatus === "thinking" ? (
                      <>
                        <div className="audio-icon idle-icon">
                          <Icon name="contact" />
                        </div>
                        <div className="audio-status">Thinking...</div>
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <p className="audio-hint">Processing your request</p>
                      </>
                    ) : (
                      <>
                        <div className="audio-icon idle-icon">
                          <Icon name="contact" />
                        </div>
                        <div className="audio-status">Ready for Voice Call</div>
                        {voiceTranscript && (
                          <div className="voice-transcript-preview">
                            <strong>Last:</strong> {voiceTranscript}
                          </div>
                        )}
                        <p className="audio-hint">Click below to start a natural conversation</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Voice Controls */}
                <div className="voice-controls-section">
                  {voiceStatus !== "idle" && voiceStatus !== "disconnected" ? (
                    <button
                      onClick={stopVoiceCall}
                      className="voice-control-button stop-button"
                    >
                      <Icon name="close" />
                      End Call
                    </button>
                  ) : (
                    <button
                      onClick={startVoiceCall}
                      className="voice-control-button start-button"
                    >
                      <Icon name="contact" />
                      Start Voice Call
                    </button>
                  )}
                </div>

                {/* Instructions */}
                {/* <div className="voice-instructions">
                  <h4 className="instructions-title">How to use Voice Mode:</h4>
                  <ul className="instructions-list">
                    <li>Click "Start Voice Input" to begin</li>
                    <li>Speak clearly in a quiet environment</li>
                    <li>Wait for the AI to process and respond</li>
                    <li>You can stop listening or speaking at any time</li>
                  </ul>
                </div> */}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

