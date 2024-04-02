import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Elevator = ({ elevatorId }) => {
  const elevators = useSelector(state => state.elevator.elevators);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [direction, setDirection] = useState('up');
  const [isMoving, setIsMoving] = useState(false);
  const [blink, setBlink] = useState(false);
  const [audio, setAudio] = useState(null); 

  useEffect(() => {
    import('../assets/ding.mp3').then(module => {
      setAudio(new Audio(module.default));
    }).catch(error => {
      console.error('Error loading sound file:', error);
    });
  }, []); 

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

      if (audio) {
        audio.play();
      }
    }, 2000);
  };

  useEffect(() => {
    if (isMoving) {
      console.log(
        `Elevator ${elevatorId} is moving ${direction} to floor ${
          currentFloor + (direction === 'up' ? 1 : -1)
        }`
      );
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
      alert(`Elevator ${closestElevator.id} is coming to floor ${userFloor}.`);

      closestElevator.currentFloor = userFloor;
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

  return (
    <div className={`elevator ${blink ? 'blink' : ''}`}>
      <p>Elevator {elevatorId}</p>
      <p className="floor-info">Currently at floor: {currentFloor}</p>
    </div>
  );
};

export default Elevator;
