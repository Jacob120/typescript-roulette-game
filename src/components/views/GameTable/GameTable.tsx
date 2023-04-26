import React, { useState, useEffect } from 'react';
import styles from './GameTable.module.scss';
import TopBar from '../../layout/TopBar/TopBar';
import BettingTable from '../../features/BettingTable/BettingTable';

import BottomBar from '../../layout/BottomBar/BottomBar';
import BettingTableVertical from '../../features/BettingTableVertical/BettingTableVertical';
import { useWindowDimensions } from '../../../utils/useWindowDimensions';

const GameTable: React.FC = () => {
  const { width } = useWindowDimensions();
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    if (width <= 768) {
      setIsVertical(true);
    } else {
      setIsVertical(false);
    }
  }, [width]);

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <TopBar isListVisible={true} isVertical={isVertical} />
        <div className={styles.table_container}>
          {isVertical ? (
            <>
              <BettingTableVertical />
              <BottomBar isVertical={true} width={width} />
            </>
          ) : (
            <>
              <BettingTable />
              <BottomBar isVertical={false} width={width} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameTable;
