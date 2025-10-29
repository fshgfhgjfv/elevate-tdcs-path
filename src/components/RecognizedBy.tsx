import { motion } from "framer-motion";
import partner1 from "@/assets/partners/partner1.png";
import partner2 from "@/assets/partners/partner2.jpg";

export const RecognizedBy = () => {
  const partners = [
    { name: "Partner 1", image: partner1 },
    { name: "Partner 2", image: partner2 },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Recognized By</h2>
          <p className="text-muted-foreground">Trusted by leading organizations</p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img
                src={partner.image}
                alt={partner.name}
                className="h-16 md:h-20 w-auto object-contain"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
