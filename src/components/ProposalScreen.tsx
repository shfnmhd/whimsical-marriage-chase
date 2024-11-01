import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ProposalScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [timeElapsed, setTimeElapsed] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
      if (timeElapsed >= 15) {
        onComplete();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeElapsed, onComplete]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!noButtonRef.current) return;

    const buttonRect = noButtonRef.current.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    const distance = Math.sqrt(
      Math.pow(mouseX - buttonCenterX, 2) + Math.pow(mouseY - buttonCenterY, 2)
    );

    if (distance < 100) {
      const angle = Math.random() * Math.PI * 2;
      const newX = Math.cos(angle) * 150;
      const newY = Math.sin(angle) * 150;
      setNoButtonPosition({ x: newX, y: newY });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-romantic-purple/20"
      onMouseMove={handleMouseMove}
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">Will you marry me?</h2>
        <div className="space-y-4">
          <button className="px-8 py-3 bg-romantic-pink rounded-full text-white text-xl hover:bg-romantic-accent transition-colors">
            Yes!
          </button>
          <motion.button
            ref={noButtonRef}
            animate={noButtonPosition}
            className="floating-button px-8 py-3 bg-gray-400 rounded-full text-white text-xl ml-4"
          >
            No
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProposalScreen;