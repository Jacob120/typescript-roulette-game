import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './components/views/Home/Home';
import GameTable from './components/views/GameTable/GameTable';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function App() {
  const location = useLocation();

  return (
    <main>
      <TransitionGroup>
        <CSSTransition key={location.key} classNames='fade' timeout={500}>
          <Routes location={location}>
            <Route path='/' element={<Home />} />
            <Route path='/game' element={<GameTable />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </main>
  );
}

export default App;
