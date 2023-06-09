import React, { useState, useEffect, useMemo, useRef } from 'react';
import styles from './Roulette.module.scss';
import { gameStore } from '../../../stores/gameStore';
import { observer } from 'mobx-react-lite';
import SpinButton from '../../common/buttons/SpinButton/SpinButton';
import ResetButton from '../../common/buttons/ResetButton/ResetButton';
import RouletteWheel from '../RouletteWheel/RouletteWheel';
import SoundOptionsButton from '../../common/buttons/SoundOptionsButton/SoundOptionsButton';

interface RouletteProps {
  isVertical: boolean;
  width: number;
}

const Roulette: React.FC<RouletteProps> = observer(({ isVertical, width }) => {
  const [showResetMessage, setShowResetMessage] = useState(false);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [showWheel, setShowWheel] = useState(false);
  const [spinSoundVolume, setSpinSoundVolume] = useState(0.5); // eslint-disable-line
  const [musicVolume, setMusicVolume] = useState(0.2); // eslint-disable-line
  const [winSoundVolume, setWinSoundVolume] = useState(0.5); //eslint-disable-line

  const [isSound, setIsSound] = useState(true);
  const initialLoad = useRef(true);

  const winAmount = gameStore.winAmount;
  const winningNumber = gameStore.winningNumber;
  const isSpinning = gameStore.spinning;

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
    } else {
      setIsSound(false);
      musicSound.volume = 0;
    }
  };

  const removeBets = () => {
    if (isSpinning) return;
    const returnedBetAmount = gameStore.clearBets();
    gameStore.playerMoney += returnedBetAmount;

    setShowResetMessage(true);
    setTimeout(() => {
      setShowResetMessage(false);
    }, 2000);
  };

  const handleSpin = () => {
    if (isSpinning) return;
    gameStore.setWinAmount(0);
    setShowWheel(true);
    playSpinSound();
    gameStore.spinRoulette();
    setTimeout(() => {
      setShowWheel(false);
    }, 16000);
  };

  useEffect(() => {
    if (winAmount !== null && winningNumber !== null) {
      setShowWinMessage(false);
      setTimeout(() => {
        winSound.play();
        setShowWinMessage(true);
      }, 16000);
    }
  }, [winningNumber, winAmount, winSound]);

  useEffect(() => {
    return () => {
      musicSound.pause();
      musicSound.currentTime = 0;
    };
  }, [musicSound]);

  useEffect(() => {
    if (initialLoad.current) {
      const playMusic = async () => {
        try {
          await musicSound.play();
        } catch (error) {
          if ((error as DOMException).name === 'NotAllowedError') {
            const playOnInteraction = () => {
              musicSound.play();
              window.removeEventListener('click', playOnInteraction);
            };
            window.addEventListener('click', playOnInteraction);
          }
        }
      };

      playMusic();
      initialLoad.current = false;
    }
  }, [musicSound, initialLoad]);

  return (
    <div className={styles.root}>
      {showWheel && (
        <div className={styles.rouletteWheelModal}>
          <div className={styles.canvas_wrapper}>
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
          className={`${styles.message_wrapper} ${
            showWinMessage ? styles.showMessage : ''
          }`}
        >
          <div className={styles.message_container}>
            <img
              src='/assets/images/Golden-3D-Dollar-Sign.svg'
              alt='Roulette table'
              width={250}
              height={250}
            />
            <p className={styles.win_message}>You win!</p>
            <p className={styles.win_amount}>${winAmount}</p>
          </div>
        </div>
      )}

      <div className={styles.button_wrapper}>
        <p>Spin</p>
        <SpinButton handleClick={handleSpin} />
      </div>
      <div className={styles.button_wrapper}>
        <p>Reset</p>
        <ResetButton handleClick={removeBets} />
      </div>
      <div className={styles.button_wrapper}>
        <p>Music</p>
        <SoundOptionsButton volume={isSound} handleClick={handleSoundToggle} />
      </div>
      <div
        className={`${styles.reset_message} ${
          showResetMessage ? styles.showMessage : ''
        }`}
      >
        All bets cleared
      </div>
    </div>
  );
});

export default Roulette;
