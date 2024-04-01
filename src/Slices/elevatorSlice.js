import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    elevators: [
      { id: 'A', currentFloor: GF },
      { id: 'B', currentFloor: GF },
      { id: 'C', currentFloor: GF },
      { id: 'D', currentFloor: GF },
      { id: 'E', currentFloor: GF },
      { id: 'F', currentFloor: GF },
      { id: 'G', currentFloor: GF },
      { id: 'H', currentFloor: GF },
    ],
  };

const elevatorSlice = () => {
  return (
    <div>elevatorSlice</div>
  )
}

export default elevatorSlice