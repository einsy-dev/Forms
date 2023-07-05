import { useState } from "react";

export default function App() {
  const [state, setState] = useState([]);

  const btn_sub = (evt) => {
    evt.preventDefault();
    const dateIn = evt.target[0].value;
    const disIn = evt.target[1].value;

    if (!state.length) {
      setState(prev => [...prev, { date: dateIn, distance: disIn }]);
      console.log('New data length = 0')
      return
    }

    const newState = [...state];
    const dateData = newState.find(el => el.date === dateIn);
    if (dateData) {
      dateData.distance = Number(dateData.distance) + Number(disIn)
      setState(newState)
      console.log('Change data')
    }
    else {
      setState(prev => [...prev, { date: dateIn, distance: disIn }].sort((a, b) => a.date > b.date ? -1 : 1));
      console.log('New data length > 0')
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
