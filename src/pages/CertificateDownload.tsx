import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Download, Award } from "lucide-react";
import { toast } from "sonner";

const CertificateDownload = () => {
  const handleDownload = () => {
    // TODO: Implement actual certificate generation with jsPDF/html2canvas
    toast.success("Certificate download will be available after course completion");
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          <Award className="w-24 h-24 gradient-text mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Your Certificate
          </h1>
          <Card className="shadow-glow-lg">
            <CardContent className="p-12">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-6 flex items-center justify-center">
                <Award className="w-32 h-32 text-primary" />
              </div>
              <Button variant="gradient" size="lg" onClick={handleDownload}>
                <Download className="mr-2 h-5 w-5" />
                Download Certificate
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CertificateDownload;
