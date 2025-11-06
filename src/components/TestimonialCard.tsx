import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface TestimonialCardProps {
  before: string;
  after: string;
  company: string;
}

export const TestimonialCard = ({
  before,
  after,
  company,
}: TestimonialCardProps) => {
  // Use only one static image instead of blinking/changing
  const image =
    "https://blogger.googleusercontent.com/img/a/AVvXsEh6t9BjBO7igeafdAkeEQW1JNA1TAfi2lIR0Nr857ozJmsC-qPIm9m2BbQi8JkDD3TmGVuyKAyxnIc88lETBh18Xia9FqGTkGdtzD7215GLuqRBIhm9UCh7F4FDB9BsKHg78TKGkSUfCtTHefuZ5LwuXqdGLzO50ulgxWj2b-6gGAZJHE15AEKDUnwStMAm";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="w-full mx-auto max-w-sm"
    >
      <Card className="shadow-glow hover:shadow-glow-lg transition-all duration-300 h-full">
        <CardContent className="p-4 sm:p-6">
          {/* --- Static Image --- */}
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <img
              src={image}
              alt="TDCS STUDENTS"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-background"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src =
                  "https://placehold.co/64x64/E2E8F0/64748B?text=TDCS";
              }}
            />
          </div>

          {/* --- Title --- */}
          <h3 className="text-base sm:text-xl font-bold text-center mb-3 sm:mb-4 tracking-wide">
            TDCS STUDENTS
          </h3>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3">
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