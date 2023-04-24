import React from 'react';
import styles from './WinningNumbers.module.scss';
import { observer } from 'mobx-react';
import { gameStore } from '../../../stores/gameStore';
import { RxTriangleDown } from 'react-icons/rx';

const WinningNumbers: React.FC = observer(() => {
  const isRed = (number: number): boolean => {
    const redNumbers = [
      1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
    ];

    return redNumbers.includes(number);
  };

  const numberStyle = (number: number) => {
    if (number === 0) {
      return styles.zero;
    } else if (!isRed(number)) {
      return styles.black;
    } else {
      return styles.red;
    }
  };

  return (
    <div className={styles.root}>
      {gameStore.resultsHistory.length > 0 && (
        <div>
          <RxTriangleDown className={styles.arrow} />
          <div className={styles.results}>
            {gameStore.resultsHistory.map((number, index) => (
              <div key={index} className={numberStyle(number)}>
                {number}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default WinningNumbers;
