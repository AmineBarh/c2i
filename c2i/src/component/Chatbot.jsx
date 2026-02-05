import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Bot, Send, X, Loader2, MessageCirclePlus } from "lucide-react";

const Chatbot = ({ className }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize with welcome message if empty
  useEffect(() => {
    // Sample initial bot message
    const initialBotMessage = {
      sender: "bot",
      text: "Bonjour! Je suis l'assistant virtuel de C2I & Training. Comment puis-je vous aider aujourd'hui?",
    };

    if (messages.length === 0) {
      setMessages([initialBotMessage]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || "http://localhost:7000"}/api/chat`,
        { message: input },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Add bot response
      const botMessage = {
        sender: "bot",
        text: response.data.reply,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setError(err);

      const errorMessage = {
        sender: "bot",
        text:
          err.response?.data?.error ||
          "Désolé, je rencontre des difficultés techniques. Veuillez réessayer plus tard.",
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearConversation = () => {
    const initialBotMessage = {
      sender: "bot",
      text: "Bonjour! Je suis l'assistant virtuel de C2I & Training. Comment puis-je vous aider aujourd'hui?",
    };
    setMessages([initialBotMessage]);
    setError(null);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4 ${className}`}
    >
      {isOpen && (
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-purplec2i-500 to-orangec2i-500 text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <h3 className="font-semibold text-sm sm:text-base">
                Assistant C2I
              </h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearConversation}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                title="Nouvelle conversation"
              >
                <MessageCirclePlus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                title="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50 min-h-48 sm:min-h-64 md:min-h-80 max-h-96">
            {messages.map((msg, i) => (
              <div
                key={`msg-${i}-${msg.timestamp || Date.now()}`}
                className={`mb-3 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    msg.sender === "user"
                      ? "bg-orangec2i-500 text-white rounded-br-none"
                      : msg.isError
                      ? "bg-red-100 text-red-800 border border-red-200 rounded-bl-none"
                      : "bg-white border border-gray-200 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                  {msg.timestamp && (
                    <div
                      className={`text-xs mt-1 ${
                        msg.sender === "user"
                          ? "text-orangec2i-500"
                          : "text-gray-500"
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none px-3 py-2 text-sm">
                  <div className="flex space-x-2 items-center">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                    <span>Réflexion en cours...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3 bg-white">
            {error && (
              <div className="text-red-500 text-xs mb-2">
                Erreur: {error.message}
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tapez votre message..."
                className="flex-1 border border-gray-300 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purplec2i-500 disabled:opacity-50"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-purplec2i-500 to-orangec2i-500 text-white px-3 py-1 rounded-full disabled:opacity-50 transition-opacity flex items-center justify-center"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              C2I Assistant - Réponses en français uniquement
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-gradient-to-br from-purplec2i-500 to-orangec2i-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${
          isOpen ? "rotate-45" : ""
        }`}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default Chatbot;
