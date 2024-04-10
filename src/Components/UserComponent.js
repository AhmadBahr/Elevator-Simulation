import React, { useEffect, useState } from 'react';
import './UserComponent.css';

const UserComponent = ({ floor, isEntering }) => {
  const [currentFloor, setCurrentFloor] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), floor * 1000);
    setCurrentFloor(floor);

    const interval = setInterval(() => {
      if (currentFloor < floor) {
        setCurrentFloor(prevFloor => prevFloor + 1);
      } else {
        clearInterval(interval);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [floor]);

  return (
    <div className={`user-container ${isVisible ? 'visible' : ''} ${isEntering ? 'entering' : 'leaving'}`} style={{ bottom: `calc(${currentFloor * 5}%)` }}>
      <div className="user-icon"></div>
    </div>
  );
};

export default UserComponent;
