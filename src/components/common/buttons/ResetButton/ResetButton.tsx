import React from 'react';
import styles from './ResetButton.module.scss';
import { RxReset } from 'react-icons/rx';

interface Props {
  handleClick: () => void;
}

const ResetButton: React.FC<Props> = ({ handleClick }) => {
  return (
    <button onClick={handleClick} className={styles.reset_button}>
      <RxReset className={styles.reset_icon} />
    </button>
  );
};

export default ResetButton;
