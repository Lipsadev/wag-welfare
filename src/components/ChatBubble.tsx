import { MessageCircle, X, Send } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  text: string;
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

  const getDummyResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('report') || message.includes('rescue')) {
      return "To report a rescue case:\n1. Click 'Report Emergency' on our homepage\n2. Upload a photo of the dog\n3. Add location details\n4. Describe the situation\n5. Submit - we'll notify nearby NGOs immediately! 🚨";
    }
    
    if (message.includes('adopt') || message.includes('adoption')) {
      return "Our adoption process is simple:\n1. Browse available dogs in the Adoption section\n2. Click 'Apply to Adopt' on your chosen pet\n3. Fill out the adoption form\n4. Schedule a meet & greet\n5. Home visit by our volunteers\n6. Finalize adoption! 🏠❤️";
    }
    
    if (message.includes('ngo') || message.includes('nearest') || message.includes('near')) {
      return "To find the nearest NGO:\n1. Enable location access\n2. Check our interactive map\n3. NGOs within 5km will be highlighted\n4. Contact details and ratings are available\n5. You can call them directly from the app! 📍";
    }
    
    if (message.includes('donate') || message.includes('donation')) {
      return "You can help in many ways:\n• ₹500 - Feed a dog for a week\n• ₹1500 - Complete medical checkup\n• ₹5000 - Fund a rescue mission\n• Custom amounts welcome!\nAll donations are 100% transparent with impact tracking! 💝";
    }
    
    if (message.includes('volunteer')) {
      return "Join our volunteer community:\n• Dog feeding drives\n• Rescue operations\n• Adoption events\n• Medical assistance\n• Social media advocacy\nEarn points and climb our leaderboard! 🌟";
    }
    
    return "Thanks for your question! I'm here to help with dog rescue and adoption queries. You can ask me about reporting cases, adoption process, finding NGOs, donations, or volunteering. How else can I assist you? 🐕";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getDummyResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
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
                      <p className="text-sm">{message.text}</p>
                    </div>
                    {!message.isBot && (
                      <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">U</span>
                      </div>
                    )}
                  </div>
                ))}
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
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-warm text-white p-2 rounded-lg hover:shadow-warm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => setInputValue("How do I report a rescue case?")}
                  className="text-xs bg-sage/10 text-sage-dark px-2 py-1 rounded-full hover:bg-sage/20 transition-colors"
                >
                  Report Rescue
                </button>
                <button
                  onClick={() => setInputValue("What is the adoption process?")}
                  className="text-xs bg-sage/10 text-sage-dark px-2 py-1 rounded-full hover:bg-sage/20 transition-colors"
                >
                  Adoption Process
                </button>
                <button
                  onClick={() => setInputValue("Nearest NGO to me?")}
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