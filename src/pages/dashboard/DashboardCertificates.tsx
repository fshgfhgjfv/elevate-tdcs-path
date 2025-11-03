import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Download, Share2, ExternalLink } from "lucide-react";

const DashboardCertificates = () => {
  // Mock data - in real app this would come from backend
  const certificates = [
    // Empty for now - will be populated when user completes courses
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2 gradient-text">My Certificates</h1>
        <p className="text-muted-foreground">
          View and download your completion certificates
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Completion Certificates</CardTitle>
          <CardDescription>
            Certificates for all your completed courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          {certificates.length === 0 ? (
            <div className="text-center py-16">
              <Award className="w-20 h-20 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-semibold mb-2">No certificates yet</h3>
              <p className="text-muted-foreground mb-6">
                Complete courses to earn certificates that showcase your achievements
              </p>
              <Button variant="default" className="gradient-primary">
                Browse Courses
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {certificates.map((cert: any) => (
                <Card key={cert.id} className="hover:shadow-glow transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{cert.courseName}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Completed on {cert.completionDate}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Download className="w-4 h-4" />
                            Download PDF
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Share2 className="w-4 h-4" />
                            Share
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <ExternalLink className="w-4 h-4" />
                            LinkedIn
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCertificates;
