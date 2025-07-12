import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Minimize2, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: Date;
  isTyping?: boolean;
}

export default function EnhancedLiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'नमस्ते! मैं आपका AI असिस्टेंट हूं। मैं आपकी मदद कर सकता हूं:\n\n✓ सरकारी फॉर्म और दस्तावेज़\n✓ बैंकिंग सेवाएं\n✓ ट्रेवल बुकिंग\n✓ प्रिंटिंग सेवाएं\n✓ और भी बहुत कुछ\n\nआप मुझसे हिंदी या English में बात कर सकते हैं। कैसे मदद करूं?',
      sender: 'admin',
      timestamp: new Date()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "end",
        inline: "nearest"
      });
    }
  };

  useEffect(() => {
    // Add a small delay to ensure the message is rendered before scrolling
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [messages]);

  const chatMutation = useMutation({
    mutationFn: async (userMessage: string) => {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userMessage }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Chat API error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      setMessages(prev => prev.filter(m => !m.isTyping).concat([
        {
          id: Date.now().toString(),
          text: data.response || "माफ करें, कोई जवाब नहीं मिला।",
          sender: 'admin',
          timestamp: new Date()
        }
      ]));
    },
    onError: (error) => {
      console.error("Chat mutation error:", error);
      setMessages(prev => prev.filter(m => !m.isTyping).concat([
        {
          id: Date.now().toString(),
          text: "माफ करें, मुझे तकनीकी समस्या हो रही है। कृपया थोड़ी देर बाद कोशिश करें। आप हमसे +91 98765 43210 पर भी संपर्क कर सकते हैं।",
          sender: 'admin',
          timestamp: new Date()
        }
      ]));
    }
  });

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        timestamp: new Date()
      };
      
      const typingMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'AI typing...',
        sender: 'admin',
        timestamp: new Date(),
        isTyping: true
      };

      setMessages(prev => [...prev, newMessage, typingMessage]);
      const messageToSend = message;
      setMessage("");
      
      // Send to AI
      chatMutation.mutate(messageToSend);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full p-3 sm:p-4 shadow-lg animate-pulse"
          size="lg"
        >
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="sr-only">Open AI Chat</span>
        </Button>
        <Badge className="absolute -top-2 -left-2 bg-gradient-to-r from-green-500 to-blue-500 text-white animate-bounce text-xs">
          AI Live
        </Badge>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
      <Card className={`shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-all duration-300 ${
        isMinimized 
          ? 'w-80 sm:w-96 h-16' 
          : 'w-80 sm:w-96 md:w-[420px] lg:w-[480px] h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px]'
      }`}>
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 sm:p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
              <div>
                <CardTitle className="text-sm sm:text-base font-medium">MAHECH ASSISTANT</CardTitle>
                <p className="text-xs sm:text-sm opacity-90">Always here to help!</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-white/20 text-white"
              >
                <Minimize2 className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-white/20 text-white"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(100%-70px)] sm:h-[calc(100%-80px)]">
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-transparent to-blue-50/50 dark:to-gray-900/50 scroll-smooth">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] sm:max-w-xs md:max-w-sm lg:max-w-md ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    }`}>
                      {msg.sender === 'user' ? <User className="h-3 w-3 sm:h-4 sm:w-4" /> : <Bot className="h-3 w-3 sm:h-4 sm:w-4" />}
                    </div>
                    <div
                      className={`px-2 sm:px-3 py-2 sm:py-3 rounded-lg text-xs sm:text-sm relative shadow-md ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      {msg.isTyping ? (
                        <div className="flex items-center space-x-1">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span className="text-xs">AI is thinking...</span>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                      )}
                      <div className={`text-xs mt-1 opacity-70 ${
                        msg.sender === 'user' ? 'text-white' : 'text-gray-500'
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-3 sm:p-4 border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
              <div className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message... / अपना संदेश लिखें..."
                  className="flex-1 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                  disabled={chatMutation.isPending}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!message.trim() || chatMutation.isPending}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 sm:px-4"
                >
                  {chatMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                AI-powered support • Available 24/7
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}