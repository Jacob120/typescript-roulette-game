import React, { useState, useEffect } from 'react';
import styles from './Roulette.module.scss';
import { gameStore } from '../../../stores/gameStore';
import { observer } from 'mobx-react-lite';
import SpinButton from '../../common/buttons/SpinButton/SpinButton';
import ResetButton from '../../common/buttons/ResetButton/ResetButton';
import RouletteWheel from './RouletteWheel';

const Roulette: React.FC = observer(() => {
  const [showResetMessage, setShowResetMessage] = useState(false);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [showWheel, setShowWheel] = useState(false);

  const removeBets = () => {
    gameStore.bets = [];

    setShowResetMessage(true);
    setTimeout(() => {
      setShowResetMessage(false);
    }, 2000);
  };

  const handleSpin = () => {
    setShowWheel(true);
    gameStore.spinRoulette();
    setTimeout(() => {
      setShowWheel(false);
    }, 15000);
  };

  useEffect(() => {
    if (gameStore.winAmount !== null) {
      setTimeout(() => {
        setShowWinMessage(true);
      }, 13000);
    }
  }, []);

  return (
    <div className={styles.root}>
      {showWheel && (
        <div className={styles.rouletteWheelModal}>
          <div className={styles.canvas}>
            <RouletteWheel
              width={800}
              height={750}
              winningNumber={gameStore.winningNumber!}
            />
          </div>
        </div>
      )}
      {gameStore.winAmount && (
        <div
          className={`${styles.win_message} ${
            showWinMessage ? styles.showMessage : ''
          }`}
        >
          You won ${gameStore.winAmount}
        </div>
      )}

      <div className={styles.win}>
        Win:{' '}
        <span>${gameStore.winAmount !== null ? gameStore.winAmount : 0}</span>
      </div>
      <SpinButton handleClick={handleSpin} />
      <ResetButton handleClick={removeBets} />
      <div
        className={`${styles.message} ${
          showResetMessage ? styles.showMessage : ''
        }`}
      >
        All bets cleared
      </div>
    </div>
  );
});

export default Roulette;
