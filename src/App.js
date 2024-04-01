import React from 'react';
import UserInterface from './Components/UserInterFace';
import { Provider } from 'react-redux'; 
import store from './Slices/store'; 

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <UserInterface />
      </div>
    </Provider>
  );
}

export default App;
