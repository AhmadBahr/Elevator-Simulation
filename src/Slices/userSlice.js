import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
      currentFloor: null,
      pressedButtons: [],
    },