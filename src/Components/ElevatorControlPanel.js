import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {moveToFloor} from '../Slices/elevatorSlice';

const ElevatorControlPanel = () => {
    const dispatch = useDispatch();
    const elevators = useSelector(state => state.elevators);
    const {disabled} = useSelector (state => state.elevatorPanel);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const[ floorInput] = useState('');

    const calculateClosestElevator = (userFloor) => {
        let closestElevator = null;
        let minDistance = Number.MAX_VALUE;

        elevators.forEach(elevator => {
            const distance = Math.abs(elevbator.currentFloor - userFloor);
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
      const floors = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="control-panel">
      {disabled && <p>Elevator panel is disabled. Please wait for the elevator to arrive.</p>}
      <div className="floor-buttons">
        {floors.map(floor => (
          <button key={floor} disabled={disabled || buttonDisabled} onClick={() => handleButtonPress(floor)}>
            {floor}
          </button>
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button key={num} disabled={disabled || buttonDisabled} onClick={() => handleFloorInput(num)}>
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ElevatorControlPanel;