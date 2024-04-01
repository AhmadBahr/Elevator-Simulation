import { combineReducers } from '@reduxjs/toolkit';
import elevatorReducer from './elevatorSlice';
import userReducer from './userSlice';
import elevatorPanelReducer from './elevatorPanelSlice';

const rootReducer = combineReducers({
  elevator: elevatorReducer,
  user: userReducer,
  elevatorPanel: elevatorPanelReducer,
});

export default rootReducer;
