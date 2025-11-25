import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShieldAlert, Terminal, Lock, FileWarning, CheckCircle, Server } from "lucide-react";

export default function PenetrationTestingPage() {
  const navigate = useNavigate();

  const vulnerabilities = [
    "SQL Injection & XSS",
    "Broken Authentication",
    "Sensitive Data Exposure",
    "Misconfiguration",
    "Outdated Components"
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-red-500/30">
      {/* --- HERO SECTION --- */}
      <div className="relative pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-slate-950 to-slate-950 z-0" />
        
        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm mb-6"
          >
            <ShieldAlert className="w-4 h-4" /> Cyber Defense Unit
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Penetration <span className="text-red-500">Testing</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            We simulate sophisticated cyberattacks on your infrastructure to find vulnerabilities before real hackers do. OWASP Standard VAPT.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold">
              Start Security Audit
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate(-1)} className="border-slate-700 text-slate-300 hover:bg-slate-900">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back
            </Button>
          </div>
        </div>
      </div>

      {/* --- TERMINAL / PROCESS SECTION --- */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left: Info */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold border-l-4 border-red-500 pl-4">
              How We Breach (Ethically)
            </h2>
            <div className="space-y-6">
              {[
                { title: "Reconnaissance", desc: "Gathering intel: IP addresses, employee emails, tech stack." },
                { title: "Scanning", desc: "Using automated tools to find open ports and weak endpoints." },
                { title: "Exploitation", desc: "Manual attempts to inject payloads (SQLi, XSS) to gain access." },
                { title: "Reporting", desc: "Detailed PDF report with proof-of-concept and fix guides." }
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center text-red-400 font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{step.title}</h4>
                    <p className="text-slate-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mock Terminal UI */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl"
          >
            <div className="bg-slate-800 px-4 py-2 flex gap-2 items-center">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-slate-400 font-mono">root@kali-linux:~</span>
            </div>
            <div className="p-6 font-mono text-sm space-y-2">
              <div className="text-green-400">$ nmap -sC -sV target-site.com</div>
              <div className="text-slate-300">Starting Nmap 7.92...</div>
              <div className="text-slate-300">Scanning ports...</div>
              <div className="text-yellow-400">DISCOVERED: Port 80/tcp (http) - VULNERABLE</div>
              <div className="text-yellow-400">DISCOVERED: Port 22/tcp (ssh) - WEAK CRYPTO</div>
              <div className="text-green-400 animate-pulse">$ initiating exploit_module_7...</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- WHAT WE TEST FOR --- */}
      <div className="bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Target Vectors</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-950 border-red-900/30">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Server className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">Network Infrastructure</h3>
                <p className="text-slate-400 text-sm">Firewalls, routers, and server misconfigurations.</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-950 border-red-900/30">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Lock className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">Web Applications</h3>
                <p className="text-slate-400 text-sm">OWASP Top 10: Injections, Broken Auth, XSS.</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-950 border-red-900/30">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <FileWarning className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">Mobile Apps (Android/iOS)</h3>
                <p className="text-slate-400 text-sm">Decompiling APKS, API security, and local storage.</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
             {vulnerabilities.map(v => (
               <Badge key={v} variant="outline" className="border-red-500/40 text-red-300 px-3 py-1">
                 <CheckCircle className="w-3 h-3 mr-1" /> {v}
               </Badge>
             ))}
          </div>
        </div>
      </div>

      {/* --- PRICING CTA --- */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Secure Your Assets Now</h2>
        <p className="text-slate-400 mb-8">Vulnerability Assessments starting at <span className="text-white font-bold text-xl">₹2,999</span></p>
        <Button size="xl" className="bg-white text-slate-950 hover:bg-gray-200 font-bold px-8 py-6 text-lg rounded-full">
            <Terminal className="mr-2 w-5 h-5" /> Get Free Consultation
        </Button>
      </div>
    </div>
  );
}