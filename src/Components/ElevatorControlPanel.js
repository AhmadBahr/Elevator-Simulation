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
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [direction, setDirection] = useState(null);
  const [previousFloor, setPreviousFloor] = useState(null);

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

  const handleButtonPress = (userFloor, direction) => {
    if (!disabled && !buttonDisabled) {
      const closestElevator = calculateClosestElevator(userFloor);
      
      if (closestElevator) {
        // Custom message indicating the selected floor and elevator
        const message = `${userFloor} -> ${closestElevator.id}`;
        
        // Show alert with the custom message
        alert(message);
    
        // Log direction
        console.log(`Direction: ${direction}`);
    
        // Dispatch action to move elevator
        dispatch(moveToFloor({ elevatorId: closestElevator.id, floor: userFloor }));
    
        // Set button disabled to prevent multiple clicks
        setButtonDisabled(true);
        
        // Highlight button indicating the selected floor
        setFloorInput(userFloor.toString());

        // Set selected floor and direction
        setSelectedFloor(userFloor);
        setDirection(direction);
    
        // Reset button disabled after 5 seconds (simulating elevator arrival time)
        setTimeout(() => {
          setButtonDisabled(false);
          // Show alert to indicate that the user has arrived at their floor
          alert(`You have arrived at floor ${userFloor}.`);
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
          const direction = selectedFloor > previousFloor ? 'up' : 'down'; // Determine direction
          handleButtonPress(selectedFloor, direction);
          setFloorInput('');
          setPreviousFloor(selectedFloor);
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
          <button key={floor} disabled={disabled || buttonDisabled} onClick={() => handleButtonPress(floor, 'up')} className={selectedFloor === floor && direction === 'up' ? 'selected' : ''}>
            {floor}
          </button>
        ))}
      </div>
      <div className="keypad">
        {floors.slice(3, 6).map(floor => (
          <button key={floor} disabled={disabled || buttonDisabled} onClick={() => handleButtonPress(floor, 'up')} className={selectedFloor === floor && direction === 'up' ? 'selected' : ''}>
            {floor}
          </button>
        ))}
      </div>
      <div className="keypad">
        {floors.slice(6, 9).map(floor => (
          <button key={floor} disabled={disabled || buttonDisabled} onClick={() => handleButtonPress(floor, 'up')} className={selectedFloor === floor && direction === 'up' ? 'selected' : ''}>
            {floor}
          </button>
        ))}
      </div>
      {starPressed && (
        <>
          <div className="keypad">
            {floors.slice(9, 12).map(floor => (
              <button key={floor} disabled={disabled || buttonDisabled} onClick={() => handleButtonPress(floor, 'up')} className={selectedFloor === floor && direction === 'up' ? 'selected' : ''}>
                {floor}
              </button>
            ))}
          </div>
          <div className="keypad">
            {floors.slice(12, 15).map(floor => (
              <button key={floor} disabled={disabled || buttonDisabled} onClick={() => handleButtonPress(floor, 'up')} className={selectedFloor === floor && direction === 'up' ? 'selected' : ''}>
              {floor}
              </button>
            ))}
          </div>
          <div className="keypad">
            {floors.slice(15, 18).map(floor => (
              <button key={floor} disabled={disabled || buttonDisabled} onClick={() => handleButtonPress(floor, 'up')} className={selectedFloor === floor && direction === 'up' ? 'selected' : ''}>
                {floor}
              </button>
            ))}
          </div>
          <div className="keypad">
            {[10, 20].map(num => (
              <button key={num} disabled={disabled || buttonDisabled} onClick={() => handleFloorInput(num)} className={selectedFloor === num && direction === 'up' ? 'selected' : ''}>
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
