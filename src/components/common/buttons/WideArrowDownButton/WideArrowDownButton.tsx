import React from 'react';
import styles from './WideArrowDownButton.module.scss';
import { AiOutlineArrowDown } from 'react-icons/ai';

interface Props {
  actionName: string;
  handleClick: () => void;
}

const WideArrowDownButton: React.FC<Props> = ({ actionName, handleClick }) => {
  return (
    <button className={styles.wrapper} onClick={handleClick}>
      {actionName} <AiOutlineArrowDown />
    </button>
  );
};

export default WideArrowDownButton;
