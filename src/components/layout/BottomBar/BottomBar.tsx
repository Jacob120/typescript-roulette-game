import React from 'react';
import styles from './BottomBar.module.scss';
import CoinSelector from '../../features/CoinSelector/CoinSelector';
import BetList from '../../common/PayoutsList/PayoutsList';
import Roulette from '../../features/Roulette/Roulette';
import BalanceAndBet from '../../common/BalanceAndBet/BalanceAndBet';

const BottomBar = () => {
  return (
    <div className={styles.root}>
      <BalanceAndBet />
      <CoinSelector />
      <Roulette />
    </div>
  );
};

export default BottomBar;
