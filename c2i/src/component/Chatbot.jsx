import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
<<<<<<< HEAD
import { Bot, Send, X, Loader2, MessageCirclePlus } from "lucide-react";
=======
import { Bot, Send, X } from "lucide-react";
>>>>>>> 03cf32796b1bcee42f0440f4482536ab1002662b

const Chatbot = ({ className }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
<<<<<<< HEAD
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample initial bot message
  const initialBotMessage = {
    sender: "bot",
    text: "Bonjour! Je suis l'assistant virtuel de C2I & Training. Comment puis-je vous aider aujourd'hui?",
  };

  // Initialize with welcome message if empty
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([initialBotMessage]);
    }
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

=======
  const messagesEndRef = useRef(null);

>>>>>>> 03cf32796b1bcee42f0440f4482536ab1002662b
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

<<<<<<< HEAD
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
=======
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:7001/api/chat", {
        message: input,
      });

      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
        },
      ]);
>>>>>>> 03cf32796b1bcee42f0440f4482536ab1002662b
    } finally {
      setIsLoading(false);
    }
  };

<<<<<<< HEAD
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([initialBotMessage]);
    setError(null);
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4 ${className}`}
    >
      {isOpen && (
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-purplec2i-500 to-orangec2i-500 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <h3 className="font-semibold">Assistant C2I</h3>
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
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 h-96">
            {messages.map((msg, i) => (
              <div
                key={`msg-${i}-${msg.timestamp || Date.now()}`}
                className={`mb-4 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
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
              <div className="flex justify-start mb-4">
                <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none px-4 py-2">
                  <div className="flex space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                    <span>Réflexion en cours...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4 bg-white">
            {error && (
              <div className="text-red-500 text-sm mb-2">
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
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purplec2i-500 disabled:opacity-50"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-purplec2i-500 to-orangec2i-500 text-white px-4 py-2 rounded-full disabled:opacity-50 transition-opacity"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
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
=======
  return (
    <div
      className={`flex flex-col w-full max-w-md h-96 bg-white shadow-lg rounded-lg ${className}`}
    >
      <div className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <h3 className="font-semibold">Virtual Assistant</h3>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Bot className="w-10 h-10 mb-2" />
            <p>How can I help you today?</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-4 flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white border border-gray-200 rounded-bl-none"
                }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-4 py-2 rounded-full disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
>>>>>>> 03cf32796b1bcee42f0440f4482536ab1002662b
    </div>
  );
};

export default Chatbot;
