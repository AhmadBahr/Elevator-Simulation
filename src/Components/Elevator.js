import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { moveToFloor } from "../Slices/elevatorSlice";
import "./Elevator.css";

const Elevator = ({ elevatorId }) => {
  const elevators = useSelector((state) => state.elevator.elevators);
  const dispatch = useDispatch();

  const [currentFloor, setCurrentFloor] = useState(1);
  const [isMoving, setIsMoving] = useState(false);
  const [blinkUp, setBlinkUp] = useState(false);
  const [blinkDown, setBlinkDown] = useState(false);

  useEffect(() => {
    if (isMoving) {
    }
  }, [isMoving, currentFloor, elevatorId]);

  useEffect(() => {
    moveElevator();
  }, [currentFloor]);

  const moveElevator = () => {
    setIsMoving(true);
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

      // Set blink based on direction
      if (nextDirection === "up") {
        setBlinkUp(true);
        setBlinkDown(false);
      } else {
        setBlinkDown(true);
        setBlinkUp(false);
      }

      // Reset blink after 2 seconds
      setTimeout(() => {
        setBlinkUp(false);
        setBlinkDown(false);
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
    } else {
      console.log("No available elevators at the moment.");
    }
  };

  return (
    <div className="elevator">
      <div className="direction-arrows">
        <div
          className={`arrow-container ${blinkUp ? "pressed" : ""}`}
          onClick={() => {
            handleButtonPress(currentFloor + 1); // Move up
          }}
        >
          <span className="arrow">&#8593;</span>
        </div>
        <div
          className={`arrow-container ${blinkDown ? "pressed" : ""}`}
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
