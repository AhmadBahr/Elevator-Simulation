import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
      currentFloor: null,
      pressedButtons: [],
    },
    reducers: {
        enterBuilding(state, action) {
          state.currentFloor = 1;
        },
        pressButton(state, action) {
          const buttonPressed = action.payload;
          state.pressedButtons = [...state.pressedButtons, buttonPressed];
        },
        clearButtons(state) {
          state.pressedButtons = [];
        },
      },
    });
    export const { enterBuilding, pressButton, clearButtons } = userSlice.actions;
    export default userSlice.reducer;
