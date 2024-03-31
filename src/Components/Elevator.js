import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import './Elevator.css'

const Elevator = ({elevatorID}) => {
    const elevators = useSelector(state => state.elevators);
    const [currentFloor, setCurrentFloor] = useState(1);
    const [direction, setDirection] = useState(null);
    const [isMoving, setISMoving] = useState(false);
    const [blink,setBlink] = useState(false);

    const moveElevator = () => { 
        setISMoving(true);
        setTimeout(() => {
            let nextFloor;
            let nextDirection = direction;

            if (currentFloor === 1) {
                nextDirection = "up";
            } else if (currentFloor === 20) {
                nextDirection = "down";
            } else{
                nextDirection = Math.random() < 0.5 ? "up" : "down";
            }

            if (nextDirection === "up" && currentFloor < 20) {
                nextFloor = currentFloor + 1;
            } else if(nextDirection ==='down' && currentFloor > 1 ) {
                nextFloor = currentFloor - 1;
            } else {
                setIsMoving(false);
                return;
            }

            setCurrentFloor(nextFloor);
            setDirection(nextDirection);

            setISMoving(false);
            setDirection(nextDirection);

            setISMoving(false);
            console.log(`Elevator ${elevatorId} is now on floor ${nextFloor}`);
            }, 2000);
        };
        useEffect(() => {
            if(isMoving) {
                console.log(`Elevator ${elevatorId} is moving ${direction} to floor ${currentFloor + (direction == ' up' ? 1 : -1)}`);
            }
        }, {isMoving, curentFloor,direction, elevatorId});

        const handleButtonPress = (floor) => {
            let closestElevator = null;
            let minDistance = Number.MAX_VALUE;

            elevators.forEach(elevator => {
                const distance = Math.abs(elevator.currentFloor - userFloor);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestElevator = elevator;
                }
            });

            


        }
  return (
    <div>Elevator</div>
  )
}

export default Elevator