import React from 'react';
import styles from './WinningNumbers.module.scss';
import { observer } from 'mobx-react';
import { gameStore } from '../../../stores/gameStore';
import { RxTriangleDown } from 'react-icons/rx';

const WinningNumbers: React.FC = observer(() => {
  const numberStyle = (number: number) => {
    if (number === 0) {
      return styles.zero;
    } else if (number % 2 === 0) {
      return styles.even;
    } else {
      return styles.odd;
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
