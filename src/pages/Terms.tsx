import { motion } from "framer-motion";

export default function Terms() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          <h1 className="text-4xl font-bold mb-8 gradient-text">Terms and Conditions</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
              <p>
                Your use of the Platform and services and tools are governed by the following terms and 
                Conditions ("Terms of Use") as applicable to the Platform including the applicable policies 
                which are incorporated herein by way of reference. If You transact on the Platform, You shall 
                be subject to the policies that are applicable to the Platform for such transaction.
              </p>
              <p>
                By mere use of the Platform, You shall be contracting with the Platform Owner and these terms 
                and conditions including the policies constitute Your binding obligations, with Platform Owner.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Agreement to Terms</h2>
              <p className="font-semibold text-foreground">
                ACCESSING, BROWSING OR OTHERWISE USING THE PLATFORM INDICATES YOUR AGREEMENT TO ALL THE TERMS 
                AND CONDITIONS UNDER THESE TERMS OF USE, SO PLEASE READ THE TERMS OF USE CAREFULLY BEFORE PROCEEDING.
              </p>
              <p>
                These Terms of Use relate to your use of our website, goods (as applicable) or services 
                (as applicable) (collectively, 'Services'). Any terms and conditions proposed by You which 
                are in addition to or which conflict with these Terms of Use are expressly rejected by the 
                Platform Owner and shall be of no force or effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Modifications</h2>
              <p>
                These Terms of Use can be modified at any time without assigning any reason. It is your 
                responsibility to periodically review these Terms of Use to stay informed of updates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">User Obligations</h2>
              <p>
                The use of Platform and/or availing of our Services is subject to the following terms:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  To access and use the Services, you agree to provide true, accurate and complete information 
                  to us during and after registration, and you shall be responsible for all acts done through 
                  the use of your registered account.
                </li>
                <li>
                  You agree not to use the Platform and/or Services for any purpose that is unlawful, illegal 
                  or forbidden by these Terms, or Indian or local laws that might apply to you.
                </li>
                <li>
                  You agree and acknowledge that website and the Services may contain links to other third party 
                  websites. On accessing these links, you will be governed by the terms of use, privacy policy 
                  and such other policies of such third party websites.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Transactions</h2>
              <p>
                You understand that upon initiating a transaction for availing the Services you are entering 
                into a legally binding and enforceable contract with the Platform Owner for the Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Indemnification</h2>
              <p>
                You shall indemnify and hold harmless Platform Owner, its affiliates, group companies 
                (as applicable) and their respective officers, directors, agents, and employees, from any claim 
                or demand, or actions including reasonable attorney's fees, made by any third party or penalty 
                imposed due to or arising out of Your breach of this Terms of Use, privacy Policy and other 
                Policies, or Your violation of any law, rules or regulations or the rights (including infringement 
                of intellectual property rights) of a third party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Force Majeure</h2>
              <p>
                Notwithstanding anything contained in these Terms of Use, the parties shall not be liable for 
                any failure to perform an obligation under these Terms if performance is prevented or delayed 
                by a force majeure event.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Governing Law</h2>
              <p>
                These Terms and any dispute or claim relating to it, or its enforceability, shall be governed 
                by and construed in accordance with the laws of India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
              <p>
                For any questions or concerns regarding these Terms of Use, please contact us at:
              </p>
              <p className="font-semibold text-foreground">
                TDCS Technologies Private Limited<br />
                Email: info@tdcs.tech<br />
                Phone: +91 123 456 7890
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
