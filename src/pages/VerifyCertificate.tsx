import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const VerifyCertificate = () => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<"valid" | "invalid" | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    // Add a short animation delay to simulate verification
    setResult(null);
    setTimeout(() => {
      if (code.trim().toLowerCase() === "tdcs20") {
        setResult("valid");
      } else {
        setResult("invalid");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16">
      {/* Gradient background animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-blue-500/10 blur-3xl"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          <Card className="shadow-xl backdrop-blur-lg bg-white/10 dark:bg-gray-900/50 border border-white/10">
            <CardHeader>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <CardTitle className="text-4xl text-center font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  Verify Certificate
                </CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent>
              <motion.form
                onSubmit={handleVerify}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div>
                  <Input
                    placeholder="Enter your certificate code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="text-center text-lg border-2 border-indigo-300 focus:border-indigo-500 transition-colors duration-300"
                    required
                  />
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    type="submit"
                    variant="gradient"
                    className="w-full text-lg py-6 font-semibold shadow-lg"
                  >
                    Verify Certificate
                  </Button>
                </motion.div>
              </motion.form>

              <AnimatePresence mode="wait">
                {result && (
                  <motion.div
                    key={result}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-10"
                  >
                    {result === "valid" ? (
                      <motion.div
                        className="text-center p-8 rounded-xl bg-green-50/70 dark:bg-green-950/60 border border-green-300/30"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-green-600 mb-2">
                          ✅ Verified Certificate
                        </h3>
                        <p className="text-green-700 dark:text-green-300 text-lg">
                          Certificate Code:{" "}
                          <span className="font-semibold">
                            {code.toUpperCase()}
                          </span>{" "}
                          — Valid and Authentic 🎉
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="text-center p-8 rounded-xl bg-red-50/70 dark:bg-red-950/60 border border-red-300/30"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                      >
                        <motion.div
                          animate={{ rotate: [0, -10, 10, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-red-600 mb-2">
                          ❌ Not Verified
                        </h3>
                        <p className="text-red-700 dark:text-red-300 mb-6 text-lg">
                          Please enroll in a course to earn your official
                          certificate.
                        </p>
                        <Link to="/courses">
                          <Button variant="gradient" className="px-8 py-4 text-lg font-semibold">
                            Enroll Now
                          </Button>
                        </Link>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyCertificate;
