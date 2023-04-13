import React from 'react';
import styles from './BottomBar.module.scss';
import CoinSelector from '../../features/CoinSelector/CoinSelector';
import BetList from '../../common/PayoutsList/PayoutsList';
import Roulette from '../../features/Roulette/Roulette';

const BottomBar = () => {
  return (
    <div className={styles.root}>
      <CoinSelector />
      <Roulette />
    </div>
  );
};

export default BottomBar;
