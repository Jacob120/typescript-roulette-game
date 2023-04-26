import React from 'react';
import styles from './BottomBar.module.scss';
import CoinSelector from '../../features/CoinSelector/CoinSelector';
import Roulette from '../../features/Roulette/Roulette';
import BalanceAndBet from '../../common/BalanceAndBet/BalanceAndBet';

interface BottomBarProps {
  isVertical: boolean;
  width: number;
}

const BottomBar: React.FC<BottomBarProps> = ({ isVertical, width }) => {
  return (
    <div
      className={`${styles.root} ${isVertical ? styles.bottomBarVertical : ''}`}
    >
      {isVertical ? (
        <>
          <CoinSelector />
          <Roulette isVertical={isVertical} width={width} />
          <BalanceAndBet />
        </>
      ) : (
        <>
          <BalanceAndBet />
          <CoinSelector />
          <Roulette isVertical={isVertical} width={width} />
        </>
      )}
    </div>
  );
};

export default BottomBar;
