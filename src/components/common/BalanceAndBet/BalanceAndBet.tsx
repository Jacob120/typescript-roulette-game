import React from 'react';
import styles from './BalanceAndBet.module.scss';
import { gameStore } from '../../../stores/gameStore';
import { observer } from 'mobx-react-lite';
import MoneyElement from '../MoneyElement/MoneyElement';

const BalanceAndBet: React.FC = observer(() => {
  return (
    <div className={styles.root}>
      <MoneyElement name={'Balance'} amount={gameStore.playerMoney} />
      <MoneyElement name={'Total bet'} amount={gameStore.getTotalBetAmount()} />
    </div>
  );
});

export default BalanceAndBet;
