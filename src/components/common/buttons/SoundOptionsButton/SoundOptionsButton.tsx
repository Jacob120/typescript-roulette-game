import React from 'react';
import styles from './SoundOptionsButton.module.scss';
import { RxSpeakerLoud, RxSpeakerOff } from 'react-icons/rx';

interface SoundOptionsButtonProps {
  volume: boolean;
  handleClick: () => void;
}

const SoundOptionsButton: React.FC<SoundOptionsButtonProps> = ({
  volume,
  handleClick,
}) => {
  return (
    <button onClick={handleClick} className={styles.reset_button}>
      {!volume ? (
        <RxSpeakerOff className={styles.reset_icon} />
      ) : (
        <RxSpeakerLoud className={styles.reset_icon} />
      )}
    </button>
  );
};

export default SoundOptionsButton;
