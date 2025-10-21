import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Scale, Gavel, Users, FileText } from "lucide-react";

const AdvocateConstruction = () => {
  const practiceAreas = [
    { icon: Scale, title: "Civil Law", description: "Comprehensive civil litigation" },
    { icon: Gavel, title: "Criminal Law", description: "Expert criminal defense" },
    { icon: Users, title: "Legal Consultation", description: "Professional legal advice" },
    { icon: FileText, title: "Arbitration", description: "Alternative dispute resolution" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold gradient-text mb-4">Advocate Mallika Manna</h1>
            <h2 className="text-2xl text-muted-foreground mb-6">Legal Counsel | High Court of Calcutta</h2>
            <p className="text-xl italic">"Dedicated to Justice. Committed to Clients."</p>
          </div>

          <div className="space-y-6 mb-12">
            <Card className="shadow-glow">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed">
                  Advocate Mallika Manna is a distinguished legal practitioner with a focused career in civil and criminal litigation at the Hon'ble High Court of Calcutta. Renowned for her integrity, strategic thinking, and client-focused advocacy, she delivers exceptional legal representation grounded in ethics, precision, and professionalism.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-glow">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed">
                  With a thorough understanding of both statutory and procedural law, Advocate Manna combines legal intellect with practical courtroom experience making her a trusted name in the legal fraternity of West Bengal.
                </p>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-3xl font-bold gradient-text text-center mb-8">Practice Areas</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {practiceAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="shadow-glow hover:shadow-glow-lg transition-all">
                  <CardContent className="p-6 text-center">
                    <area.icon className="w-12 h-12 gradient-text mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-2">{area.title}</h4>
                    <p className="text-muted-foreground">{area.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvocateConstruction;
