import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const VerifyCertificate = () => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<"valid" | "invalid" | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.toLowerCase() === "tdcs20") {
      setResult("valid");
    } else {
      setResult("invalid");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="shadow-glow-lg">
            <CardHeader>
              <CardTitle className="text-3xl gradient-text text-center">
                Verify Certificate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="space-y-6">
                <div>
                  <Input
                    placeholder="Enter certificate code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="text-center text-lg"
                    required
                  />
                </div>
                <Button type="submit" variant="gradient" className="w-full">
                  Verify Certificate
                </Button>
              </form>

              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8"
                >
                  {result === "valid" ? (
                    <div className="text-center p-6 bg-green-50 dark:bg-green-950 rounded-lg">
                      <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-green-600 mb-2">✅ Verified Certificate</h3>
                      <p className="text-green-700 dark:text-green-300">Certificate Code: {code.toUpperCase()} — Valid</p>
                    </div>
                  ) : (
                    <div className="text-center p-6 bg-red-50 dark:bg-red-950 rounded-lg">
                      <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-red-600 mb-2">❌ Not Verified</h3>
                      <p className="text-red-700 dark:text-red-300 mb-4">Please enroll in a course to get certified</p>
                      <Link to="/courses">
                        <Button variant="gradient">Enroll Now</Button>
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyCertificate;
