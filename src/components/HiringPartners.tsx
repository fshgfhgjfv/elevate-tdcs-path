import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

// The partner list remains the same
const partners = [
  { name: "Google", logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" },
  { name: "Microsoft", logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Apple", logo: "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "Adobe", logo: "https://www.adobe.com/content/dam/cc/icons/Adobe_Corporate_Horizontal_Red_HEX.svg" },
  { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
];

// We duplicate the partners array to create a seamless loop
const duplicatedPartners = [...partners, ...partners];

export const HiringPartners = () => {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Over 50+ Companies Hire from TDCS
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our graduates work at the world's leading technology companies
          </p>
        </motion.div>

        {/* This is the new "unique" part:
          1.  'overflow-hidden' container clips the scrolling items.
          2.  '[mask-image:linear-gradient(...)]' adds a soft fade to the left and right edges.
          3.  'motion.div' is the scrolling track. It uses 'flex' to lay out items in a row.
          4.  'animate' creates the infinite loop by moving the track -50% (the width of the original list).
          5.  'whileHover={{ paused: true }}' conveniently pauses the scroll when the user's mouse is over it.
        */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
          }}
        >
          <motion.div
            className="flex gap-10"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              ease: "linear",
              duration: 30,
              repeat: Infinity,
            }}
          >
            {/* We map over the DUPLICATED list.
              'flex-shrink-0' is important to prevent logos from squishing.
            */}
            {duplicatedPartners.map((partner, index) => (
              <div key={index} className="flex-shrink-0" style={{ width: "220px" }}> 
                <Card className="hover:shadow-glow transition-all duration-300 group h-full">
                  <CardContent className="p-6 flex items-center justify-center min-h-[120px]">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-16 w-auto h-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                    />
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground italic">
            ...and 50+ more companies
          </p>
        </div>
      </div>
    </section>
  );
};