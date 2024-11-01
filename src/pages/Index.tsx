import React, { useState } from 'react';
import MessageCard from '../components/MessageCard';
import ProposalScreen from '../components/ProposalScreen';
import Celebration from '../components/Celebration';

const messages = [
  "Hey there! I've got something special to tell you...",
  "You know, ever since we met, my life has been brighter",
  "Every moment with you feels like magic",
  "You make me laugh, you make me smile",
  "I can't imagine my life without you",
];

const Index = () => {
  const [collectedMessages, setCollectedMessages] = useState<number[]>([]);
  const [showProposal, setShowProposal] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleCollectMessage = (index: number) => {
    setCollectedMessages([...collectedMessages, index]);
    if (collectedMessages.length + 1 === messages.length) {
      setTimeout(() => setShowProposal(true), 1000);
    }
  };

  const handleProposalComplete = () => {
    setShowProposal(false);
    setShowCelebration(true);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-romantic-purple/20 to-romantic-pink/20">
      <div className="max-w-2xl mx-auto space-y-6">
        {messages.map((message, index) => (
          <MessageCard
            key={index}
            message={message}
            index={index}
            onCollect={() => handleCollectMessage(index)}
            isCollected={collectedMessages.includes(index)}
          />
        ))}
      </div>
      
      {showProposal && <ProposalScreen onComplete={handleProposalComplete} />}
      {showCelebration && <Celebration />}
    </div>
  );
};

export default Index;