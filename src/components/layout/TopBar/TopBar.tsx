import React from 'react';
import Logo from '../../common/Logo/Logo';
import PayoutsList from '../../common/PayoutsList/PayoutsList';
import styles from './TopBar.module.scss';
import WinningNumbers from '../../features/WinningNumbers/WinningNumbers';

interface TopBarProps {
  isListVisible: boolean;
  isVertical: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ isListVisible, isVertical }) => {
  return (
    <div className={styles.wrapper}>
      <Logo />
      {isListVisible && !isVertical && <WinningNumbers />}
      {isListVisible && <PayoutsList />}
    </div>
  );
};

export default TopBar;
