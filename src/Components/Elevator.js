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
  const [userRequestedFloor, setUserRequestedFloor] = useState(null);

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

      if (nextFloor === userRequestedFloor) {
        alert(`Elevator ${elevatorId} has arrived at floor ${nextFloor} for user.`);
      }

      setIsMoving(false);
      console.log(`Elevator ${elevatorId} is now at floor ${nextFloor}`);
    }, 2000);
  };

  useEffect(() => {
    if (isMoving) {
      console.log(`Elevator ${elevatorId} is moving ${direction} to floor ${currentFloor + (direction === 'up' ? 1 : -1)}`);
    }
  }, [isMoving, currentFloor, direction, elevatorId]);

  const handleButtonPress = userFloor => {
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
      setUserRequestedFloor(userFloor); 
      alert(`Elevator ${closestElevator.id} is coming to floor ${userFloor}.`);
      dispatch(moveToFloor({ elevatorId: closestElevator.id, floor: userFloor })); 
      setBlink(true);
      setTimeout(() => {
        setBlink(false);
      }, 2000);
    } else {
      alert('No available elevators at the moment.');
    }
  };

  useEffect(() => {
    moveElevator();
  }, [currentFloor]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomFloor = Math.floor(Math.random() * 20) + 1;
      alert(`User wants to go to floor ${randomFloor}.`);
      handleButtonPress(randomFloor);
    }, 5000); 

    return () => clearInterval(interval);
  }, []); 

  return (
    <div className={`elevator ${blink ? 'blink' : ''}`}>
      <p>Elevator {elevatorId}</p>
      <p className="floor-info">Currently at floor: {currentFloor}</p>
    </div>
  );
};

export default Elevator;
