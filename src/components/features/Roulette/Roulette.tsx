import React, { useState } from 'react';
import styles from './Roulette.module.scss';
import { gameStore } from '../../../stores/gameStore';
import { observer } from 'mobx-react-lite';
import SpinButton from '../../common/buttons/SpinButton/SpinButton';
import ResetButton from '../../common/buttons/ResetButton/ResetButton';
import RouletteWheel from './RouletteWheel';

const Roulette: React.FC = observer(() => {
  const [showMessage, setShowMessage] = useState(false);
  const [showWheel, setShowWheel] = useState(false);

  const removeBets = () => {
    gameStore.bets = [];

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const handleSpin = () => {
    setShowWheel(true);
    gameStore.spinRoulette();
    // setTimeout(() => {
    //   setShowWheel(false);
    // }, 5000);
  };

  return (
    <div className={styles.root}>
      {showWheel && (
        <div className={styles.rouletteWheelModal}>
          <RouletteWheel
            width={800}
            height={750}
            winningNumber={gameStore.winningNumber!}
          />
        </div>
      )}
      <div className={styles.win}>
        Win:{' '}
        <span>${gameStore.winAmount !== null ? gameStore.winAmount : 0}</span>
      </div>
      <SpinButton handleClick={handleSpin} />
      <ResetButton handleClick={removeBets} />
      <div
        className={`${styles.message} ${showMessage ? styles.showMessage : ''}`}
      >
        All bets cleared
      </div>
    </div>
  );
});

export default Roulette;
