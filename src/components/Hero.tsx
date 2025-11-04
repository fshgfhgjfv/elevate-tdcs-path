export const Hero = ({ showOnInnerPages = true }: HeroProps) => {
    // NEW: State for the Book Demo Modal
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
    const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
    
    // CHANGED: Replaced 'expandedCard' state with individual hover states
    const [isCeoHovered, setIsCeoHovered] = useState(false);
    const [isCooHovered, setIsCooHovered] = useState(false);
    const [isCmoHovered, setIsCmoHovered] = useState(false);

    const heroRef = useRef(null);
    const isInView = useInView(heroRef, { once: true, amount: 0.1 });

    // Framer Motion 3D Tilt/Parallax values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    // Card refs for 3D effect
    const cardRefCEO: RefObject<HTMLDivElement> = useRef(null);
    const cardRefCOO: RefObject<HTMLDivElement> = useRef(null);
    const cardRefCMO: RefObject<HTMLDivElement> = useRef(null);

    // --- Original Animation variants (for sections other than headline) ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    // Card mouse move handler for 3D effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, cardRef: RefObject<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        x.set(offsetX * 0.2);
        y.set(offsetY * 0.2);
    };

    // NEW: Reset mouse values and hover states on mouse leave
    const handleMouseLeave = (card: 'ceo' | 'coo' | 'cmo') => {
        x.set(0);
        y.set(0);
        if (card === 'ceo') setIsCeoHovered(false);
        if (card === 'coo') setIsCooHovered(false);
        if (card === 'cmo') setIsCmoHovered(false);
    };

    // NEW: Sheen animation variants
    const sheenTransition = {
        type: "tween",
        ease: "linear",
        duration: 0.7,
    };


    return (
        <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-24 pb-16 md:pt-32 lg:pt-40 bg-white dark:bg-gray-900 overflow-hidden">
            {/* ... (Alert placeholder and animated background blobs remain the same) ... */}
            <div id="global-alert-hero" className="fixed top-4 right-4 z-[9999] opacity-0 transition-opacity duration-300 pointer-events-none"></div>

            <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
                <motion.div
                    className="absolute w-[600px] h-[600px] bg-[#FF50B3] opacity-10 rounded-full blur-3xl"
                    initial={{ x: -200, y: -200 }}
                    animate={{ x: 0, y: 0, scale: [1, 1.05, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#8C53FF] opacity-10 rounded-full blur-3xl"
                    initial={{ x: 200, y: 200 }}
                    animate={{ x: 0, y: 0, scale: [1, 0.95, 1] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
                />
            </div>
            
            <div className="container mx-auto px-4 z-10">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* ... (Left Column remains the same) ... */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* ... (Avatars, Headline, Paragraph, Buttons, Badges) ... */}
                        {/* Avatars */}
                        <motion.div variants={itemVariants} className="flex items-center space-x-3">
                            <div className="flex -space-x-2 overflow-hidden">
                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900" src="https://i.pinimg.com/736x/9c/2a/81/9c2a81633cffd91adf5354958f50f3be.jpg" alt="Student avatar" />
                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit:facearea&facepad=2&w=256&h=256&q=80" alt="Student avatar" />
                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit:facearea&facepad=2&w=256&h=256&q=80" alt="Student avatar" />
                            </div>
                             <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                15k+ Happy Students
                            </p>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            variants={wordContainerVariants}
                            animate={isInView ? "visible" : "hidden"}
                            className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white"
                        >
                            {words.map((word, index) => (
                                <motion.span key={index} variants={wordItemVariants} className="inline-block mr-2" style={{ perspective: 1000 }}>
                                  {/* Apply gradient only to 'Training' and 'career' */}
                                    {word === 'Training' || word === 'career' ? (
                                        <span className={GRADIENT_CLASS}>{word}</span>
                                    ) : (
                                        word
                                    )}
                                </motion.span>
                            ))}
                        </motion.h1>

                        {/* Paragraph */}
                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl">
                            Get job-ready with expert-led courses or participate in our free hiring drives.
                        </motion.p>
                        
                        {/* Buttons */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-start mb-6">
                            <Link to="/courses">
                                <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700">
                                    View Courses
                                </Button>
                            </Link>
                            <Button
                                size="lg"
                                className="text-lg px-8 py-6 w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow bg-indigo-600 text-white hover:bg-indigo-700"
                                onClick={() => setIsDemoModalOpen(true)}
                            >
                                Book a Demo
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-lg px-8 py-6 w-full sm:w-auto border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => setIsBrochureModalOpen(true)}
                            >
                                <Download className="mr-2 h-5 w-5 animate-bounce-slow" />
                                Download Brochure
                            </Button>
                        </motion.div>

                        {/* Badges */}
                        <motion.div
          _                 variants={itemVariants}
                            className="flex flex-wrap gap-4 md:gap-8 items-center pt-4"
                        >
                            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                                Trusted by thousands of students globally.
                            </p>
                        </motion.div>
                    </div>


                    {/* Right Column: Tiered Leadership Cards */}
                    <div className="lg:col-span-1 space-y-4 flex flex-col items-center lg:items-end">
                        
                        {/* 1. CEO Card - CHANGED to hover interaction */}
                        <motion.div
                            ref={cardRefCEO}
                            variants={itemVariants}
                            layout // Keeps smooth size animation
                            className="relative p-8 md:p-10 w-full rounded-2xl shadow-2xl text-white overflow-hidden cursor-pointer will-change-transform"
                            style={{
                                background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)',
                                rotateX,
                                rotateY,
                                transformStyle: "preserve-3d"
                            }}
                            onMouseMove={(e) => handleMouseMove(e, cardRefCEO)}
                            // CHANGED: Replaced onClick with hover events
                            onHoverStart={() => setIsCeoHovered(true)}
                            onMouseLeave={() => handleMouseLeave('ceo')}
                            transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        >
                            {/* NEW: Top-to-Bottom Sheen Effect */}
                            <motion.div
                                className="absolute inset-0 z-10 pointer-events-none"
                                style={{
                                    background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                                }}
                                initial={{ y: "-150%" }}
                                animate={{ y: isCeoHovered ? "150%" : "-150%" }}
                                transition={sheenTransition}
                            />

                            <h3 className="text-3xl font-extrabold mb-2 z-20 relative">Dibyajit Ghosh</h3>
                            <p className={`text-lg z-20 relative transition-all ${isCeoHovered ? 'mb-2' : 'mb-6'}`}>
                                {/* CHANGED: Use hover state to swap text */}
                                {isCeoHovered ? 'Founder & CEO (Director of TDCS)' : 'Founder & CEO'}
                            </p>
                            
                            <AnimatePresence>
                                {/* CHANGED: Use hover state to show/hide */}
                                {isCeoHovered && (
                                    <motion.p
                                        className="text-sm font-semibold opacity-80 z-20 relative mb-6"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                        exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                                    >
                                        Visionary leader driving future talent.
                                    </motion.p>
                                )}
                            </AnimatePresence>
                            
                            <motion.img
                                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhhQ9heh07dWNTxnm6dhyphenhyphen2rzfxjmA_xS3UXPh3sBCY_B2ywNCfyr8QXWKLsur3PJKzLo-pUsoGmIfTmGl8m7cGmUezdk_RvStMnzxjIstX1S-V6gc2PrG8WkudchJv_c0LuVu0xbO7mUnWh5mWZHMe9THz3dwqCLTN0-2bAoI0k_rynUr6vk2xDdSKi0bM-/s539/WhatsApp_Image_2025-10-26_at_15.56.54_d2e7dc94-removebg-preview.png"
                                alt="Dibyajit Ghosh"
                                className="absolute -right-4 -bottom-3 w-36 h-36 md:w-44 md:h-44 object-cover opacity-80 z-0"
                                style={{
                                    x: useTransform(x, [-100, 100], [10, -10]),
                                    y: useTransform(y, [-100, 100], [10, -10]),
                                 transformStyle: "preserve-3d"
                                }}
                           />
                        </motion.div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            
                            {/* COO Card - CHANGED to hover interaction */}
                            <motion.div
                                ref={cardRefCOO}
                                variants={itemVariants}
                                layout
                                className="relative p-5 md:p-6 flex-1 min-w-0 rounded-xl shadow-lg text-white overflow-hidden cursor-pointer will-change-transform"
                                style={{
                                    background: 'linear-gradient(135deg, #059669, #34D399)',
                                    rotateX: useTransform(y, [-100, 100], [5, -5]),
                                    rotateY: useTransform(x, [-100, 100], [-5, 5]),
                                    transformStyle: "preserve-3d"
                                }}
                                onMouseMove={(e) => handleMouseMove(e, cardRefCOO)}
                                // CHANGED: Replaced onClick with hover events
                                onHoverStart={() => setIsCooHovered(true)}
                                onMouseLeave={() => handleMouseLeave('coo')}
                                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                            >
                                {/* NEW: Left-to-Right Sheen Effect */}
                                <motion.div
                                    className="absolute inset-0 z-10 pointer-events-none"
                                    style={{
                                        background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                                    }}
                                    initial={{ x: "-150%" }}
                                    animate={{ x: isCooHovered ? "150%" : "-150%" }}
                                    transition={sheenTransition}
                                />

                                <h3 className="text-xl font-bold mb-1 z-20 relative">Shivam Shing</h3>
                                <p className={`text-sm z-20 relative transition-all ${isCooHovered ? 'mb-2' : 'mb-4'}`}>
                                    {/* CHANGED: Use hover state to swap text */}
                                    {isCooHovered ? 'Chief Operating Officer' : 'COO'}
                                </p>

                                {/* NEW: Added description on hover */}
                                <AnimatePresence>
                                    {isCooHovered && (
                                        <motion.p
                                            className="text-xs font-semibold opacity-80 z-20 relative mb-4"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                          exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                                        >
                                            Operational excellence and strategic execution.
                                        </motion.p>
                                    )}
                                </AnimatePresence>

                                <motion.img
                                    src="https://blogger.googleusercontent.com/img/a/AVvXsEgiDtg5YtmQ7bdvNmeAAMyhwpc5tLm_RNR2Lv4y4u6hsMzTiuqNyxo7O0qU32donmMZoTduoxe-4WgWVdPh29JH9vmYXkqCI7hiyzwaYBxxXgTfKbCsjTST6gyIWQB230kRXgwfQvxV-dqB9V-Xqr3915tuA9d88D1rGY-l9sJy_vhC3HJR0pdEI6F3E8Nr"
                                    alt="COO"
                                    className="absolute -right-4 -bottom-4 w-24 h-24 md:w-28 md:h-28 object-cover opacity-70 z-0"
                                    style={{
                                        x: useTransform(x, [-100, 100], [5, -5]),
                                        y: useTransform(y, [-100, 100], [5, -5]),
                                        transformStyle: "preserve-3d"
                                    }}
                                />
                            </motion.div>

                            {/* CMO Card - CHANGED to hover interaction */}
                            <motion.div
                                ref={cardRefCMO}
                                variants={itemVariants}
                                layout
                                className="relative p-5 md:p-6 flex-1 min-w-0 rounded-xl shadow-lg text-white overflow-hidden cursor-pointer will-change-transform"
                                style={{
                                    background: 'linear-gradient(135deg, #DC2626, #F87171)',
                                   rotateX: useTransform(y, [-100, 100], [5, -5]),
                                    rotateY: useTransform(x, [-100, 100], [-5, 5]),
                                    transformStyle: "preserve-3d"
                                }}
                          _       onMouseMove={(e) => handleMouseMove(e, cardRefCMO)}
                                // CHANGED: Replaced onClick with hover events
                                onHoverStart={() => setIsCmoHovered(true)}
                               onMouseLeave={() => handleMouseLeave('cmo')}
                                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                            >
                                {/* NEW: Right-to-Left Sheen Effect */}
                               <motion.div
                                    className="absolute inset-0 z-10 pointer-events-none"
                                    style={{
                                        background: "linear-gradient(to left, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                                    }}
                                    initial={{ x: "150%" }}
                                    animate={{ x: isCmoHovered ? "-150%" : "150%" }}
                                   transition={sheenTransition}
              _               />

                                <h3 className="text-xl font-bold mb-1 z-20 relative">Tushar Bhakta</h3>
                                <p className={`text-sm z-20 relative transition-all ${isCmoHovered ? 'mb-2' : 'mb-4'}`}>
                                    {/* CHANGED: Use hover state to swap text */}
                                {isCmoHovered ? 'Chief Marketing Officer' : 'CMO'}
                                </p>

                                {/* NEW: Added description on hover */}
                             <AnimatePresence>
                                    {isCmoHovered && (
                                     <motion.p
                                            className="text-xs font-semibold opacity-80 z-20 relative mb-4"
                                         initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
                                            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                                        >
                                            Driving growth and brand visibility.
                                     </motion.p>
                                    )}
                                </AnimatePresence>

                                <motion.img
                                    src="https"
                                    alt="CMO"
                                    className="absolute -right-4 -bottom-4 w-24 h-24 md:w-28 md:h-28 object-cover opacity-70 z-0"
                                    style={{
                                        x: useTransform(x, [-100, 100], [5, -5]),
                                        y: useTransform(y, [-100, 100], [5, -5]),
                                        transformStyle: "preserve-3d"
                          _         }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
        </div>

            {/* ... (Modals remain the same) ... */}
            <BookDemoModal
                isOpen={isDemoModalOpen}
                onClose={() => setIsDemoModalOpen(false)}
          _ />

            <DownloadBrochureModal
             isOpen={isBrochureModalOpen}
                onClose={() => setIsBrochureModalOpen(false)}
            />
        </section>
    );
};