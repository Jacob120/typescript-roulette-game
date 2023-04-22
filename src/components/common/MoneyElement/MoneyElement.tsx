import React from 'react';
import styles from './MoneyElement.module.scss';

interface MoneyElementProps {
  name: string;
  amount: number;
}

const MoneyElement: React.FC<MoneyElementProps> = ({ name, amount }) => {
  return (
    <div className={styles.wrapper}>
      {name}: <span>${amount}</span>
    </div>
  );
};

export default MoneyElement;
