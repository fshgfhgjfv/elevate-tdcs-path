import { motion, Variants } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection"; 

// --- 1. Animation for H1 (Letter by Letter) ---
const title = "Terms and Conditions";

// Variants for the H1 container
const titleVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03, // Stagger each letter by 0.03s
    },
  },
};

// Variants for each letter
const letterVariants: Variants = {
  hidden: { opacity: 0, y: 50, rotate: 10 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring", stiffness: 150, damping: 15 },
  },
};

// --- 2. Interactive Heading Component (Unchanged) ---
const AnimatedHeading = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    className="text-2xl font-semibold text-foreground mb-4 font-heading w-fit"
    initial="rest"
    whileHover="hover"
    animate="rest"
  >
    {children}
    <motion.div
      className="h-0.5 bg-primary"
      variants={{
        rest: { width: 0 },
        hover: { width: "100%" },
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  </motion.h2>
);

// --- 3. Floating Background Icons (from Signup) ---
const tools = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg",
    alt: "Kali Linux",
    side: "left" as "left" | "right",
    delay: 0.2,
    y: 150,
  },
  {
    src: "https://i0.wp.com/davidjmcclelland.com/wp-content/uploads/2021/11/burpSuiteLogo.png?resize=220%2C220&ssl=1",
    alt: "Burp Suite",
    side: "left" as "left" | "right",
    delay: 0.4,
    y: 350,
  },
  {
    src: "https://github.com/fshgfhgjfv/elevate-tdcs-path/blob/main/png-transparent-wireshark-packet-analyzer-computer-software-protocol-analyzer-leopard-shark-thumbnail.png?raw=true",
    alt: "Wireshark",
    side: "right" as "left" | "right",
    delay: 0.3,
    y: 120,
  },
  {
    src: "https://images.contentstack.io/v3/assets/blt28ff6c4a2cf43126/blt2d8822c72b3fa47d/647726fad2aad85beae606cd/NMAP_1_Integrations_Feature_Array_Item_Image.png?auto=webp&disable=upscale&width=3840&quality=75",
    alt: "Nmap",
    side: "right" as "left" | "right",
    delay: 0.5,
    y: 320,
  },
  {
    src: "https://assets.tryhackme.com/img/modules/metasploit.png",
    alt: "Metasploit",
    side: "left" as "left" | "right",
    delay: 0.6,
    y: 500,
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* --- ADDED: Floating Tools Background --- */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {tools.map((tool) => (
          <motion.img
            key={tool.alt}
            src={tool.src}
            alt={tool.alt}
            className="absolute h-16 w-16 md:h-24 md:w-24"
            style={{
              top: tool.y,
              ...(tool.side === "left" ? { left: "10%" } : { right: "10%" }),
            }}
            animate={{
              opacity: 0.08,
              x: 0,
              scale: 1,
              y: [tool.y, tool.y + 20, tool.y],
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: tool.delay,
                y: {
                  duration: 2 + Math.random() * 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              },
            }}
          />
        ))}
      </div>
      {/* --- End Floating Tools --- */}

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* --- UPDATED: H1 Letter-by-Letter Animation --- */}
          <motion.h1
            className="text-4xl font-bold mb-8 gradient-text font-heading"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            {title.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <div className="space-y-8 text-muted-foreground">
            <AnimatedSection>
              <AnimatedHeading>Introduction</AnimatedHeading>
              <p>
                Your use of the Platform and services and tools are governed by
                the following terms and Conditions ("Terms of Use") as applicable
                to the Platform including the applicable policies which are
                incorporated herein by way of reference. If You transact on the
                Platform, You shall be subject to the policies that are
                applicable to the Platform for such transaction.
              </p>
              <p>
                By mere use of the Platform, You shall be contracting with the
                Platform Owner and these terms and conditions including the
                policies constitute Your binding obligations, with Platform
                Owner.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <AnimatedHeading>Agreement to Terms</AnimatedHeading>
              <p className="font-semibold text-foreground">
                ACCESSING, BROWSING OR OTHERWISE USING THE PLATFORM INDICATES
                YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS
                OF USE, SO PLEASE READ THE TERMS OF USE CAREFULLY BEFORE
                PROCEEDING.
              </p>
              <p>
                These Terms of Use relate to your use of our website, goods (as
                applicable) or services (as applicable) (collectively,
                'Services'). Any terms and conditions proposed by You which are
                in addition to or which conflict with these Terms of Use are
                expressly rejected by the Platform Owner and shall be of no
                force or effect.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <AnimatedHeading>Modifications</AnimatedHeading>
              <p>
                These Terms of Use can be modified at any time without assigning
                any reason. It is your responsibility to periodically review
                these Terms of Use to stay informed of updates.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <AnimatedHeading>User Obligations</AnimatedHeading>
              <p>
                The use of Platform and/or availing of our Services is subject to
                the following terms:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  To access and use the Services, you agree to provide true,
                  accurate and complete information to us during and after
                  registration, and you shall be responsible for all acts done
                  through the use of your registered account.
                </li>
                <li>
                  You agree not to use the Platform and/or Services for any
                  purpose that is unlawful, illegal or forbidden by these Terms,
                  or Indian or local laws that might apply to you.
                </li>
                <li>
                  You agree and acknowledge that website and the Services may
                  contain links to other third party websites. On accessing
                  these links, you will be governed by the terms of use, privacy
                  policy and such other policies of such third party websites.
                </li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <AnimatedHeading>Transactions</AnimatedHeading>
              <p>
                You understand that upon initiating a transaction for availing
                the Services you are entering into a legally binding and
                enforceable contract with the Platform Owner for the Services.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <AnimatedHeading>Indemnification</AnimatedHeading>
              <p>
                You shall indemnify and hold harmless Platform Owner, its
                affiliates, group companies (as applicable) and their respective
                officers, directors, agents, and employees, from any claim or
                demand, or actions including reasonable attorney's fees, made by
                any third party or penalty imposed due to or arising out of Your
                breach of this Terms of Use, privacy Policy and other Policies,
                or Your violation of any law, rules or regulations or the rights
                (including infringement of intellectual property rights) of a
                third party.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <AnimatedHeading>Force Majeure</AnimatedHeading>
              <p>
                Notwithstanding anything contained in these Terms of Use, the
                parties shall not be liable for any failure to perform an
                obligation under these Terms if performance is prevented or
                delayed by a force majeure event.
              </IAmA
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <AnimatedHeading>Governing Law</AnimatedHeading>
              <p>
                These Terms and any dispute or claim relating to it, or its
                enforceability, shall be governed by and construed in accordance
                with the laws of India.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <AnimatedHeading>Contact Information</AnimatedHeading>
              <p>
                For any questions or concerns regarding these Terms of Use,
                please contact us at:
              </p>
              <p className="font-semibold text-foreground">
                TDCS Technologies Private Limited
                <br />
                Email: info@tdcs.tech
                <br />
                Phone: +91 94227 99875
              </p>
              {/* <<< THE STRAY '_' IS GONE FROM HERE */}
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}