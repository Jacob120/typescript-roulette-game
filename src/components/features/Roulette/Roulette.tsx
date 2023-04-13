import React, { useState } from 'react';
import styles from './Roulette.module.scss';
import { gameStore } from '../../../stores/gameStore';
import { observer } from 'mobx-react-lite';
import SpinButton from '../../common/buttons/SpinButton/SpinButton';
import ResetButton from '../../common/buttons/ResetButton/ResetButton';

const Roulette: React.FC = observer(() => {
  const [showMessage, setShowMessage] = useState(false);

  const removeBets = () => {
    gameStore.bets = [];

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  return (
    <div className={styles.root}>
      <div className={styles.win}>
        Win:{' '}
        <span>${gameStore.winAmount !== null ? gameStore.winAmount : 0}</span>
      </div>
      <SpinButton handleClick={gameStore.spinRoulette} />
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
