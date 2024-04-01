import { createSlice } from '@reduxjs/toolkit';

const elevatorPanelSlice = createSlice({
  name: 'elevatorPanel',
  initialState: {
    disabled: false,
  },
  reducers: {
    disablePanel(state) {
      state.disabled = true;
    },
    enablePanel(state) {
      state.disabled = false;
    },
  },
});

export const { disablePanel, enablePanel } = elevatorPanelSlice.actions;
export default elevatorPanelSlice.reducer;
