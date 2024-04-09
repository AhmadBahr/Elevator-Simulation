import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { moveToFloor } from "../Slices/elevatorSlice";
import "./Elevator.css";

const Elevator = ({ elevatorId }) => {
  const elevators = useSelector((state) => state.elevator.elevators);
  const dispatch = useDispatch();

  const [currentFloor, setCurrentFloor] = useState(1);
  const [isMoving, setIsMoving] = useState(false);
  const [blinkDirection, setBlinkDirection] = useState(null);

  useEffect(() => {
    if (isMoving) {
      moveElevator();
    }
  }, [isMoving, currentFloor, elevatorId]);

  const moveElevator = () => {
    setTimeout(() => {
      let nextFloor;
      let nextDirection;

      if (currentFloor === 1) {
        nextDirection = "up";
      } else if (currentFloor === 20) {
        nextDirection = "down";
      } else {
        nextDirection = Math.random() < 0.5 ? "up" : "down";
      }

      if (nextDirection === "up" && currentFloor < 20) {
        nextFloor = currentFloor + 1;
      } else if (nextDirection === "down" && currentFloor > 1) {
        nextFloor = currentFloor - 1;
      } else {
        setIsMoving(false);
        return;
      }

      setCurrentFloor(nextFloor);
      setIsMoving(false);

      // Dispatch action when elevator arrives at floor
      dispatch(moveToFloor({ elevatorId, floor: nextFloor }));

      // Set blink direction
      setBlinkDirection(nextDirection);

      // Reset blink direction after 2 seconds
      setTimeout(() => {
        setBlinkDirection(null);
      }, 2000);
    }, 2000);
  };

  const handleButtonPress = (userFloor) => {
    const closestElevator = elevators.find(
      (elevator) => elevator.id === elevatorId
    );

    if (closestElevator) {
      // Determine direction based on user's selected floor
      const direction = userFloor > currentFloor ? "up" : "down";

      // Show alert indicating that the elevator is the closest to the user
      alert(`Elevator ${closestElevator.id} is the closest to you.`);

      // Dispatch action to move elevator
      dispatch(
        moveToFloor({ elevatorId: closestElevator.id, floor: userFloor })
      );

      // Start elevator movement
      setIsMoving(true);
    } else {
      console.log("No available elevators at the moment.");
    }
  };

  return (
    <div className="elevator">
      <div className="direction-arrows">
        <div
          className={`arrow-container ${
            blinkDirection === "up" ? "pressed" : ""
          }`}
          onClick={() => {
            handleButtonPress(currentFloor + 1); // Move up
          }}
        >
          <span className="arrow">&#8593;</span>
        </div>
        <div
          className={`arrow-container ${
            blinkDirection === "down" ? "pressed" : ""
          }`}
          onClick={() => {
            handleButtonPress(currentFloor - 1); // Move down
          }}
        >
          <span className="arrow">&#8595;</span>
        </div>
      </div>
      <p>Elevator {elevatorId}</p>
      <p className="floor-info">Currently at floor: {currentFloor}</p>
    </div>
  );
};

export default Elevator;
