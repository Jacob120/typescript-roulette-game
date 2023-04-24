import React, { useState } from 'react';
import Logo from '../../common/Logo/Logo';
import PayoutsList from '../../common/PayoutsList/PayoutsList';
import styles from './TopBar.module.scss';
import WinningNumbers from '../../features/WinningNumbers/WinningNumbers';
import { useWindowDimensions } from '../../../utils/useWindowDimensions';

interface TopBarProps {
  isListVisible: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ isListVisible }) => {
  const { width } = useWindowDimensions();
  const [isVertical, setIsVertical] = useState(false);

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
