import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  before: string;
  after: string;
  company: string;
  // 'images' prop has been removed as requested
}

export const TestimonialCard = ({
  name,
  before,
  after,
  company,
}: // 'images' prop has been removed as requested
TestimonialCardProps) => {
  // Image links are now hardcoded as requested.
  // Base64 images have been replaced with placeholders.
  const hardcodedImages = [
    "https://placehold.co/64x64/E2E8F0/64748B?text=Img1", // Placeholder for first base64 image
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK1p11fwTtISJt4xqyXCp3G2EJAMPH_Mmv5Q&s",
    "https://placehold.co/64x64/E2E8F0/64748B?text=Img2", // Placeholder for second base64 image
    "https://placehold.co/64x64/E2E8F0/64748B?text=Img3", // Placeholder for third base64 image
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaYIYZmxH6vEaReF9HAtGQ8IjQX1KM1s8yVQ&s",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-glow hover:shadow-glow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-center mb-4 min-h-[64px]">
            {/* --- MODIFICATION START --- */}
            {/* Images are now hardcoded */}
            <div className="flex -space-x-4 overflow-hidden">
              {hardcodedImages.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`${name} avatar ${index + 1}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-background"
                  // Add an onerror fallback for the external URLs
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite loop
                    target.src = `https://placehold.co/64x64/E2E8F0/64748B?text=Error`;
                  }}
                />
              ))}
            </div>
            {/* --- MODIFICATION END --- */}
          </div>
          <h3 className="text-xl font-bold text-center mb-4">{name}</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 text-center">
                <div className="text-sm text-muted-foreground mb-1">Before</div>
                <div className="font-semibold text-sm">{before}</div>
              </div>

              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowRight className="text-primary" />
              </motion.div>

              <div className="flex-1 text-center">
                <div className="text-sm text-muted-foreground mb-1">After</div>
                <div className="font-semibold text-sm gradient-text">
                  {after}
                </div>
              </div>
            </div>

            <div className="text-center pt-3 border-t">
              <div className="text-sm font-semibold text-primary">
                {company}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

