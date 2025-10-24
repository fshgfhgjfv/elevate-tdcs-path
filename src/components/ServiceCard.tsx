import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Tool {
  name: string;
  icon: string;
  duration: string;
  description?: string;
  features?: string[];
}

interface ServiceCardProps {
  id: string;
  title: string;
  tagline: string;
  image?: string;
  tools: Tool[];
  colors: string;
  icon: LucideIcon;
  badge: string;
  price: string;
  onGetService: (serviceId: string, serviceName: string, price: string) => void;
}

export const ServiceCard = ({
  id,
  title,
  tagline,
  image,
  tools,
  colors,
  icon: IconComponent,
  badge,
  price,
  onGetService,
}: ServiceCardProps) => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Card className="h-full overflow-hidden hover:shadow-glow-lg transition-all duration-500 group border-2">
          <CardContent className="p-0">
            {/* Product Box Image */}
            <div className="relative h-80 overflow-hidden bg-gradient-to-br from-background to-muted/20">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${colors} opacity-80 flex items-center justify-center`}>
                  <IconComponent className="w-32 h-32 text-white/30" />
                </div>
              )}
              
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/50">
                <span className="text-sm font-bold gradient-text tracking-wider">
                  {badge}
                </span>
              </div>

              {/* TDCS Logo Glow */}
              <div className="absolute bottom-4 left-4">
                <div className="text-3xl font-bold text-white drop-shadow-glow">
                  TDCS
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${colors}`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm">{tagline}</p>
                </div>
              </div>

              {/* Animated Logo Carousel */}
              <div className="relative overflow-hidden py-4">
                <div className="flex gap-3 animate-scroll-left-fast">
                  {[...tools, ...tools].map((tool, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setSelectedTool(tool)}
                      className="flex-shrink-0 px-4 py-2 bg-muted/50 hover:bg-muted rounded-full text-xs font-medium flex items-center gap-2 transition-all cursor-pointer group/tool"
                      title={`${tool.name} - ${tool.duration}`}
                    >
                      <span className="text-lg">{tool.icon}</span>
                      <span className="hidden sm:inline">{tool.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Starting at</p>
                  <p className="text-2xl font-bold gradient-text">{price}</p>
                  <Badge variant="secondary" className="mt-2">Low Budget Friendly</Badge>
                </div>
                <Button
                  variant="gradient"
                  size="lg"
                  className="shadow-glow animate-pulse hover:animate-none"
                  onClick={() => onGetService(id, title, price)}
                >
                  GET THIS Service
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tool Info Modal */}
      <Dialog open={!!selectedTool} onOpenChange={() => setSelectedTool(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <span className="text-3xl">{selectedTool?.icon}</span>
              {selectedTool?.name}
            </DialogTitle>
            <DialogDescription>
              <Badge variant="secondary" className="mt-2">{selectedTool?.duration}</Badge>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-muted-foreground">
              {selectedTool?.description || `${selectedTool?.name} is included in this premium bundle pack.`}
            </p>
            {selectedTool?.features && (
              <div>
                <h4 className="font-semibold mb-2">Key Features:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {selectedTool.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            <Button
              variant="gradient"
              className="w-full"
              onClick={() => {
                setSelectedTool(null);
                onGetService(id, title, price);
              }}
            >
              GET THIS Service
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
