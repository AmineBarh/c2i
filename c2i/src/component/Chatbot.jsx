import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Bot, Send, X } from "lucide-react";

const Chatbot = ({ className }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    } finally {
      setIsLoading(false);
    }
  };

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
    </div>
  );
};

export default Chatbot;
