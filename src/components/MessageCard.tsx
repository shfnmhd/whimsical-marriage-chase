import React from 'react';
import { motion } from 'framer-motion';

interface MessageCardProps {
  message: string;
  index: number;
  onCollect: () => void;
  isCollected: boolean;
}

const MessageCard = ({ message, index, onCollect, isCollected }: MessageCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className={`message-card ${isCollected ? 'bg-romantic-pink/50' : 'bg-white'}`}
      onClick={!isCollected ? onCollect : undefined}
    >
      <p className="text-lg font-semibold text-gray-800">{message}</p>
      {!isCollected && (
        <button className="mt-4 px-4 py-2 bg-romantic-pink rounded-full text-white hover:bg-romantic-accent transition-colors">
          Collect Message
        </button>
      )}
    </motion.div>
  );
};

export default MessageCard;