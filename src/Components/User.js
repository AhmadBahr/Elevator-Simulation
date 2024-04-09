import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { moveToFloor } from '../Slices/elevatorSlice'; 

const User = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      const userFloor = Math.floor(Math.random() * 20) + 1;
      console.log(`User wants to go to floor ${userFloor}.`);
      dispatchUserRequest(userFloor);
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  const dispatchUserRequest = (userFloor) => {
    console.log("Dispatching elevator request...");
    const elevatorId = 1;
    dispatch(moveToFloor({ elevatorId, floor: userFloor }));

    setTimeout(() => {
      console.log(`User has arrived at floor ${userFloor}.`);
      // alert(`User has arrived at floor ${userFloor}.`);
    }, 5000); 
  };

  return null; 
};

export default User;
