import { useState } from "react";

export default function App() {
  const [state, setState] = useState([]);

// Function to handle the submit button click event
const btn_sub = (evt) => {
  evt.preventDefault(); // Prevent form submission

  const dateIn = evt.target[0].value; // Get the value of the date input field
  const disIn = evt.target[1].value; // Get the value of the distance input field

  if (!state.length) {
    // If the state array is empty
    setState(prev => [...prev, { date: dateIn, distance: disIn }]); // Add a new object to the state array
    console.log('New data length = 0'); // Log a message indicating new data is added
    return; // Exit the function
  }

  const newState = [...state]; // Create a new copy of the state array
  const dateData = newState.find(el => el.date === dateIn); // Find an object in the state array with matching date

  if (dateData) {
    // If an object with matching date is found
    dateData.distance = Number(dateData.distance) + Number(disIn); // Update the distance property of the object
    setState(newState); // Update the state array
    console.log('Change data'); // Log a message indicating data is changed
  } else {
    // If no object with matching date is found
    setState(prev => [...prev, { date: dateIn, distance: disIn }].sort((a, b) => a.date > b.date ? -1 : 1)); // Add a new object to the state array and sort the array based on date
    console.log('New data length > 0'); // Log a message indicating new data is added
  }
}

  const del = (id) => {
    setState(state.filter((el) => state.indexOf(el) !== id));
  };

  return (
    <fieldset className="main_field">
      <legend>Учет тренировок</legend>

      <form className="input_form" onSubmit={btn_sub}>
        <div className="input_field">
          <label htmlFor="date">Date</label>
          <br />
          <input type="date" id="date" />
        </div>
        <div className="input_field">
          <label htmlFor="distance">Distance</label>
          <br />
          <input type="number" id="distance" />
        </div>
        <button className="input_field btn">Add</button>
      </form>
      <div className="second_title">
        <div className="task_item">
          <span>Data</span>
          <span className="distance">Distance</span>
          <span>Action</span>
        </div>
        <div className="second_field">
          {state?.map((el, id) => (
            <div className="task_item" key={id}>
              <div>{el.date}</div>
              <div className="distance">{el.distance}</div>
              <div>
                <button onClick={() => del(id)}>x</button>
              </div>
            </div>

          ))}
        </div>
      </div>
    </fieldset>
  );
}
