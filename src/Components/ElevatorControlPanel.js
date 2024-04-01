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
      
    }    