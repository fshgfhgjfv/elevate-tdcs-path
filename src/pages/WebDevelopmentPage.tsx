import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Rocket, Code, Layout, Smartphone, Zap, Check } from "lucide-react";

export default function WebDevelopmentPage() {
  const navigate = useNavigate();

  const techStack = [
    { name: "React.js", desc: "Interactive UI" },
    { name: "Next.js", desc: "SEO & Performance" },
    { name: "Tailwind", desc: "Modern Styling" },
    { name: "Node.js", desc: "Secure Backend" },
    { name: "Supabase", desc: "Real-time DB" },
    { name: "Framer", desc: "Smooth Animations" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* --- HERO SECTION --- */}
      <div className="relative pt-32 pb-20 px-4">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-500/10 blur-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-indigo-500/10 blur-[100px] -z-10" />

        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <div className="text-blue-600 font-bold tracking-wide mb-2 uppercase text-sm">Full Stack Solutions</div>
                <h1 className="text-5xl font-extrabold leading-tight mb-6">
                  Websites that <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    Drive Business.
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  We don't just write code; we build digital experiences. From lightning-fast landing pages to complex web applications, we ensure security, speed, and scalability.
                </p>
                <div className="flex gap-4">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                        View Portfolio
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => navigate(-1)}>
                        <ArrowLeft className="mr-2 w-4 h-4" /> Back
                    </Button>
                </div>
            </motion.div>

            {/* Visual Right Side */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
            >
                <div className="relative bg-card border border-border shadow-2xl rounded-2xl p-4 md:p-8">
                    {/* Mock Code Block */}
                    <div className="space-y-3 font-mono text-sm">
                        <div className="flex gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <p className="text-blue-500">import <span className="text-foreground">Success</span> from <span className="text-green-500">'./YourBusiness'</span>;</p>
                        <p className="text-purple-500">const <span className="text-yellow-500">Website</span> = () ={">"} {"{"}</p>
                        <p className="pl-4 text-foreground">return (</p>
                        <p className="pl-8 text-foreground">{"<"}<span className="text-red-400">Growth</span></p>
                        <p className="pl-12 text-blue-400">speed=<span className="text-green-400">"100%"</span></p>
                        <p className="pl-12 text-blue-400">security=<span className="text-green-400">"Enterprise"</span></p>
                        <p className="pl-12 text-blue-400">design=<span className="text-green-400">"Modern"</span></p>
                        <p className="pl-8 text-foreground">/{">"}</p>
                        <p className="pl-4 text-foreground">);</p>
                        <p className="text-purple-500">{"}"};</p>
                    </div>
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 shadow-lg p-4 rounded-xl flex items-center gap-3 border border-border">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                        <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <div className="font-bold">99/100</div>
                        <div className="text-xs text-muted-foreground">Performance Score</div>
                    </div>
                </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- TECH STACK GRID --- */}
      <div className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Technology Stack</h2>
                <p className="text-muted-foreground">We use the latest tools to ensure your site is future-proof.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {techStack.map((tech) => (
                    <Card key={tech.name} className="hover:border-blue-500/50 transition-colors cursor-default">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                            <Code className="w-8 h-8 text-blue-500 mb-3 opacity-80" />
                            <h3 className="font-bold text-sm">{tech.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{tech.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>

      {/* --- FEATURES --- */}
      <div className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600">
                      <Layout className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Responsive Design</h3>
                  <p className="text-muted-foreground">Looks perfect on mobile, tablet, and desktop screens.</p>
              </div>
              <div className="space-y-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600">
                      <Rocket className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Speed Optimized</h3>
                  <p className="text-muted-foreground">We aim for sub-second load times using Next.js caching.</p>
              </div>
              <div className="space-y-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600">
                      <Smartphone className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">SEO Ready</h3>
                  <p className="text-muted-foreground">Built with semantic HTML and meta tags to rank higher on Google.</p>
              </div>
          </div>
      </div>

      {/* --- PRICING CTA --- */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Build Your Vision?</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Packages include free domain setup, 1 year of hosting, and SSL security.</p>
              <Button size="lg" variant="secondary" className="font-bold text-blue-600">
                  Request a Quote (Starts at ₹4999)
              </Button>
          </div>
      </div>
    </div>
  );
}