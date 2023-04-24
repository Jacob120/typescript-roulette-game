import React from 'react';
import styles from './GameTable.module.scss';
import TopBar from '../../layout/TopBar/TopBar';
import BettingTable from '../../features/BettingTable/BettingTable';

import BottomBar from '../../layout/BottomBar/BottomBar';

const GameTable: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <TopBar isListVisible={true} />
        <div className={styles.table_container}>
          <BettingTable />
          <BottomBar />
        </div>
      </div>
    </div>
  );
};

export default GameTable;
