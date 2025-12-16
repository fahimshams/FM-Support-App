import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/AIAssistantPage.tsx
import { useState, useRef, useEffect } from "react";
import Card from "../components/Card";
import Icon from "../components/Icon";
import { GeminiLiveClient } from "../services/geminiLiveService";
export default function AIAssistantPage() {
    const [messages, setMessages] = useState([
        {
            id: "1",
            role: "assistant",
            content: "Hello! I'm your Quick Help assistant from ZOJE Machineries. I can help you with machine problems, maintenance tips, and answer questions about your equipment.\n\nTry asking:\n• 'How do I fix thread breaking?'\n• 'What maintenance does my machine need?'\n• 'Where can I find the user manual?'",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState("chat");
    const [voiceStatus, setVoiceStatus] = useState("idle");
    const [voiceTranscript, setVoiceTranscript] = useState("");
    const [audioAmplitude, setAudioAmplitude] = useState(0);
    const messagesEndRef = useRef(null);
    const liveClientRef = useRef(null);
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
    const handleSend = async (text) => {
        const messageText = text || input.trim();
        if (!messageText)
            return;
        const userMessage = {
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
            const assistantMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.response,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, assistantMessage]);
        }
        catch (error) {
            console.error("Error:", error);
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "I apologize, but I'm having trouble connecting right now. Please try again or contact support.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        }
        finally {
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
            }
            catch (e) {
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
        }
        catch (error) {
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
    const handleKeyPress = (e) => {
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
    return (_jsxs("div", { className: "page-container", children: [_jsx("div", { className: "header-row", children: _jsxs("div", { children: [_jsx("h1", { className: "page-title", children: "Quick Help" }), _jsx("p", { className: "page-subtitle", children: "Get instant help with your machines. Ask questions or get troubleshooting tips." })] }) }), _jsxs("div", { className: "quick-help-layout", children: [_jsxs("div", { className: "quick-help-sidebar", children: [_jsxs(Card, { className: "mode-toggle-card", children: [_jsxs("div", { className: "mode-toggle-group", children: [_jsxs("button", { onClick: () => {
                                                    setMode("chat");
                                                    if (voiceStatus !== "idle" && voiceStatus !== "disconnected") {
                                                        stopVoiceCall();
                                                    }
                                                }, className: `mode-button ${mode === "chat" ? "active" : ""}`, children: [_jsx(Icon, { name: "chat" }), "Chat"] }), _jsxs("button", { onClick: () => {
                                                    setMode("voice");
                                                    if (voiceStatus === "idle" || voiceStatus === "disconnected") {
                                                        startVoiceCall();
                                                    }
                                                }, className: `mode-button ${mode === "voice" ? "active" : ""}`, children: [_jsx(Icon, { name: "contact" }), "Voice"] })] }), mode === "voice" && voiceStatus !== "idle" && voiceStatus !== "disconnected" && (_jsxs("div", { className: "voice-warning", children: [voiceStatus === "connecting" && "🔄 Connecting to AI...", voiceStatus === "listening" && "👂 Listening - speak naturally", voiceStatus === "speaking" && "🗣️ AI is speaking", voiceStatus === "thinking" && "🤔 AI is thinking...", voiceStatus === "error" && "❌ Connection error"] }))] }), _jsxs(Card, { className: "example-questions-card", children: [_jsx("h3", { className: "example-questions-title", children: "Try Asking:" }), _jsx("div", { className: "example-questions-list", children: exampleQuestions.map((question, index) => (_jsxs("button", { onClick: () => {
                                                setInput(question);
                                                handleSend(question);
                                            }, className: "example-question-button", disabled: isLoading, children: [_jsx(Icon, { name: "chat" }), question] }, index))) })] }), _jsxs(Card, { className: "help-tips-card", children: [_jsx("h3", { className: "help-tips-title", children: "\uD83D\uDCA1 Tips" }), _jsxs("ul", { className: "help-tips-list", children: [_jsx("li", { children: "Be specific about your machine model" }), _jsx("li", { children: "Describe the problem clearly" }), _jsx("li", { children: "Include any error messages" }), _jsx("li", { children: "Ask follow-up questions if needed" })] })] })] }), _jsx("div", { className: "quick-help-main", children: mode === "chat" ? (_jsxs(Card, { className: "chat-container", children: [_jsxs("div", { className: "chat-messages", children: [messages.map((message) => (_jsxs("div", { className: `message ${message.role === "user" ? "user-message" : "assistant-message"}`, children: [_jsx("div", { className: "message-avatar", children: message.role === "user" ? (_jsx(Icon, { name: "user" })) : (_jsx("div", { className: "ai-avatar", children: "AI" })) }), _jsxs("div", { className: "message-content", children: [_jsx("div", { className: "message-text", children: message.content }), _jsx("div", { className: "message-time", children: message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })] })] }, message.id))), isLoading && (_jsxs("div", { className: "message assistant-message", children: [_jsx("div", { className: "message-avatar", children: _jsx("div", { className: "ai-avatar", children: "AI" }) }), _jsx("div", { className: "message-content", children: _jsxs("div", { className: "typing-indicator", children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {})] }) })] })), _jsx("div", { ref: messagesEndRef })] }), _jsx("div", { className: "chat-input-container", children: _jsxs("div", { className: "input-wrapper", children: [_jsx("textarea", { value: input, onChange: (e) => setInput(e.target.value), onKeyPress: handleKeyPress, placeholder: "Type your message...", className: "chat-input", rows: 1, disabled: isLoading }), _jsx("button", { onClick: () => handleSend(), disabled: !input.trim() || isLoading, className: "send-button", children: _jsx(Icon, { name: "send" }) })] }) })] })) : (_jsx(Card, { className: "voice-container", children: _jsxs("div", { className: "voice-interface", children: [_jsx("div", { className: `audio-box ${voiceStatus === "listening" ? "listening" : voiceStatus === "speaking" ? "speaking" : voiceStatus === "connecting" ? "listening" : "idle"}`, children: _jsx("div", { className: "audio-box-content", children: voiceStatus === "connecting" ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "audio-icon listening-icon", children: _jsx(Icon, { name: "contact" }) }), _jsx("div", { className: "audio-status", children: "Connecting..." }), _jsxs("div", { className: "audio-waves", children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {})] }), _jsx("p", { className: "audio-hint", children: "Setting up voice connection" })] })) : voiceStatus === "listening" ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "audio-icon listening-icon", children: _jsx(Icon, { name: "contact" }) }), _jsx("div", { className: "audio-status", children: "Listening..." }), _jsxs("div", { className: "audio-waves", style: { opacity: 0.3 + audioAmplitude * 10 }, children: [_jsx("span", { style: { height: `${20 + audioAmplitude * 200}px` } }), _jsx("span", { style: { height: `${20 + audioAmplitude * 200}px` } }), _jsx("span", { style: { height: `${20 + audioAmplitude * 200}px` } }), _jsx("span", { style: { height: `${20 + audioAmplitude * 200}px` } }), _jsx("span", { style: { height: `${20 + audioAmplitude * 200}px` } })] }), voiceTranscript && (_jsxs("div", { className: "voice-transcript-preview listening", children: [_jsx("strong", { children: "You said:" }), " ", voiceTranscript] })), _jsx("p", { className: "audio-hint", children: "Speak naturally - I'm listening" })] })) : voiceStatus === "speaking" ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "audio-icon speaking-icon", children: _jsx(Icon, { name: "contact" }) }), _jsx("div", { className: "audio-status", children: "AI Speaking..." }), _jsxs("div", { className: "audio-waves", children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {})] }), voiceTranscript && (_jsxs("div", { className: "voice-transcript-preview", children: [_jsx("strong", { children: "AI:" }), " ", voiceTranscript] })), _jsx("p", { className: "audio-hint", children: "You can interrupt by speaking" })] })) : voiceStatus === "thinking" ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "audio-icon idle-icon", children: _jsx(Icon, { name: "contact" }) }), _jsx("div", { className: "audio-status", children: "Thinking..." }), _jsxs("div", { className: "typing-indicator", children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {})] }), _jsx("p", { className: "audio-hint", children: "Processing your request" })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "audio-icon idle-icon", children: _jsx(Icon, { name: "contact" }) }), _jsx("div", { className: "audio-status", children: "Ready for Voice Call" }), voiceTranscript && (_jsxs("div", { className: "voice-transcript-preview", children: [_jsx("strong", { children: "Last:" }), " ", voiceTranscript] })), _jsx("p", { className: "audio-hint", children: "Click below to start a natural conversation" })] })) }) }), _jsx("div", { className: "voice-controls-section", children: voiceStatus !== "idle" && voiceStatus !== "disconnected" ? (_jsxs("button", { onClick: stopVoiceCall, className: "voice-control-button stop-button", children: [_jsx(Icon, { name: "close" }), "End Call"] })) : (_jsxs("button", { onClick: startVoiceCall, className: "voice-control-button start-button", children: [_jsx(Icon, { name: "contact" }), "Start Voice Call"] })) })] }) })) })] })] }));
}
//# sourceMappingURL=AIAssistantPage.js.map