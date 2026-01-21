import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, MapPin, Truck, CheckCircle, AlertCircle, Search, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TrackingStep {
  location: string;
  status: string;
  timestamp: string;
  isCompleted: boolean;
  isCurrent: boolean;
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
      location: 'TDCS TECHNOLOGIES PRIVATE LIMITED',
      status: 'Order Dispatched',
      timestamp: 'Raskundu, Garhbeta, West Bengal',
      isCompleted: true,
      isCurrent: false,
    },
    {
      location: 'Kolkata Headquarters',
      status: 'In Transit - Processing Hub',
      timestamp: 'Kolkata, West Bengal',
      isCompleted: true,
      isCurrent: false,
    },
    {
      location: 'Cuttack Distribution Center',
      status: 'Delivered Successfully',
      timestamp: 'Cuttack, Odisha',
      isCompleted: true,
      isCurrent: true,
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

    // Terminal animation
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
      }, index * 800);
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

      {/* Glowing orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Terminal className="w-8 h-8 text-green-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              Track Your Parcel
            </h1>
          </div>
          <p className="text-gray-400 max-w-xl mx-auto">
            Enter your tracking ID to monitor your shipment in real-time
          </p>
        </motion.div>

        {/* Notice Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5 animate-pulse" />
            <div>
              <p className="text-yellow-400 font-medium text-sm">📦 Important Notice</p>
              <p className="text-gray-300 text-sm mt-1">
                After completing payment on the hardware page, please wait <span className="text-green-400 font-bold">1-2 hours</span> to receive your tracking ID. 
                You can then track your order here.
              </p>
            </div>
          </div>
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

        {/* Tracking Result */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto"
            >
              {/* Status Header */}
              <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/30 rounded-xl p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Tracking ID</p>
                    <p className="text-xl font-mono text-green-400">{validTrackingId}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        boxShadow: ['0 0 0 0 rgba(34, 197, 94, 0.4)', '0 0 0 10px rgba(34, 197, 94, 0)', '0 0 0 0 rgba(34, 197, 94, 0)']
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-4 h-4 rounded-full bg-green-500"
                    />
                    <span className="text-green-400 font-bold text-lg">DELIVERED</span>
                  </div>
                </div>
              </div>

              {/* Tracking Steps */}
              <div className="relative">
                {/* Wave Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 overflow-hidden">
                  <motion.div
                    animate={{ 
                      background: [
                        'linear-gradient(to bottom, transparent, #22c55e, transparent)',
                        'linear-gradient(to bottom, #22c55e, transparent, #22c55e)',
                        'linear-gradient(to bottom, transparent, #22c55e, transparent)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-full h-full"
                  />
                </div>

                <div className="space-y-6">
                  {trackingSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={currentStep > index ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 0 }}
                      transition={{ delay: index * 0.3, duration: 0.5 }}
                      className="relative flex items-start gap-6"
                    >
                      {/* Step Indicator */}
                      <motion.div
                        animate={step.isCurrent ? {
                          scale: [1, 1.3, 1],
                          boxShadow: ['0 0 0 0 rgba(34, 197, 94, 0.7)', '0 0 0 15px rgba(34, 197, 94, 0)', '0 0 0 0 rgba(34, 197, 94, 0.7)']
                        } : {}}
                        transition={{ duration: 1.5, repeat: step.isCurrent ? Infinity : 0 }}
                        className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.isCurrent 
                            ? 'bg-green-500 shadow-lg shadow-green-500/50' 
                            : step.isCompleted 
                              ? 'bg-green-600/30 border-2 border-green-500' 
                              : 'bg-gray-800 border-2 border-gray-700'
                        }`}
                      >
                        {step.isCurrent ? (
                          <CheckCircle className="w-8 h-8 text-black" />
                        ) : index === 0 ? (
                          <Package className="w-6 h-6 text-green-400" />
                        ) : index === 1 ? (
                          <Truck className="w-6 h-6 text-green-400" />
                        ) : (
                          <MapPin className="w-6 h-6 text-green-400" />
                        )}
                      </motion.div>

                      {/* Step Content */}
                      <div className={`flex-1 bg-gray-900/80 border rounded-xl p-5 ${
                        step.isCurrent ? 'border-green-500/50 shadow-lg shadow-green-500/10' : 'border-gray-800'
                      }`}>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className={`font-bold text-lg ${step.isCurrent ? 'text-green-400' : 'text-white'}`}>
                              {step.location}
                            </h3>
                            <p className="text-gray-400 mt-1">{step.timestamp}</p>
                          </div>
                          <motion.span
                            animate={step.isCurrent ? { opacity: [1, 0.5, 1] } : {}}
                            transition={{ duration: 0.8, repeat: step.isCurrent ? Infinity : 0 }}
                            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                              step.isCurrent 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                                : 'bg-gray-800 text-gray-400'
                            }`}
                          >
                            {step.status}
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
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
                  <span className="text-green-400 font-mono text-lg">
                    ✓ Package Successfully Delivered to Destination
                  </span>
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
            <Package className="w-20 h-20 mx-auto mb-4 opacity-20" />
            <p className="font-mono">Awaiting tracking ID input...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TrackParcel;
