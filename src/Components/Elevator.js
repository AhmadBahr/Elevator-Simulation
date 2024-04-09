import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moveToFloor } from '../Slices/elevatorSlice';
import './Elevator.css';

const Elevator = ({ elevatorId }) => {
  const elevators = useSelector(state => state.elevator.elevators);
  const dispatch = useDispatch();

  const [currentFloor, setCurrentFloor] = useState(1);
  const [direction, setDirection] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const [blink, setBlink] = useState(false);
  const [arrowBlink, setArrowBlink] = useState(null);

  const moveElevator = () => {
    setIsMoving(true);
    setTimeout(() => {
      let nextFloor;
      let nextDirection;

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

  const handleButtonPress = (userFloor) => {
    const closestElevator = elevators.find(elevator => elevator.id === elevatorId);

    if (closestElevator) {
      // Determine direction based on user's selected floor
      const direction = userFloor > currentFloor ? 'up' : 'down';

      // Show alert indicating that the elevator is the closest to the user
      alert(`Elevator ${closestElevator.id} is the closest to you.`);

      // Dispatch action to move elevator
      dispatch(moveToFloor({ elevatorId: closestElevator.id, floor: userFloor }));

      // Highlight arrow indicating direction
      setArrowBlink(direction);

      // Set blink effect for elevator
      setBlink(true);
      setTimeout(() => {
        setBlink(false);
        // Show alert to indicate that the user has arrived at their floor
        alert(`You have arrived at floor ${userFloor}.`);
      }, 2000);
    } else {
      console.log('No available elevators at the moment.');
    }
  };

  return (
    <div className={`elevator ${blink ? 'blink' : ''}`}>
      <div className="direction-arrows">
        <div className="arrow-container" onClick={() => { setDirection('up'); handleButtonPress(currentFloor); }}>
          <span className={`arrow ${arrowBlink === 'up' ? 'pressed' : ''}`}>&#8593;</span>
        </div>
        <div className="arrow-container" onClick={() => { setDirection('down'); handleButtonPress(currentFloor); }}>
          <span className={`arrow ${arrowBlink === 'down' ? 'pressed' : ''}`}>&#8595;</span>
        </div>
      </div>
      <p>Elevator {elevatorId}</p>
      <p className="floor-info">Currently at floor: {currentFloor}</p>
    </div>
  );
};

export default Elevator;
