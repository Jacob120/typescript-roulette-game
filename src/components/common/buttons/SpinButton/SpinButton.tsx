import React from 'react';
import styles from './SpinButton.module.scss';
import { ImSpinner9 } from 'react-icons/im';

interface SpinButtonProps {
  handleClick: () => void;
}

const SpinButton: React.FC<SpinButtonProps> = ({ handleClick }) => {
  return (
    <button onClick={handleClick} className={styles.spin_button}>
      <ImSpinner9 className={styles.spin_icon} />
    </button>
  );
};

export default SpinButton;
