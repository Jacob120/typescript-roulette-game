import React from 'react';
import styles from './BalanceAndBet.module.scss';
import { gameStore } from '../../../stores/gameStore';
import { observer } from 'mobx-react-lite';

const BalanceAndBet: React.FC = observer(() => {
  return (
    <div className={styles.root}>
      <div className={styles.totalBet}>
        Balance: <span>${gameStore.playerMoney}</span>
      </div>
      <div className={styles.totalBet}>
        Total bet: <span>${gameStore.getTotalBetAmount()}</span>
      </div>
    </div>
  );
});

export default BalanceAndBet;
