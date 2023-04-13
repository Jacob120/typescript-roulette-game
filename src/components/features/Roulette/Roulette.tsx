import React, { useState } from 'react';
import { gameStore } from '../../../stores/gameStore';
import { observer } from 'mobx-react-lite';
import styles from './Roulette.module.scss';

const Roulette: React.FC = observer(() => {
  const [result, setResult] = useState<number | null>(null);
  const [winStatus, setWinStatus] = useState<boolean | null>(null);
  const [winAmount, setWinAmount] = useState<number | null>(null);
  console.log('winStatus', winStatus);
  console.log('winAmount', winAmount);

  const spinRoulette = () => {
    const randomNumber = Math.floor(Math.random() * 37);
    setResult(randomNumber);
    const { winStatus, winAmount } = gameStore.checkWinningNumber(randomNumber);
    setWinStatus(winStatus);
    setWinAmount(winAmount);
  };

  const checkWinningBets = (number: number) => {
    // Check for winning number bets
    if (gameStore.selectedNumbers.includes(number)) {
      console.log(`You won on number ${number}!`);
      gameStore.playerMoney += gameStore.getBetAmount('number', number) * 36;
    }

    // Check for winning dozen bets
    const dozen = Math.floor(number / 12);
    console.log(dozen);
    if (gameStore.selectedDozens.includes(dozen)) {
      console.log(`You won on dozen ${dozen}!`);
      gameStore.playerMoney += gameStore.getBetAmount('dozen', dozen) * 3;
    }

    // Check for winning half bets
    const half = number < 19 ? 'low' : 'high';
    if (gameStore.selectedHalves.includes(half)) {
      console.log(`You won on half ${half}!`);
      gameStore.playerMoney += gameStore.getBetAmount('half', half) * 2;
    }

    // Check for winning row bets
    const row = Math.ceil(number / 3);
    if (gameStore.selectedRows.includes(row)) {
      console.log(`You won on row ${row}!`);
      gameStore.playerMoney += gameStore.getBetAmount('row', row) * 3;
    }

    // Clear the bets array
    // gameStore.bets = [];
  };

  return (
    <div className={styles.root}>
      <div className={styles.roulette}>
        <div className={styles.result}>{result !== null ? result : '?'}</div>
        <button onClick={spinRoulette} className={styles.spinButton}>
          Spin
        </button>
      </div>
      <div>Won: {gameStore.winAmount}</div>
    </div>
  );
});

export default Roulette;
