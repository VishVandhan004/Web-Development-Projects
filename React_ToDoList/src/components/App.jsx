import React, { useState } from "react";

function App() {
  // the below line of code is used to save the state when the input is entered.. so we need to destructure it to get hold of the text
  const [inputText, setInputText] = useState("");

  // this contains the set of items previously stored.. we need to save the state for them also..
  const [items, setItems] = useState([]);
  // this function is used to get hold of the value we are entering in the placeholder..
  function handleChange(event) {
    // this stores the new activities of to-do list..
    const newValue = event.target.value;
    setInputText(newValue); // this is used to handle the function..
  }
  // this function gets triggered when the button gets clicked as event listener...
  function addItem() {
    // we want to add the new item at the end of the array..
    // use the spread operator and return a new array which contains all the previous items and the new value..
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });
    // after adding,set it back to null.
    setInputText("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={inputText} />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {/* we use the map function here to go through each and every item in the array and give them one by one in a list format.. keep curly braces..  */}
          {items.map((todoItem) => (
            <li>{todoItem}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
