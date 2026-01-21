import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, MapPin, Truck, CheckCircle, AlertCircle, Search, Terminal, Warehouse, Home, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TrackingStep {
  location: string;
  address: string;
  status: string;
  date: string;
  time: string;
  isCompleted: boolean;
  isCurrent: boolean;
  icon: React.ReactNode;
}

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [error, setError] = useState('');

  const validTrackingId = '4852620856';

  const trackingSteps: TrackingStep[] = [
    {
      location: 'TDCS Technologies Pvt. Ltd.',
      address: 'Raskundu, Garhbeta, West Bengal',
      status: 'Order Dispatched',
      date: 'Jan 18, 2026',
      time: '09:30 AM',
      isCompleted: true,
      isCurrent: false,
      icon: <Package className="w-5 h-5" />,
    },
    {
      location: 'Kolkata Sorting Center',
      address: 'Salt Lake, Kolkata, West Bengal',
      status: 'Arrived at Hub',
      date: 'Jan 19, 2026',
      time: '02:15 PM',
      isCompleted: true,
      isCurrent: false,
      icon: <Warehouse className="w-5 h-5" />,
    },
    {
      location: 'Odisha Transit Hub',
      address: 'Bhubaneswar, Odisha',
      status: 'In Transit',
      date: 'Jan 20, 2026',
      time: '06:45 AM',
      isCompleted: true,
      isCurrent: false,
      icon: <Truck className="w-5 h-5" />,
    },
    {
      location: 'Cuttack Distribution Center',
      address: 'Cuttack, Odisha',
      status: 'Out for Delivery',
      date: 'Jan 20, 2026',
      time: '11:30 AM',
      isCompleted: true,
      isCurrent: false,
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      location: 'Jagatpur, Cuttack',
      address: 'Final Destination',
      status: 'Delivered',
      date: 'Jan 20, 2026',
      time: '03:45 PM',
      isCompleted: true,
      isCurrent: true,
      icon: <Home className="w-5 h-5" />,
    },
  ];

  const terminalMessages = [
    '> Initializing tracking system...',
    '> Connecting to TDCS logistics network...',
    '> Authenticating tracking ID: ' + validTrackingId,
    '> Fetching shipment data...',
    '> Decrypting route information...',
    '> Loading waypoints...',
    '> SUCCESS: Parcel located!',
  ];

  const handleTrack = () => {
    setError('');
    setShowResult(false);
    setTerminalLines([]);
    setCurrentStep(0);

    if (trackingId.trim() !== validTrackingId) {
      setError('Invalid tracking ID. Please check and try again.');
      return;
    }

    setIsTracking(true);

    terminalMessages.forEach((msg, index) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, msg]);
        if (index === terminalMessages.length - 1) {
          setTimeout(() => {
            setIsTracking(false);
            setShowResult(true);
            animateSteps();
          }, 500);
        }
      }, index * 400);
    });
  };

  const animateSteps = () => {
    trackingSteps.forEach((_, index) => {
      setTimeout(() => {
        setCurrentStep(index + 1);
      }, index * 600);
    });
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 pt-24 pb-12 relative overflow-hidden">
      {/* Matrix-style background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)`,
        }} />
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent w-full"
            style={{ top: `${i * 5}%` }}
            animate={{
              opacity: [0, 0.5, 0],
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 8,
              delay: i * 0.4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Terminal className="w-8 h-8 text-green-500" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              Track Your Parcel
            </h1>
          </div>
          <p className="text-gray-400 max-w-xl mx-auto">
            Enter your tracking ID to monitor your shipment in real-time
          </p>
        </motion.div>

        {/* Notice Banner with Blink Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(234, 179, 8, 0)',
                '0 0 20px 5px rgba(234, 179, 8, 0.3)',
                '0 0 0 0 rgba(234, 179, 8, 0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
            </motion.div>
            <div>
              <motion.p 
                className="text-yellow-400 font-bold text-base"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                📦 Important Notice
              </motion.p>
              <p className="text-gray-300 text-sm mt-1">
                After completing payment on the hardware page, please wait{' '}
                <motion.span 
                  className="text-green-400 font-bold text-base"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  1-2 hours
                </motion.span>{' '}
                to receive your tracking ID via email/SMS. You can then track your order here.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-xl mx-auto mb-8"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your tracking ID..."
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
              className="w-full bg-gray-900/80 border-2 border-gray-700 hover:border-green-500/50 focus:border-green-500 text-white rounded-xl py-4 pl-14 pr-32 text-lg font-mono focus:ring-2 focus:ring-green-500/20 outline-none transition-all placeholder:text-gray-500"
            />
            <Package className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <button
              onClick={handleTrack}
              disabled={isTracking || !trackingId.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold px-6 py-2.5 rounded-lg transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Track
            </button>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mt-3 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.p>
          )}
        </motion.div>

        {/* Terminal Animation */}
        <AnimatePresence>
          {isTracking && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="bg-gray-950 border border-green-500/30 rounded-xl p-6 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-800">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-gray-500 ml-2">tdcs_logistics_terminal</span>
                </div>
                <div className="space-y-1">
                  {terminalLines.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`${line.includes('SUCCESS') ? 'text-green-400' : 'text-green-500/70'}`}
                    >
                      {line}
                      {index === terminalLines.length - 1 && (
                        <span className="inline-block w-2 h-4 bg-green-500 ml-1 animate-pulse" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tracking Result - Amazon/Flipkart Style */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto"
            >
              {/* Status Header */}
              <motion.div 
                className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/30 rounded-xl p-6 mb-8"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(34, 197, 94, 0)',
                    '0 0 30px 10px rgba(34, 197, 94, 0.2)',
                    '0 0 0 0 rgba(34, 197, 94, 0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Tracking ID</p>
                    <p className="text-xl font-mono text-green-400">{validTrackingId}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.3, 1],
                        boxShadow: ['0 0 0 0 rgba(34, 197, 94, 0.7)', '0 0 0 15px rgba(34, 197, 94, 0)', '0 0 0 0 rgba(34, 197, 94, 0.7)']
                      }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="w-4 h-4 rounded-full bg-green-500"
                    />
                    <motion.span 
                      className="text-green-400 font-bold text-xl font-mono"
                      animate={{ 
                        textShadow: [
                          '0 0 5px rgba(34, 197, 94, 0.5)',
                          '0 0 20px rgba(34, 197, 94, 1)',
                          '0 0 5px rgba(34, 197, 94, 0.5)',
                        ],
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      DELIVERED
                    </motion.span>
                  </div>
                </div>
              </motion.div>

              {/* Horizontal Progress Bar - Amazon Style */}
              <div className="mb-10 hidden md:block">
                <div className="relative">
                  {/* Progress Line Background */}
                  <div className="absolute top-8 left-0 right-0 h-1 bg-gray-800 rounded-full" />
                  
                  {/* Animated Progress Line */}
                  <motion.div 
                    className="absolute top-8 left-0 h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.5, ease: 'easeOut' }}
                  />

                  {/* Wave Animation on Progress */}
                  <motion.div
                    className="absolute top-8 h-1 w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"
                    animate={{ left: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Step Indicators */}
                  <div className="flex justify-between relative">
                    {trackingSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={currentStep > index ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 0 }}
                        transition={{ delay: index * 0.3 }}
                      >
                        <motion.div
                          className={`w-16 h-16 rounded-full flex items-center justify-center z-10 ${
                            step.isCurrent 
                              ? 'bg-green-500 shadow-lg shadow-green-500/50' 
                              : currentStep > index 
                                ? 'bg-green-600/30 border-2 border-green-500' 
                                : 'bg-gray-800 border-2 border-gray-700'
                          }`}
                          animate={step.isCurrent ? {
                            scale: [1, 1.1, 1],
                            boxShadow: [
                              '0 0 0 0 rgba(34, 197, 94, 0.7)',
                              '0 0 0 20px rgba(34, 197, 94, 0)',
                              '0 0 0 0 rgba(34, 197, 94, 0.7)',
                            ],
                          } : {}}
                          transition={{ duration: 1.5, repeat: step.isCurrent ? Infinity : 0 }}
                        >
                          {step.isCurrent ? (
                            <CheckCircle className="w-7 h-7 text-black" />
                          ) : (
                            <span className={currentStep > index ? 'text-green-400' : 'text-gray-500'}>
                              {step.icon}
                            </span>
                          )}
                        </motion.div>
                        <div className="mt-3 text-center max-w-[120px]">
                          <p className={`text-xs font-bold ${step.isCurrent ? 'text-green-400' : 'text-white'}`}>
                            {step.location.split(' ').slice(0, 2).join(' ')}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detailed Steps - Mobile & Desktop */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-500" />
                  Shipment Journey
                </h3>
                
                {trackingSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={currentStep > index ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="relative"
                  >
                    {/* Connecting Line */}
                    {index < trackingSteps.length - 1 && (
                      <motion.div 
                        className="absolute left-8 top-16 w-0.5 h-8 bg-gradient-to-b from-green-500 to-green-500/30"
                        initial={{ scaleY: 0 }}
                        animate={currentStep > index ? { scaleY: 1 } : { scaleY: 0 }}
                        transition={{ delay: index * 0.2 + 0.3 }}
                        style={{ transformOrigin: 'top' }}
                      />
                    )}

                    <motion.div
                      className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                        step.isCurrent 
                          ? 'bg-green-500/10 border-green-500/50 shadow-lg shadow-green-500/10' 
                          : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
                      }`}
                      animate={step.isCurrent ? {
                        boxShadow: [
                          '0 0 0 0 rgba(34, 197, 94, 0.1)',
                          '0 0 20px 5px rgba(34, 197, 94, 0.2)',
                          '0 0 0 0 rgba(34, 197, 94, 0.1)',
                        ],
                      } : {}}
                      transition={{ duration: 2, repeat: step.isCurrent ? Infinity : 0 }}
                    >
                      {/* Step Icon */}
                      <motion.div
                        className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.isCurrent 
                            ? 'bg-green-500' 
                            : 'bg-gray-800 border-2 border-green-500/30'
                        }`}
                        animate={step.isCurrent ? {
                          scale: [1, 1.05, 1],
                        } : {}}
                        transition={{ duration: 1, repeat: step.isCurrent ? Infinity : 0 }}
                      >
                        <span className={step.isCurrent ? 'text-black' : 'text-green-400'}>
                          {step.isCurrent ? <CheckCircle className="w-7 h-7" /> : step.icon}
                        </span>
                      </motion.div>

                      {/* Step Content */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <h4 className={`font-bold text-lg ${step.isCurrent ? 'text-green-400' : 'text-white'}`}>
                              {step.location}
                            </h4>
                            <p className="text-gray-400 text-sm">{step.address}</p>
                          </div>
                          <div className="flex flex-col items-start sm:items-end gap-1">
                            <motion.span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                step.isCurrent 
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                                  : 'bg-gray-800 text-gray-400'
                              }`}
                              animate={step.isCurrent ? { opacity: [1, 0.5, 1] } : {}}
                              transition={{ duration: 0.8, repeat: step.isCurrent ? Infinity : 0 }}
                            >
                              {step.status}
                            </motion.span>
                            <span className="text-xs text-gray-500 font-mono">
                              {step.date} • {step.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="mt-10 text-center"
              >
                <motion.div
                  animate={{ 
                    boxShadow: ['0 0 20px rgba(34, 197, 94, 0.3)', '0 0 40px rgba(34, 197, 94, 0.5)', '0 0 20px rgba(34, 197, 94, 0.3)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-full px-8 py-4"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full"
                  />
                  <motion.span 
                    className="text-green-400 font-mono text-lg"
                    animate={{ 
                      textShadow: [
                        '0 0 5px rgba(34, 197, 94, 0.5)',
                        '0 0 15px rgba(34, 197, 94, 0.8)',
                        '0 0 5px rgba(34, 197, 94, 0.5)',
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ✓ Package Successfully Delivered to Jagatpur, Cuttack
                  </motion.span>
                </motion.div>
                
                <Link 
                  to="/services/hardware"
                  className="inline-block mt-6 text-gray-400 hover:text-green-400 transition-colors"
                >
                  ← Back to Hardware Store
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Initial State - Before Search */}
        {!showResult && !isTracking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-gray-500 mt-16"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Package className="w-20 h-20 mx-auto mb-4 opacity-20" />
            </motion.div>
            <p className="font-mono">Awaiting tracking ID input...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TrackParcel;