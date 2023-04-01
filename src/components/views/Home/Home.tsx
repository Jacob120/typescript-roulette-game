import { useState } from 'react';

import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../layout/TopBar/TopBar';

const Home = () => {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(1);

  const handleStartGame = () => {
    setOpacity(0);

    setTimeout(() => {
      navigate('/game');
    }, 1000);
  };

  return (
    <div className={styles.root} style={{ opacity }}>
      <TopBar />
      <div className={styles.wrapper}>
        <button className={styles.button_start} onClick={handleStartGame}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Home;
