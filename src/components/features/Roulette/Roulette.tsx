import React, { useState, useEffect } from 'react';
import styles from './Roulette.module.scss';
import { gameStore } from '../../../stores/gameStore';
import { observer } from 'mobx-react-lite';
import SpinButton from '../../common/buttons/SpinButton/SpinButton';
import ResetButton from '../../common/buttons/ResetButton/ResetButton';
import RouletteWheel from './RouletteWheel';
import SoundOptionsButton from '../../common/buttons/SoundOptionsButton/SoundOptionsButton';
import { useLocation } from 'react-router-dom';

const Roulette: React.FC = observer(() => {
  const location = useLocation();
  const [showResetMessage, setShowResetMessage] = useState(false);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [showWheel, setShowWheel] = useState(false);
  const [spinSoundVolume, setSpinSoundVolume] = useState(0.5);
  const [musicVolume, setMusicVolume] = useState(0.2);
  const [volume, setVolume] = useState(0.5);
  const [displayedWinAmount, setDisplayedWinAmount] = useState<number | null>(
    null
  );

  const spinSound = new Audio('/assets/ball-sound-2.mp3');
  spinSound.volume = spinSoundVolume;

  const musicSound = new Audio('/assets/game-music-1.mp3');
  musicSound.volume = musicVolume;
  musicSound.loop = true;

  const winSound = new Audio('/assets/player-wins-sound.mp3');
  winSound.volume = musicVolume;

  const playSpinSound = () => {
    spinSound.play();
  };

  const handleSoundToggle = () => {
    if (volume === 0) {
      setVolume(0.5);
      spinSound.volume = 0.5;
      return;
    } else {
      setVolume(0);
      spinSound.volume = 0;
    }
  };

  const removeBets = () => {
    gameStore.bets = [];

    setShowResetMessage(true);
    setTimeout(() => {
      setShowResetMessage(false);
    }, 2000);
  };

  const handleSpin = () => {
    setShowWheel(true);
    playSpinSound();
    gameStore.spinRoulette();
    setTimeout(() => {
      setShowWheel(false);
    }, 16000);
  };

  useEffect(() => {
    if (gameStore.winAmount !== null) {
      setTimeout(() => {
        winSound.play();
        setShowWinMessage(true);
        setDisplayedWinAmount(gameStore.winAmount);
      }, 16000);
    }
  }, [gameStore.winAmount]);

  useEffect(() => {
    musicSound.play();

    return () => {
      musicSound.pause();
      musicSound.currentTime = 0;
    };
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
      {showWinMessage && (
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
        <span>${displayedWinAmount !== null ? displayedWinAmount : 0}</span>
      </div>
      <SpinButton handleClick={handleSpin} />
      <ResetButton handleClick={removeBets} />
      <SoundOptionsButton volume={volume} handleClick={handleSoundToggle} />
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
