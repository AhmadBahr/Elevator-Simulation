import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { moveToFloor } from "../Slices/elevatorSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
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

  useEffect(() => {
    // Start moving the elevator when component mounts
    setIsMoving(true);
  }, []);

  const moveElevator = () => {
    setTimeout(() => {
      let nextFloor;
      let nextDirection;

      // Generate a random floor
      const randomFloor = Math.floor(Math.random() * 20) + 1;

      // Determine direction based on the random floor
      if (randomFloor > currentFloor) {
        nextDirection = "up";
      } else if (randomFloor < currentFloor) {
        nextDirection = "down";
      } else {
        // If the random floor is the same as the current floor, stay in place
        setIsMoving(false);
        return;
      }

      // Set the next floor based on the direction
      if (nextDirection === "up" && currentFloor < 20) {
        nextFloor = currentFloor + 1;
      } else if (nextDirection === "down" && currentFloor > 1) {
        nextFloor = currentFloor - 1;
      } else {
        setIsMoving(false);
        return;
      }

      setCurrentFloor(nextFloor);

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

  const handleButtonPress = (direction) => {
    const nextFloor = direction === "up" ? currentFloor + 1 : currentFloor - 1;
    dispatch(moveToFloor({ elevatorId, floor: nextFloor }));
    setCurrentFloor(nextFloor);
  };

  return (
    <div className="elevator">
      <div className="direction-arrows">
        <div
          className={`arrow-container ${blinkDirection === "up" ? "pressed" : ""}`}
          onClick={() => handleButtonPress("up")}
        >
          <FontAwesomeIcon icon={faArrowUp} style={{ color: blinkDirection === "up" ? "yellow" : "black" }} />
        </div>
        <div
          className={`arrow-container ${blinkDirection === "down" ? "pressed" : ""}`}
          onClick={() => handleButtonPress("down")}
        >
          <FontAwesomeIcon icon={faArrowDown} style={{ color: blinkDirection === "down" ? "yellow" : "black" }} />
        </div>
      </div>
      <p>Elevator {elevatorId}</p>
      <p className="floor-info">Currently at floor: {currentFloor}</p>
    </div>
  );
};

export default Elevator;
