import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, User, Sparkles, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown"; // Optional: Remove if you don't want to install it

// 🔒 Replace this with your key, but keep it out of public repos!
const GEMINI_API_KEY = "YOUR_PASTED_KEY_HERE"; 

interface Message {
  role: "user" | "model"; // Gemini uses 'model', not 'assistant'
  content: string;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: "Hello! I am the TDCS Advanced AI. I can write code, answer questions, and help with security analysis. How can I assist you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const LOGO_URL = "https://blogger.googleusercontent.com/img/a/AVvXsEh6t9BjBO7igeafdAkeEQW1JNA1TAfi2lIR0Nr857ozJmsC-qPIm9m2BbQi8JkDD3TmGVuyKAyxnIc88lETBh18Xia9FqGTkGdtzD7215GLuqRBIhm9UCh7F4FDB9BsKHg78TKGkSUfCtTHefuZ5LwuXqdGLzO50ulgxWj2b-6gGAZJHE15AEKDUnwStMAm";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const streamGeminiChat = async (history: Message[]) => {
    try {
      // Format messages for Gemini API
      // Note: Gemini expects { role: "user", parts: [{ text: "..." }] }
      const contents = history.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:streamGenerateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents }),
        }
      );

      if (!response.ok) throw new Error("Gemini API Error");
      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      // Add empty model message to start streaming into
      setMessages((prev) => [...prev, { role: "model", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        
        // Gemini sends multiple JSON objects in one stream, we need to parse them locally
        // This simple regex splitting handles the standard stream format
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");
        
        for (const line of lines) {
           const cleanedLine = line.replace(/^,/, ""); // Remove leading commas from stream
           try {
             const parsed = JSON.parse(cleanedLine);
             const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
             
             if (text) {
               assistantContent += text;
               setMessages((prev) => {
                 const newMessages = [...prev];
                 newMessages[newMessages.length - 1].content = assistantContent;
                 return newMessages;
               });
             }
           } catch (e) {
             // Stream chunks sometimes arrive incomplete, ignore parse errors
           }
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("AI Connection Failed.");
      setMessages((prev) => prev.slice(0, -1)); // Remove the empty message
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    await streamGeminiChat(updatedMessages);
    
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full h-16 w-16 shadow-2xl bg-black border border-cyan-500/50 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300"
        >
          {isOpen ? <X className="h-6 w-6 text-cyan-400" /> : <Sparkles className="h-6 w-6 text-cyan-400" />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] font-sans"
          >
            <Card className="shadow-2xl backdrop-blur-xl bg-gray-950/90 border border-cyan-500/30 rounded-2xl overflow-hidden flex flex-col h-[600px]">
              
              {/* Header */}
              <div className="p-4 border-b border-cyan-900/50 bg-gradient-to-r from-gray-900 to-gray-950 flex items-center gap-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />
                <div className="relative z-10 flex items-center gap-3">
                    <img
                    src={LOGO_URL}
                    alt="TDCS Logo"
                    className="w-10 h-10 rounded-full border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                    />
                    <div>
                    <h3 className="font-bold text-lg text-white flex items-center gap-2">
                        TDCS AI <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-900 text-cyan-300 border border-cyan-700">PRO</span>
                    </h3>
                    <p className="text-xs text-cyan-400/80 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Systems Online
                    </p>
                    </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "model" && (
                      <div className="w-8 h-8 rounded-full bg-gray-800 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                         <Bot className="w-5 h-5 text-cyan-400" />
                      </div>
                    )}
                    
                    <div
                      className={`rounded-2xl p-3 max-w-[85%] text-sm leading-relaxed shadow-sm ${
                        msg.role === "user"
                          ? "bg-cyan-600 text-white rounded-tr-none"
                          : "bg-gray-800/80 text-gray-100 border border-gray-700 rounded-tl-none"
                      }`}
                    >
                      {/* Markdown Support: If you didn't install react-markdown, change this back to <p>{msg.content}</p> */}
                      {msg.role === "model" ? (
                         <ReactMarkdown 
                            components={{
                                code: ({node, inline, className, children, ...props}: any) => (
                                    <code className={`${className} ${inline ? 'bg-gray-700 px-1 rounded' : 'block bg-black/50 p-2 rounded-md my-2 overflow-x-auto border border-gray-700'}`} {...props}>
                                        {children}
                                    </code>
                                )
                            }}
                         >
                             {msg.content}
                         </ReactMarkdown>
                      ) : (
                         <p>{msg.content}</p>
                      )}
                    </div>

                    {msg.role === "user" && (
                       <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center flex-shrink-0 text-white font-bold shadow-lg">
                         <User className="h-4 w-4" />
                       </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                     <div className="w-8 h-8 rounded-full bg-gray-800 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                         <Bot className="w-5 h-5 text-cyan-400" />
                      </div>
                    <div className="bg-gray-800/50 rounded-2xl rounded-tl-none p-4 border border-gray-700/50">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-75" />
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-150" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-gray-900/50 border-t border-cyan-900/30">
                <div className="relative flex items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about code, security, or TDCS..."
                    disabled={isLoading}
                    className="flex-1 bg-gray-950 border-gray-800 focus-visible:ring-cyan-500/50 text-white placeholder:text-gray-500 pr-10 py-6 rounded-xl"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center mt-2">
                    <span className="text-[10px] text-gray-500">Powered by Google Gemini • TDCS Secure</span>
                </div>
              </div>

            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};