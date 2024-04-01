import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {moveToFloor} from '../Slices/elevatorSlice';

const ElevatorControlPanel = () => {
    const dispatch = useDispatch();
    const elevators = useSelector(state => state.elevators);
    const {disabled} = useSelector (state => state.elevatorPanel);
}