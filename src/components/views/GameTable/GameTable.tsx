import React, { useEffect, useState } from 'react';
import styles from './GameTable.module.scss';
import TopBar from '../../layout/TopBar/TopBar';

const GameTable: React.FC = () => {
  return (
    <div className={styles.root}>
      <TopBar />
    </div>
  );
};

export default GameTable;
