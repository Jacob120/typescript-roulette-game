import React from 'react';
import styles from './BettingTable.module.scss';
import { observer } from 'mobx-react-lite';
import { gameStore } from '../../../stores/gameStore';
import Coin from '../../common/buttons/Coin/Coin';
import coinStyles from '../../common/buttons/Coin/Coin.module.scss';

const BettingTable: React.FC = observer(() => {
  const onDozenClick = (dozen: number) => {
    gameStore.addDozen(dozen);
    gameStore.placeDozenBet(dozen);
  };

  const onHalfClick = (half: string) => {
    gameStore.addHalf(half);
    gameStore.placeHalfBet(half);
  };

  const onRowClick = (row: number) => {
    gameStore.addRow(row);
    gameStore.placeRowBet(row);
  };

  const onNumberClick = (number: number) => {
    gameStore.addNumber(number);
    gameStore.placeNumberBet(number);
  };

  // console.log('Selected numbers:', gameStore.selectedNumbers);
  // console.log('Selected dozens:', gameStore.selectedDozens);
  // console.log('Selected halves:', gameStore.selectedHalves);
  // console.log('Selected rows:', gameStore.selectedRows);
  // console.log('Selected bets:', gameStore.bets);

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

  const renderNumberCells = (): JSX.Element[] => {
    const cells = [];

    // Populate the cells array with the number cells
    for (let col = 1; col <= 12; col++) {
      for (let row = 3; row >= 1; row--) {
        // Calculate the number for the cell
        const number = (col - 1) * 3 + row;
        const isEven = number % 2 === 0;

        // Get the bet information for this cell
        const bet = gameStore.bets.find(
          (bet) => bet.type === 'number' && bet.value === number
        );

        cells.push(
          <div
            key={number}
            className={`${styles.numberedCell} ${
              isEven ? styles.even : styles.odd
            }`}
            style={{ gridColumn: col, gridRow: 4 - row }}
            onClick={() => onNumberClick(number)}
          >
            {bet && (
              <div className={styles.betCoin}>
                <Coin
                  value={bet.amount}
                  color={bet.color}
                  handleClick={() => {}}
                  customClass={coinStyles.smallCoin}
                />
              </div>
            )}
            {number}
          </div>
        );
      }
    }

    return cells;
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.board}>
          <div className={styles.zeroCell} onClick={() => onNumberClick(0)}>
            0
          </div>
          <div className={styles.board_cells}>
            {renderNumberCells()}
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
        <div className={styles.dozens}>
          <div onClick={() => onDozenClick(1)}>
            {renderBetCoin('dozen', 1)} 1 to 12
          </div>
          <div onClick={() => onDozenClick(2)}>
            {renderBetCoin('dozen', 2)}13 to 24
          </div>
          <div onClick={() => onDozenClick(3)}>
            {renderBetCoin('dozen', 3)}25 to 36
          </div>
        </div>
        <div className={styles.halves}>
          <div onClick={() => onHalfClick('1to18')}>
            {' '}
            {renderBetCoin('half', '1to18')}1 to 18
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
            {renderBetCoin('half', '19to36')}19 to 36
          </div>
        </div>
      </div>
    </div>
  );
});

export default BettingTable;
