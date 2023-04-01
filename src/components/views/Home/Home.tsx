import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.root}>
      <div className='container'>
        <h1 className={styles.logo}>Roulette </h1>
      </div>
    </div>
  );
};

export default Home;
