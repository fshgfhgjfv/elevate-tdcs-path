import { motion, Variants } from "framer-motion";

// --- Animation Variants ---

// 1. For the main container (to stagger the children)
const containerVariants: Variants = {
  hidden: {}, // No initial state needed for the container itself
  visible: {
    transition: {
      staggerChildren: 0.15, // Each section animates 0.15s after the last
    },
  },
};

// 2. For each individual section
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring", // A nice bouncy effect
      stiffness: 100,
    },
  },
};

// 3. A helper component for the interactive heading
const AnimatedHeading = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    className="text-2xl font-semibold text-foreground mb-4 font-heading w-fit" // Use 'font-heading'
    initial="rest"
    whileHover="hover"
    animate="rest"
  >
    {children}
    {/* This is the animated underline */}
    <motion.div
      className="h-0.5 bg-primary" // Use your primary/gradient color
      variants={{
        rest: { width: 0 },
        hover: { width: "100%" },
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  </motion.h2>
);

export default function Terms() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          {/* Apply the new heading font */}
          <h1 className="text-4xl font-bold mb-8 gradient-text font-heading">
            Terms and Conditions
          </h1>

          {/* This is now the animation container */}
          <motion.div
            className="space-y-6 text-muted-foreground"
            variants={containerVariants}
            initial="hidden"
            animate="visible" // Animate on load
          >
            {/* Each section is now a motion item */}
            <motion.section variants={itemVariants}>
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
            </motion.section>

            <motion.section variants={itemVariants}>
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
            </motion.section>

            <motion.section variants={itemVariants}>
              <AnimatedHeading>Modifications</AnimatedHeading>
              <p>
                These Terms of Use can be modified at any time without assigning
                any reason. It is your responsibility to periodically review
                these Terms of Use to stay informed of updates.
              </p>
            </motion.section>

            <motion.section variants={itemVariants}>
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
            </motion.section>

            <motion.section variants={itemVariants}>
              <AnimatedHeading>Transactions</AnimatedHeading>
              <p>
                You understand that upon initiating a transaction for availing
                the Services you are entering into a legally binding and
                enforceable contract with the Platform Owner for the Services.
              </p>
            </motion.section>

            <motion.section variants={itemVariants}>
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
            </motion.section>

            <motion.section variants={itemVariants}>
              <AnimatedHeading>Force Majeure</AnimatedHeading>
              <p>
                Notwithstanding anything contained in these Terms of Use, the
                parties shall not be liable for any failure to perform an
                obligation under these Terms if performance is prevented or
                delayed by a force majeure event.
              </p>
            </motion.section>

            <motion.section variants={itemVariants}>
              <AnimatedHeading>Governing Law</AnimatedHeading>
              <p>
                These Terms and any dispute or claim relating to it, or its
                enforceability, shall be governed by and construed in accordance
                with the laws of India.
              </p>
            </motion.section>

            <motion.section variants={itemVariants}>
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
                Phone: +91 123 456 7890
              </p>_
            </motion.section>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}