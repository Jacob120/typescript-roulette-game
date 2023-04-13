import React from 'react';
import styles from './GameTable.module.scss';
import TopBar from '../../layout/TopBar/TopBar';
import BettingTable from '../../features/BettingTable/BettingTable';

import BottomBar from '../../layout/BottomBar/BottomBar';

const GameTable: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className='container'>
        <TopBar isListVisible={true} />
        <BettingTable />
        <BottomBar />
      </div>
    </div>
  );
};

export default GameTable;
