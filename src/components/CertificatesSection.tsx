import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Award } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import certificateDemo from "@/assets/certificate-demo.jpg";

export const CertificatesSection = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a certificate to upload",
        variant: "destructive",
      });
      return;
    }

    // Simulate upload
    toast({
      title: "Certificate Uploaded!",
      description: "Your certificate has been successfully uploaded to your profile.",
    });
    setIsUploadModalOpen(false);
    setSelectedFile(null);
  };

  return (
    <>
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Left side - CTA */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-10 h-10 text-primary" />
                <h2 className="text-4xl font-bold gradient-text">Our Certificates</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Build your resume and LinkedIn profile by uploading your TDCS certificates. 
                Showcase verified achievements to hiring partners and stand out in the competitive job market.
              </p>
              <div className="space-y-4">
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Industry-recognized certifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Verified digital credentials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>LinkedIn-ready certificates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Boost your professional profile</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="group"
                >
                  <Upload className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Upload Certificate
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/courses")}
                  className="group"
                >
                  Enroll Now
                </Button>
              </div>
            </div>

            {/* Right side - Certificate Demo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-lg overflow-hidden shadow-glow-lg transform hover:scale-105 transition-transform duration-300">
                <img
                  src={certificateDemo}
                  alt="TDCS Certificate Demo"
                  className="w-full h-auto"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Upload Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Your Certificate</DialogTitle>
            <DialogDescription>
              Upload your TDCS certificate to add it to your profile
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <Label htmlFor="certificate">Certificate File (PDF or Image)</Label>
              <Input
                id="certificate"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Upload
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
