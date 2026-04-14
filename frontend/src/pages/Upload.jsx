import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Image as ImageIcon, CheckCircle, ShieldCheck, Coins, RefreshCw } from 'lucide-react';
import UploadScanner from '../components/UploadScanner';

const Upload = () => {
  const [step, setStep] = useState(0); // 0: before, 1: after, 2: scanning, 3: done
  const [beforeImg, setBeforeImg] = useState(null);
  const [afterImg, setAfterImg] = useState(null);

  // Define steps for the visual tracker
  const trackerSteps = ['Before', 'After', 'Verify', 'Done'];

  const handleCameraClick = (type) => {
    // Simulated mock loading delay to feel authentic
    if (type === 'before') {
      setTimeout(() => {
        setBeforeImg('https://images.unsplash.com/photo-1618477461853-cf6ed80f04c3?q=80&w=1000&auto=format&fit=crop'); // Dirty / trash image mock
        setStep(1);
      }, 500);
    } else if (type === 'after') {
      setTimeout(() => {
        setAfterImg('https://images.unsplash.com/photo-1584346860368-6f6a738ba5b4?q=80&w=1000&auto=format&fit=crop'); // Cleaned image mock
        setStep(2); // Auto trigger AI Verify state immediately
      }, 500);
    }
  };

  const handleReset = () => {
    setStep(0);
    setBeforeImg(null);
    setAfterImg(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex flex-col items-center min-h-[85vh]">
      
      {/* Page Title Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold dark:text-white text-slate-900 tracking-tight mb-4">
          Upload & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-500 drop-shadow-sm">Verify</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto">
          Capture the environmental cleanup change. Let our AI analyze the data to earn your digital Eco-Coins.
        </p>
      </motion.div>

      {/* Progress Timeline Tracker */}
      <div className="w-full max-w-3xl mb-16 relative z-10 px-4">
        {/* Background track line */}
        <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-200/50 dark:bg-white/10 -translate-y-1/2 rounded-full border border-black/5 dark:border-white/5 backdrop-blur-sm" />
        
        {/* Animated active track line */}
        <div 
          className="absolute top-1/2 left-0 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 -translate-y-1/2 rounded-full transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-[0_0_15px_rgba(236,72,153,0.5)]" 
          style={{ width: `${(step / 3) * 100}%` }}
        />
        
        <div className="flex justify-between relative z-10">
          {trackerSteps.map((label, idx) => {
            const isActive = step >= idx;
            const isCurrent = step === idx;
            return (
              <div key={label} className="flex flex-col items-center gap-3">
                <motion.div 
                  initial={false}
                  animate={{ 
                    scale: isCurrent ? 1.25 : 1,
                    backgroundColor: isActive ? '#ec4899' : 'rgba(30, 41, 59, 0.5)', /* Pink vs frosted slate */
                  }}
                  className={`w-10 h-10 md:w-14 md:h-14 rounded-full border-[3px] md:border-4 flex items-center justify-center transition-all duration-700 glass-subtle 
                    ${isActive ? 'border-pink-200 shadow-[0_0_20px_rgba(236,72,153,0.7)]' : 'border-slate-400/30'}`}
                >
                  {isActive ? (
                    <CheckCircle size={24} className="text-white drop-shadow-md" />
                  ) : (
                    <div className="text-slate-500 dark:text-slate-400 text-sm md:text-lg font-bold">{idx + 1}</div>
                  )}
                </motion.div>
                <span className={`text-xs md:text-sm font-bold tracking-wide transition-colors duration-500 uppercase ${isActive ? 'text-pink-600 dark:text-pink-400' : 'text-slate-500 dark:text-slate-400'}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Glass Area */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-5xl glass p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden flex flex-col md:flex-row gap-6 md:gap-10 min-h-[500px] border border-white/40 dark:border-white/10 shadow-2xl"
      >
         
         {/* LEFT BOX: Before Photo */}
         <div className={`flex-1 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${step === 0 ? 'scale-100 opacity-100 z-10' : 'scale-[0.98] opacity-60 grayscale-[30%]'}`}>
            <h3 className="text-lg md:text-2xl font-bold dark:text-white text-slate-800 mb-4 flex justify-between items-center drop-shadow-sm">
              <span className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-500 flex items-center justify-center text-sm">1</span>
                Before Photo
              </span>
              {beforeImg && <ShieldCheck className="text-emerald-500" size={28} />}
            </h3>
            
            <div className="flex-1 rounded-[2rem] border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white/40 dark:bg-black/30 flex flex-col items-center justify-center p-4 relative overflow-hidden group hover:border-pink-400 transition-colors duration-300 shadow-inner">
              {beforeImg ? (
                <motion.img 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  src={beforeImg} 
                  alt="Before cleanup" 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
              ) : (
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center text-slate-500 dark:text-slate-400 cursor-pointer p-8 rounded-3xl group-hover:bg-pink-500/5 transition-colors" 
                  onClick={() => handleCameraClick('before')}
                >
                  <div className="w-24 h-24 rounded-[2rem] bg-pink-500/10 flex items-center justify-center mb-6 shadow-[inset_0_0_20px_rgba(236,72,153,0.1)] group-hover:bg-pink-500/20 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.2)] transition-all duration-300">
                    <Camera size={44} className="text-pink-500 drop-shadow-md" />
                  </div>
                  <span className="font-extrabold text-xl dark:text-slate-200">Open Camera</span>
                  <span className="text-sm mt-2 opacity-80 font-medium">Capture original heavily-polluted state</span>
                </motion.div>
              )}
            </div>
         </div>

         {/* RIGHT BOX: After Photo & Verify Scanner */}
         <div className={`flex-1 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${step >= 1 ? 'scale-100 opacity-100 z-20' : 'scale-[0.96] opacity-40 pointer-events-none'}`}>
            <h3 className="text-lg md:text-2xl font-bold dark:text-white text-slate-800 mb-4 flex justify-between items-center drop-shadow-sm">
               <span className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors ${step >= 1 ? 'bg-indigo-500/20 text-indigo-500' : 'bg-slate-500/20 text-slate-500'}`}>2</span>
                {step === 2 ? 'AI Analyzing' : 'After Photo'}
              </span>
              {step === 3 && <ShieldCheck className="text-emerald-500" size={28} />}
            </h3>
            
            <div className={`flex-1 rounded-[2rem] border-2 border-dashed bg-white/40 dark:bg-black/30 flex flex-col items-center justify-center p-4 relative overflow-hidden group transition-all duration-500 shadow-inner
              ${step === 2 ? 'border-cyan-500 shadow-[0_0_40px_rgba(34,211,238,0.2)]' : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400'}`}>
              
              {/* State 1: Request After Image */}
              {step === 1 && !afterImg && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center text-slate-500 dark:text-slate-400 cursor-pointer p-8 rounded-3xl group-hover:bg-indigo-500/5 transition-colors" 
                  onClick={() => handleCameraClick('after')}
                >
                  <div className="w-24 h-24 rounded-[2rem] bg-indigo-500/10 flex items-center justify-center mb-6 shadow-[inset_0_0_20px_rgba(99,102,241,0.1)] group-hover:bg-indigo-500/20 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-300">
                    <ImageIcon size={44} className="text-indigo-500 drop-shadow-md" />
                  </div>
                  <span className="font-extrabold text-xl dark:text-slate-200">Open Camera</span>
                  <span className="text-sm mt-2 opacity-80 font-medium">Capture perfectly cleaned state</span>
                </motion.div>
              )}

              {/* State 2: GSAP Scanning Engine Over Image */}
              {step === 2 && afterImg && (
                 <UploadScanner imageUrl={afterImg} onScanComplete={() => setStep(3)} />
              )}

              {/* State 3: Successfully Verified & Rewarded */}
              {step === 3 && afterImg && (
                 <motion.div 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }} 
                   transition={{ duration: 0.8 }}
                   className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-emerald-900/40 border-4 border-emerald-500 rounded-[2rem] overflow-hidden backdrop-blur-sm"
                 >
                    <img src={afterImg} alt="After cleanup" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity filter blur-sm" />
                    
                    {/* Glowing pulse rings behind checkmark */}
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} 
                      transition={{ duration: 2, repeat: Infinity }} 
                      className="absolute w-32 h-32 rounded-full border-2 border-emerald-400/50" 
                    />
                    
                    <motion.div 
                      initial={{ scale: 0, rotate: -45 }} 
                      animate={{ scale: 1, rotate: 0 }} 
                      transition={{ type: 'spring', damping: 12, stiffness: 200 }} 
                      className="relative z-10 flex flex-col items-center text-center p-6"
                    >
                       <CheckCircle size={80} className="text-emerald-400 drop-shadow-[0_0_25px_rgba(52,211,153,1)] mb-6" />
                       <h4 className="text-3xl font-extrabold text-white 
                                     drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] tracking-tight">
                         Verified Perfectly!
                       </h4>
                       <p className="text-emerald-100 font-medium mt-2 shadow-black drop-shadow-lg max-w-[200px] leading-snug">
                         The environment thanks you for your action.
                       </p>
                       
                       {/* Coins Badge */}
                       <motion.div 
                         initial={{ y: 20, opacity: 0 }}
                         animate={{ y: 0, opacity: 1 }}
                         transition={{ delay: 0.5, type: 'spring' }}
                         className="mt-6 px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full flex items-center gap-3 shadow-[0_0_40px_rgba(245,158,11,0.6)] hover:scale-105 transition-transform border border-yellow-200 cursor-default"
                       >
                          <Coins className="text-white drop-shadow-md" size={24} />
                          <span className="font-black text-white text-xl tracking-wider drop-shadow-md">+50 ECO</span>
                       </motion.div>
                    </motion.div>
                 </motion.div>
              )}
            </div>
         </div>

      </motion.div>

      {/* Restart workflow button */}
      <AnimatePresence>
        {step === 3 && (
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={handleReset}
            className="mt-10 px-6 py-3 rounded-xl glass hover:bg-white/20 dark:hover:bg-white/10 font-bold text-slate-800 dark:text-white flex items-center gap-2 hover:-translate-y-1 transition-all shadow-lg"
          >
            <RefreshCw size={18} />
            Scan Another Area
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Upload;
