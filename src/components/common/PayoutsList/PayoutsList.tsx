import React, { useState } from 'react';
import styles from './PayoutsList.module.scss';
import WideArrowDownButton from '../buttons/WideArrowDownButton/WideArrowDownButton';

const PayoutsList: React.FC = () => {
  const [isListVisible, setIsListVisible] = useState(false);

  const toggleList = () => {
    setIsListVisible(!isListVisible);
  };

  return (
    <div className={styles.root}>
      <WideArrowDownButton
        actionName={'Payout rules'}
        handleClick={toggleList}
      />
      <div
        className={`${styles.wrapper} ${
          isListVisible ? styles.visible : styles.hidden
        }`}
      >
        <ol className={styles.listContent}>
          <li>Single number bet pays 35 to 1</li>
          <li>
            Twelve numbers or dozens (first, second, third dozen) pays 2 to 1
          </li>
          <li>Row bet (12 numbers in a row) pays 2 to 1</li>
          <li>18 numbers (1-18) pays even money </li>
          <li>18 numbers (19-36) pays even money </li>
          <li>Red or black pays even money </li>
          <li>Odd or even bets pay even money.</li>
        </ol>
      </div>
    </div>
  );
};

export default PayoutsList;
