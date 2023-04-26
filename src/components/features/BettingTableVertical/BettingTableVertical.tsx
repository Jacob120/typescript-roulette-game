import React, { useState, useEffect, useMemo } from 'react';
import styles from './BettingTableVertical.module.scss';
import { observer } from 'mobx-react-lite';
import { gameStore } from '../../../stores/gameStore';
import Coin from '../../common/buttons/Coin/Coin';
import coinStyles from '../../common/buttons/Coin/Coin.module.scss';

const BettingTableVertical: React.FC = observer(() => {
  const winningNumber = gameStore.winningNumber;
  const [showWinningNumber, setShowWinningNumber] = useState(false);
  const isSpinning = gameStore.spinning;

  const coinSound = useMemo(() => {
    const sound = new Audio('/assets/coin-sound-3.mp3');
    return sound;
  }, []);

  useEffect(() => {
    if (winningNumber !== null) {
      setShowWinningNumber(false);
      setTimeout(() => {
        setShowWinningNumber(true);
      }, 14000);
    }
  }, [winningNumber]);

  const onDozenClick = (dozen: number) => {
    if (!isSpinning) {
      coinSound.play();
      gameStore.addDozen(dozen);
      gameStore.placeDozenBet(dozen);
    }
  };

  const onHalfClick = (half: string) => {
    if (!isSpinning) {
      coinSound.play();
      gameStore.addHalf(half);
      gameStore.placeHalfBet(half);
    }
  };

  const onRowClick = (row: number) => {
    if (!isSpinning) {
      coinSound.play();
      gameStore.addRow(row);
      gameStore.placeRowBet(row);
    }
  };

  const onNumberClick = (number: number) => {
    if (!isSpinning) {
      coinSound.play();
      gameStore.addNumber(number);
      gameStore.placeNumberBet(number);
    }
  };
  const renderBetCoin = (
    type: 'number' | 'dozen' | 'half' | 'row',
    value: number | string
  ): JSX.Element | null => {
    const betAmount = gameStore.getBetAmount(type, value);

    if (betAmount > 0) {
      const betColor = gameStore.getColorByValue(betAmount);

      return (
        <div className={styles.betCoin}>
          <Coin
            value={betAmount}
            color={betColor}
            handleClick={() => {}}
            customClass={coinStyles.smallCoin}
          />
        </div>
      );
    }

    return null;
  };

  const isRed = (number: number): boolean => {
    const redNumbers = [
      1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
    ];

    return redNumbers.includes(number);
  };

  const renderNumberCells = (): JSX.Element[] => {
    const cells = [];

    // Populate the cells array with the number cells
    for (let row = 1; row <= 3; row++) {
      for (let col = 1; col <= 12; col++) {
        // Calculate the number for the cell
        const number = (col - 1) * 3 + row;
        const red = isRed(number);

        cells.push(
          <div
            key={number}
            className={`${styles.numberedCell} ${
              red ? styles.red : styles.black
            }`}
            style={{ gridColumn: row, gridRow: col }}
            onClick={() => onNumberClick(number)}
          >
            {showWinningNumber && winningNumber === number && (
              <div className={styles.winningNumber} />
            )}

            {renderBetCoin('number', number)}
            {number}
          </div>
        );
      }
    }

    return cells;
  };

  return (
    <div className={`${styles.root}`}>
      <div className={styles.wrapper}>
        <div className={styles.halves}>
          <div onClick={() => onHalfClick('1to18')}>
            {' '}
            {renderBetCoin('half', '1to18')}1<br /> to
            <br /> 18
          </div>
          <div onClick={() => onHalfClick('EVEN')}>
            {' '}
            {renderBetCoin('half', 'EVEN')}EVEN
          </div>
          <div className={styles.red} onClick={() => onHalfClick('RED')}>
            {' '}
            {renderBetCoin('half', 'RED')}
          </div>
          <div className={styles.black} onClick={() => onHalfClick('BLACK')}>
            {' '}
            {renderBetCoin('half', 'BLACK')}
          </div>
          <div onClick={() => onHalfClick('ODD')}>
            {' '}
            {renderBetCoin('half', 'ODD')}ODD
          </div>
          <div onClick={() => onHalfClick('19to36')}>
            {' '}
            {renderBetCoin('half', '19to36')}19
            <br /> to
            <br /> 36
          </div>
        </div>
        <div className={styles.dozens}>
          <div onClick={() => onDozenClick(1)}>
            {renderBetCoin('dozen', 1)} 1<br /> to
            <br /> 12
          </div>
          <div onClick={() => onDozenClick(2)}>
            {renderBetCoin('dozen', 2)}13
            <br /> to
            <br /> 24
          </div>
          <div onClick={() => onDozenClick(3)}>
            {renderBetCoin('dozen', 3)}25
            <br /> to
            <br /> 36
          </div>
        </div>
        <div className={``}>
          <div className={styles.zeroCell} onClick={() => onNumberClick(0)}>
            {renderBetCoin('number', 0)}0
          </div>
          <div className={styles.board_cells}>{renderNumberCells()}</div>
          <div className={styles.twoToOne_wrapper}>
            <div
              className={styles.twoToOneCell}
              style={{ gridColumn: 14, gridRow: 1 }}
              onClick={() => onRowClick(3)}
            >
              {renderBetCoin('row', 3)}
              2:1
            </div>
            <div
              className={styles.twoToOneCell}
              style={{ gridColumn: 14, gridRow: 2 }}
              onClick={() => onRowClick(2)}
            >
              {renderBetCoin('row', 2)}
              2:1
            </div>
            <div
              className={styles.twoToOneCell}
              style={{ gridColumn: 14, gridRow: 3 }}
              onClick={() => onRowClick(1)}
            >
              {renderBetCoin('row', 1)}
              2:1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default BettingTableVertical;
