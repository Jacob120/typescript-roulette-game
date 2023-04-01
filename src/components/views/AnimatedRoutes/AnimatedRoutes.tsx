import { Outlet, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames='fade' timeout={500}>
        <Outlet />
      </CSSTransition>
    </TransitionGroup>
  );
};

export default AnimatedRoutes;
