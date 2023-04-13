import React from 'react';
import { gameStore } from '../../../stores/gameStore';
import { observer } from 'mobx-react-lite';
import styles from './CoinSelector.module.scss';
import Coin from '../../common/buttons/Coin/Coin';

const CoinSelector: React.FC = observer(() => {
  const onSelectCoin = (value: number) => {
    gameStore.setSelectedCoinValue(value);
  };

  const coinColors = ['red', 'blue', 'green', 'yellow', 'purple'];

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        {gameStore.coinValues.map((value, index) => (
          <Coin
            key={value}
            value={value}
            handleClick={onSelectCoin}
            color={coinColors[index]}
          />
        ))}
      </div>
      <div className={styles.bottom_bar}>
        <div className={styles.totalBet}>
          Total bet: ${gameStore.getTotalBetAmount()}
        </div>
        <div className={styles.totalBet}>Balance: ${gameStore.playerMoney}</div>
      </div>
    </div>
  );
});

export default CoinSelector;
