import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  elevators: [
    { id: 'A', currentFloor: 1 },
    { id: 'B', currentFloor: 1 },
    { id: 'C', currentFloor: 1 },
    { id: 'D', currentFloor: 1 },
    { id: 'E', currentFloor: 1 },
    { id: 'F', currentFloor: 1 },
    { id: 'G', currentFloor: 1 },
    { id: 'H', currentFloor: 1 },
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
