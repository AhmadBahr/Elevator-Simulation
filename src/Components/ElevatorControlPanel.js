import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveToFloor } from '../Slices/elevatorSlice'; 
import './ElevatorControlPanel.css';

const ElevatorControlPanel = () => {
  const dispatch = useDispatch();
  const elevators = useSelector(state => state.elevator.elevators);
  const { disabled } = useSelector(state => state.elevatorPanel);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [starPressed, setStarPressed] = useState(false);

  useEffect(() => {
    setStarPressed(false); 
  }, []);

  const calculateClosestElevator = (userFloor) => {
    let closestElevator = null;
    let minDistance = Number.MAX_VALUE;
  
    elevators.forEach(elevator => {
      const distance = Math.abs(elevator.currentFloor - userFloor);
      if (distance < minDistance) {
        minDistance = distance;
        closestElevator = elevator;
      }
    });

    return closestElevator;
  };

  const handleButtonPress = (userFloor) => {
    if (disabled || buttonDisabled) {
      alert("Elevator panel is disabled. Please wait for the elevator to arrive.");
      return;
    }

    const closestElevator = calculateClosestElevator(userFloor);
    if (!closestElevator) {
      alert('No available elevators at the moment.');
      return;
    }

    const direction = userFloor > closestElevator.currentFloor ? 'up' : 'down';
    alert(`Elevator ${closestElevator.id} is the closest to you.`);
    dispatch(moveToFloor({ elevatorId: closestElevator.id, floor: userFloor }));

    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
      alert(`You have arrived at floor ${userFloor}.`);
    }, 5000);
  };

  const handleStarPress = () => {
    setStarPressed(!starPressed);
  };

  const renderFloorButtons = (floors) => {
    return floors.map(floor => (
      <button 
        key={floor} 
        disabled={disabled || buttonDisabled} 
        onClick={() => handleButtonPress(floor)}
      >
        {floor}
      </button>
    ));
  };

  const floors = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="control-panel">
      {disabled && <p>Elevator panel is disabled. Please wait for the elevator to arrive.</p>}
      <div className="keypad">
        {renderFloorButtons(floors.slice(0, 3))}
      </div>
      <div className="keypad">
        {renderFloorButtons(floors.slice(3, 6))}
      </div>
      <div className="keypad">
        {renderFloorButtons(floors.slice(6, 9))}
      </div>
      {starPressed && (
        <>
          <div className="keypad">
            {renderFloorButtons(floors.slice(9, 12))}
          </div>
          <div className="keypad">
            {renderFloorButtons(floors.slice(12, 15))}
          </div>
          <div className="keypad">
            {renderFloorButtons(floors.slice(15, 18))}
          </div>
          <div className="keypad">
            {[10, 20].map(num => (
              <button 
                key={num} 
                disabled={disabled || buttonDisabled} 
                onClick={() => handleButtonPress(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </>
      )}
      <div className="keypad">
        <button 
          onClick={handleStarPress} 
          className={`star-btn ${starPressed ? 'active' : ''}`}
        >
          ⭐
        </button>
      </div>
    </div>
  );
};

export default ElevatorControlPanel;
