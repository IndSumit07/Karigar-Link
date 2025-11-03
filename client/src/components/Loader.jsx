// src/components/Loader.jsx
import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-black/30">
      <motion.div
        className="relative w-24 h-24"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      >
        <div className="absolute inset-0 border-4 border-t-transparent border-orange-500 rounded-full"></div>
        <div className="absolute inset-[6px] border-4 border-t-transparent border-white/60 rounded-full animate-spin-slow"></div>
      </motion.div>

      <motion.p
        className="absolute bottom-[40%] text-white text-xl font-semibold tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Loader;
