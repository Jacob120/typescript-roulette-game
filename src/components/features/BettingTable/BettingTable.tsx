import React from 'react';
import styles from './BettingTable.module.scss';

interface BettingTableProps {
  onPlaceBet: (bet: number, amount: number) => void;
}

const BettingTable: React.FC<BettingTableProps> = ({ onPlaceBet }) => {
  // Implement the component logic here

  const handlePlaceBet = (bet: number, amount: number) => {
    onPlaceBet(bet, amount);
  };

  return (
    <div className={styles.bettingTable}>
      {/* Render the betting table UI here */}
      <button onClick={() => handlePlaceBet(1, 10)}>Place Bet</button>
    </div>
  );
};

export default BettingTable;
