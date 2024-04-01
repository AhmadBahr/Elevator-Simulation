import React from 'react'
import { useDispatch } from 'react-redux';
import { enterBuilding } from '../Slices/userSlice';
import Elevator from './Elevator';
import ElevatorControlPanel from './ElevatorControlPanel';

const UserInterface = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(enterBuilding());
    }, [dispatch]);
  
    const elevatorIds = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; 


    return (
        <div className="user-interface">
          <h1>Smart Elevator System</h1>
          <div className="elevator-container">
            {elevatorIds.map(id => <Elevator key={id} elevatorId={id} />)}
          </div>
          <ElevatorControlPanel />
        </div>
      );
    };
     export default UserInterFace;