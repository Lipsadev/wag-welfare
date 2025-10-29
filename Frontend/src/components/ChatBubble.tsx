import { MessageCircle, X, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface NGOItem {
  name: string;
  website?: string;
  focus: string;
}

interface Message {
  id: string;
  text?: string;
  ngos?: NGOItem[];
  isBot: boolean;
  timestamp: Date;
}

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! 👋 Ask anything about me and how I can help with dog rescue and adoption!",
      isBot: true,
      timestamp: new Date()
    },
    {
      id: '2',
      text: "I can help you with:\n• Reporting rescue cases\n• Finding dogs for adoption\n• Donation information\n• Volunteer opportunities",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessageToAPI = async (messageText: string) => {
    try {
      const response = await fetch("https://wag-welfare-a0at.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText })
      });
      const data = await response.json();
      return data; // expected to return { reply, ngos? }
    } catch (error) {
      console.error("Chat API error:", error);
      return { reply: "Oops! Something went wrong. Please try again later." };
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText ?? inputValue;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Show "typing..." indicator
    const typingMessage: Message = {
      id: "typing",
      text: "Typing...",
      isBot: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, typingMessage]);

    // Fetch response from backend
    const data = await sendMessageToAPI(text);

    // Remove "typing..." and add actual response
    setMessages(prev => [
      ...prev.filter(m => m.id !== "typing"),
      {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        ngos: data.ngos, // add NGOs if any
        isBot: true,
        timestamp: new Date()
      }
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-warm rounded-full shadow-warm flex items-center justify-center hover:scale-110 transition-transform duration-300 md:w-16 md:h-16"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 text-white md:w-7 md:h-7" />
        </button>
      )}

      {/* Chat Overlay */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-[calc(100vw-3rem)] sm:w-96">
          <div className="bg-white rounded-2xl shadow-warm border border-border overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-warm p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">PawRescue Assistant</h3>
                  <p className="text-white/80 text-xs">Online now</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Content */}
            <div className="p-4 h-80 overflow-y-auto bg-cream/30">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className={`flex items-start space-x-2 ${!message.isBot ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {message.isBot && (
                      <div className="w-8 h-8 bg-gradient-warm rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`rounded-2xl p-3 shadow-gentle max-w-[80%] whitespace-pre-line ${
                      message.isBot
                        ? 'bg-white rounded-tl-sm text-foreground'
                        : 'bg-gradient-warm text-white rounded-tr-sm'
                    }`}>
                      {message.ngos ? (
                        <div className="space-y-1">
                          {message.ngos.map((ngo, idx) => (
                            <div key={idx} className="text-sm">
                              {ngo.website ? (
                                <a
                                  href={ngo.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline"
                                >
                                  {ngo.name}
                                </a>
                              ) : (
                                <span>{ngo.name}</span>
                              )}
                              : {ngo.focus}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                      )}
                    </div>
                    {!message.isBot && (
                      <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">You</span>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-white">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Ask anything about me..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  aria-label="Type your message"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-warm text-white p-2 rounded-lg hover:shadow-warm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => handleSendMessage("How do I report a rescue case?")}
                  className="text-xs bg-sage/10 text-sage-dark px-2 py-1 rounded-full hover:bg-sage/20 transition-colors"
                >
                  Report Rescue
                </button>
                <button
                  onClick={() => handleSendMessage("What is the adoption process?")}
                  className="text-xs bg-sage/10 text-sage-dark px-2 py-1 rounded-full hover:bg-sage/20 transition-colors"
                >
                  Adoption Process
                </button>
                <button
                  onClick={() => handleSendMessage("Nearest NGO to me?")}
                  className="text-xs bg-sage/10 text-sage-dark px-2 py-1 rounded-full hover:bg-sage/20 transition-colors"
                >
                  Find NGO
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBubble;
