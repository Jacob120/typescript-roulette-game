import React, { useState, useEffect, useMemo } from 'react';
import styles from './BalanceAndBet.module.scss';
import { gameStore } from '../../../stores/gameStore';
import { observer } from 'mobx-react-lite';
import MoneyElement from '../MoneyElement/MoneyElement';

const BalanceAndBet: React.FC = observer(() => {
  const [displayedWinAmount, setDisplayedWinAmount] = useState<number | null>(
    null
  );
  const winAmount = gameStore.winAmount;
  const isSpinning = gameStore.spinning;

  useEffect(() => {
    if (winAmount !== null) {
      if (gameStore.spinning) {
        setDisplayedWinAmount(0);
      } else {
        setDisplayedWinAmount(winAmount);
      }
    }
  }, [winAmount, isSpinning]);

  return (
    <div className={styles.root}>
      <MoneyElement
        name={'Win'}
        amount={displayedWinAmount !== null ? displayedWinAmount : 0}
      />

      <MoneyElement name={'Balance'} amount={gameStore.playerMoney} />
      <MoneyElement name={'Total bet'} amount={gameStore.getTotalBetAmount()} />
    </div>
  );
});

export default BalanceAndBet;
