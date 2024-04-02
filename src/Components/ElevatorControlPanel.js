import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveToFloor } from '../Slices/elevatorSlice'; 
import './ElevatorControlPanel.css';

const ElevatorControlPanel = () => {
  const dispatch = useDispatch();
  const elevators = useSelector(state => state.elevator.elevators);
  const { disabled } = useSelector(state => state.elevatorPanel);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [floorInput, setFloorInput] = useState('');
  const [inputMode, setInputMode] = useState(false);
  const [starPressed, setStarPressed] = useState(false);

  useEffect(() => {
    setStarPressed(false); // Initialize starPressed to false when component mounts
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
    if (!disabled && !buttonDisabled) {
      const closestElevator = calculateClosestElevator(userFloor);
      
      if (closestElevator) {
        alert(`Elevator ${closestElevator.id} is coming to floor ${userFloor}.`);
        dispatch(moveToFloor({ elevatorId: closestElevator.id, floor: userFloor }));
        setButtonDisabled(true);
        setTimeout(() => {
          setButtonDisabled(false);
          alert(`Elevator ${closestElevator.id} has arrived at floor ${userFloor}.`);
        }, 5000);
      } else {
        alert('No available elevators at the moment.');
      }
    } else {
      alert("Elevator panel is disabled. Please wait for the elevator to arrive.");
    }
  };

  const handleFloorInput = (value) => {
    if (!isNaN(value)) {
      const newInput = floorInput + value;
      if (parseInt(newInput) <= 20) {
        if ((newInput.length === 2 && parseInt(newInput) >= 10) || (newInput.length === 1 && parseInt(newInput) > 0)) {
          const selectedFloor = parseInt(newInput);
          handleButtonPress(selectedFloor);
          setFloorInput('');
        } else {
          setFloorInput(newInput);
        }
      }
    }
  };

  const toggleInputMode = () => {
    setInputMode(!inputMode);
    if (inputMode) {
      setFloorInput('');
    }
  };

  const handleStarPress = () => {
    setStarPressed(!starPressed);
    setInputMode(false);
    setFloorInput('');
  };

  const floors = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="control-panel">
      {disabled && <p>Elevator panel is disabled. Please wait for the elevator to arrive.</p>}
      <div className="keypad">
        {floors.slice(0, 3).map(floor => (
          <button key={floor} disabled={disabled || buttonDisabled} onClick={() => handleButtonPress(floor)}>
            {floor}
          </button>
        ))}
      </div>
      <div className="keypad">
        {floors.slice(3, 6).map(floor => (
          <button key={floor} disabled={disabled || buttonDisabled} onClick={() => handleButtonPress(floor)}>
            {floor}
          </button>
        ))}
      </div>
      <div className="keypad">
        {floors.slice(6, 9).map(floor => (
          <button key={floor} disabled={disabled || buttonDisabled} onClick={() => handleButtonPress(floor)}>
            {floor}
          </button>
        ))}
      </div>
      {starPressed && (
        <>
          <div className="keypad">
            {floors.slice(9, 12).map(floor => (
              <button key={floor} disabled={disabled || buttonDisabled} onClick={() => handleButtonPress(floor)}>
                {floor}
              </button>
            ))}
          </div>
          <div className="keypad">
            {floors.slice(12, 15).map(floor => (
              <button key={floor} disabled={disabled || buttonDisabled} onClick={() => handleButtonPress(floor)}>
                {floor}
              </button>
            ))}
          </div>
          <div className="keypad">
            {floors.slice(15, 18).map(floor => (
              <button key={floor} disabled={disabled || buttonDisabled} onClick={() => handleButtonPress(floor)}>
                {floor}
              </button>
            ))}
          </div>
          <div className="keypad">
            {[10, 20].map(num => (
              <button key={num} disabled={disabled || buttonDisabled} onClick={() => handleFloorInput(num)}>
                {num}
              </button>
            ))}
          </div>
        </>
      )}
      <div className="keypad">
        <button onClick={handleStarPress} className={`star-btn ${starPressed ? 'active' : ''}`}>⭐</button>
      </div>
    </div>
  );
};

export default ElevatorControlPanel;
