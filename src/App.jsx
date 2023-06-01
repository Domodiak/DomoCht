import styles from './App.module.scss';

function App() {
  return (
    <div className="App">
      <h1>You should be able to properly communicate <span className='accent'>here</span> soon.</h1>
      <button className='btn-primary'>Button</button>
      <button className='btn-secondary'>Button</button>
      <div className={styles['h6']}>Hi</div>
    </div>
  );
}

export default App;
