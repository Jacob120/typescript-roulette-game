import React, { useState } from 'react';
import Logo from '../../common/Logo/Logo';
import PayoutsList from '../../common/PayoutsList/PayoutsList';
import styles from './TopBar.module.scss';
import WinningNumbers from '../../features/WinningNumbers/WinningNumbers';

interface TopBarProps {
  isListVisible: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ isListVisible }) => {
  return (
    <div className=''>
      <div className={styles.wrapper}>
        <Logo />
        {isListVisible && <WinningNumbers />}
        {isListVisible && <PayoutsList />}
      </div>
    </div>
  );
};

export default TopBar;
