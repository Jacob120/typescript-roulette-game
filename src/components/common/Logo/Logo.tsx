import React from 'react';
import styles from './Logo.module.scss';

const Logo: React.FC = () => {
  return (
    <div>
      <h1 className={styles.logo}>Roulette</h1>
    </div>
  );
};

export default Logo;
