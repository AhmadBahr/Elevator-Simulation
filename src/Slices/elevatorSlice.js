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

  const elevatorSlice = createSlice({
    name: 'elevator',
    initialState,
    reducers: {
      moveToFloor(state, action) {
        const { elevatorId, floor } = action.payload;
        const elevator = state.elevators.find(e => e.id === elevatorId);
        if (elevator) {
          elevator.currentFloor = floor;
        }
      },
      elevatorArrived(state, action) {
        const { floor } = action.payload;
        state.elevators.forEach(elevator => {
          elevator.currentFloor = floor;
        });
      },
    },
  });
  
  export const { moveToFloor, elevatorArrived } = elevatorSlice.actions;
  export default elevatorSlice.reducer;
  