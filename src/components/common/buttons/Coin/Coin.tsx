import React from 'react';
import styles from './Coin.module.scss';
import { gameStore } from '../../../../stores/gameStore';
import { observer } from 'mobx-react-lite';

interface CoinProps {
  value: number;
  handleClick: (value: number) => void;
  color?: string;
  customClass?: string;
}

const Coin: React.FC<CoinProps> = observer(
  ({ value, handleClick, color, customClass }) => {
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      handleClick(value);
    };

    const isSelected = gameStore.selectedCoinValue === value;

    return (
      <button
        className={`${isSelected ? styles.selectedCoin : ''} ${
          styles.dashed_circle
        } ${color && styles[color]} ${customClass}`}
        onClick={onClick}
      >
        <div>{value}</div>
      </button>
    );
  }
);

export default Coin;
