import React from 'react';
import './App.css';
import ArrayRepresentation from "./ArrayRepresentation/ArrayRepresentation";
import LinkedListRepresentation from "./LinkedListVisualization/LinkedListRepresentation";

function App() {
  return (
    <div className="App">
      <ArrayRepresentation />
      <LinkedListRepresentation />
    </div>
  );
}

export default App;
