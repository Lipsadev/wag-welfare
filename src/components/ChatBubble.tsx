import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <div className="p-4 h-64 overflow-y-auto bg-cream/30">
              <div className="space-y-3">
                {/* Bot Message */}
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-gradient-warm rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-gentle max-w-[80%]">
                    <p className="text-foreground text-sm">
                      Hi! 👋 Ask anything about me and how I can help with dog rescue and adoption!
                    </p>
                  </div>
                </div>

                {/* Welcome Message */}
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-gradient-warm rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-gentle max-w-[80%]">
                    <p className="text-foreground text-sm">
                      I can help you with:
                    </p>
                    <ul className="text-foreground text-sm mt-2 space-y-1">
                      <li>• Reporting rescue cases</li>
                      <li>• Finding dogs for adoption</li>
                      <li>• Donation information</li>
                      <li>• Volunteer opportunities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-white">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Ask anything about me..."
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <button className="bg-gradient-warm text-white p-2 rounded-lg hover:shadow-warm transition-all duration-300">
                  <MessageCircle className="w-4 h-4" />
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