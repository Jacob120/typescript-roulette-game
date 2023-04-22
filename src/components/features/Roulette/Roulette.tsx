import React, { useState, useEffect, useMemo } from 'react';
import styles from './Roulette.module.scss';
import { gameStore } from '../../../stores/gameStore';
import { observer } from 'mobx-react-lite';
import SpinButton from '../../common/buttons/SpinButton/SpinButton';
import ResetButton from '../../common/buttons/ResetButton/ResetButton';
import RouletteWheel from './RouletteWheel';
import SoundOptionsButton from '../../common/buttons/SoundOptionsButton/SoundOptionsButton';
import MoneyElement from '../../common/MoneyElement/MoneyElement';

const Roulette: React.FC = observer(() => {
  const [showResetMessage, setShowResetMessage] = useState(false);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [showWheel, setShowWheel] = useState(false);
  const [spinSoundVolume, setSpinSoundVolume] = useState(0.5); // eslint-disable-line
  const [musicVolume, setMusicVolume] = useState(0.2); // eslint-disable-line
  const [winSoundVolume, setWinSoundVolume] = useState(0.5); // eslint-disable-line
  const [displayedWinAmount, setDisplayedWinAmount] = useState<number | null>(
    null
  );
  const [isSound, setIsSound] = useState(true);

  const winAmount = gameStore.winAmount;

  const spinSound = useMemo(() => {
    const sound = new Audio('/assets/ball-sound-2.mp3');
    sound.volume = spinSoundVolume;
    return sound;
  }, [spinSoundVolume]);

  const musicSound = useMemo(() => {
    const sound = new Audio('/assets/game-music-1.mp3');
    sound.volume = musicVolume;
    sound.loop = true;
    return sound;
  }, [musicVolume]);

  const winSound = useMemo(() => {
    const sound = new Audio('/assets/player-wins-sound.mp3');
    sound.volume = winSoundVolume;
    return sound;
  }, [winSoundVolume]);

  const playSpinSound = () => {
    spinSound.play();
  };

  const handleSoundToggle = () => {
    if (!isSound) {
      setIsSound(true);
      musicSound.volume = 0.2;
      spinSound.volume = 0.5;
      winSound.volume = 0.5;
    } else {
      setIsSound(false);
      musicSound.volume = 0;
      spinSound.volume = 0;
      winSound.volume = 0;
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
    if (winAmount !== null) {
      setTimeout(() => {
        winSound.play();
        setShowWinMessage(true);
        setDisplayedWinAmount(winAmount);
      }, 16000);
    }
  }, [winAmount, winSound]);

  useEffect(() => {
    if (isSound) {
      musicSound.play();
    } else {
      musicSound.pause();
    }
  }, [isSound, musicSound]);

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
          You won ${winAmount}
        </div>
      )}
      {/* <div className={styles.win}>
        Win:{' '}
        <span>${displayedWinAmount !== null ? displayedWinAmount : 0}</span>
      </div> */}
      <MoneyElement
        name={'Win'}
        amount={displayedWinAmount !== null ? displayedWinAmount : 0}
      />
      <SpinButton handleClick={handleSpin} />
      <ResetButton handleClick={removeBets} />
      <SoundOptionsButton volume={isSound} handleClick={handleSoundToggle} />
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
