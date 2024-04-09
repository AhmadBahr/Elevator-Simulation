import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moveToFloor } from '../Slices/elevatorSlice';
import './Elevator.css';

const Elevator = ({ elevatorId }) => {
  const elevators = useSelector(state => state.elevator.elevators);
  const dispatch = useDispatch();

  const [currentFloor, setCurrentFloor] = useState(1);
  const [direction, setDirection] = useState('up');
  const [isMoving, setIsMoving] = useState(false);
  const [blink, setBlink] = useState(false);

  const moveElevator = () => {
    setIsMoving(true);
    setTimeout(() => {
      let nextFloor;
      let nextDirection = direction;

      if (currentFloor === 1) {
        nextDirection = 'up';
      } else if (currentFloor === 20) {
        nextDirection = 'down';
      } else {
        nextDirection = Math.random() < 0.5 ? 'up' : 'down';
      }

      if (nextDirection === 'up' && currentFloor < 20) {
        nextFloor = currentFloor + 1;
      } else if (nextDirection === 'down' && currentFloor > 1) {
        nextFloor = currentFloor - 1;
      } else {
        setIsMoving(false);
        return;
      }

      setCurrentFloor(nextFloor);
      setDirection(nextDirection);

      setIsMoving(false);
      console.log(`Elevator ${elevatorId} is now at floor ${nextFloor}`);

      // Dispatch action when elevator arrives at floor
      dispatch(moveToFloor({ elevatorId, floor: nextFloor }));

      // Reset blink
      setBlink(false);
    }, 2000);
  };

  useEffect(() => {
    if (isMoving) {
      console.log(`Elevator ${elevatorId} is moving ${direction} to floor ${currentFloor + (direction === 'up' ? 1 : -1)}`);
    }
  }, [isMoving, currentFloor, direction, elevatorId]);

  useEffect(() => {
    moveElevator();
  }, [currentFloor]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomFloor = Math.floor(Math.random() * 20) + 1;
      handleButtonPress(randomFloor);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleButtonPress = (userFloor) => {
    let closestElevator = null;
    let minDistance = Number.MAX_VALUE;

    elevators.forEach(elevator => {
      const distance = Math.abs(elevator.currentFloor - userFloor);
      if (distance < minDistance) {
        minDistance = distance;
        closestElevator = elevator;
      }
    });

    if (closestElevator) {
      dispatch(moveToFloor({ elevatorId: closestElevator.id, floor: userFloor }));
      setBlink(true);
      setTimeout(() => {
        setBlink(false);
      }, 2000);
    } else {
      // No available elevators
    }
  };

  return (
    <div className={`elevator ${blink ? 'blink' : ''}`}>
      <div className="direction-arrows">
        <div className="arrow-container" onClick={() => setDirection('up')}>
          <span className="arrow">&#8593;</span>
        </div>
        <div className="arrow-container" onClick={() => setDirection('down')}>
          <span className="arrow">&#8595;</span>
        </div>
      </div>
      <p>Elevator {elevatorId}</p>
      <p className="floor-info">Currently at floor: {currentFloor}</p>
    </div>
  );
};

export default Elevator;
