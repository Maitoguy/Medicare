import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/addMedicine.css';


function AddMedicine() {
  const [medicineName, setMedicineName] = useState('');
  const [selectedTimings, setSelectedTimings] = useState({
    morning: '',
    afternoon: '',
    evening: '',
  });

  function addMedicine(event) {
    let data = {
      medicineName: medicineName,
      morning: selectedTimings.morning,
      afternoon: selectedTimings.afternoon,
      evening: selectedTimings.evening
    };

    console.log(data);

    fetch("http://localhost:8000/medicineInput", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Data sent successfully");
        return response.json(); 
    })
    .catch(error => {
        console.error("Error sending data:", error);
    });
    return;
  }

  return (
    <div id="medicine-input">
      <form>
        <div className="input">
          <label>Medicine Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Medicine Name..."
            value={medicineName}
            onChange={(event) => setMedicineName(event.target.value)}
          />
        </div>

        {['Morning', 'Afternoon', 'Evening'].map((timeLabel) => (
          <div className="input" key={timeLabel}>
            <label>{timeLabel} Time:</label>
            <div className="meal-options">
              <input
                type="radio"
                id={`beforeMeal-${timeLabel.toLowerCase()}`}
                name={`timing-${timeLabel.toLowerCase()}`}
                value="Before Meal"
                checked={selectedTimings[timeLabel.toLowerCase()] === 'beforeMeal'}
                onChange={() => setSelectedTimings((prevTimings) => ({
                  ...prevTimings,
                  [timeLabel.toLowerCase()]: 'beforeMeal',
                }))}
              />
              <label htmlFor={`beforeMeal-${timeLabel.toLowerCase()}`}>Before Meal</label>

              <input
                type="radio"
                id={`afterMeal-${timeLabel.toLowerCase()}`}
                name={`timing-${timeLabel.toLowerCase()}`}
                value="After Meal"
                checked={selectedTimings[timeLabel.toLowerCase()] === 'afterMeal'}
                onChange={() => setSelectedTimings((prevTimings) => ({
                  ...prevTimings,
                  [timeLabel.toLowerCase()]: 'afterMeal',
                }))}
              />
              <label htmlFor={`afterMeal-${timeLabel.toLowerCase()}`}>After Meal</label>
            </div>
          </div>
        ))}
        <Link to="/home" onClick={addMedicine}>
            <input type="submit" value="Submit" />
        </Link>
      </form>
    </div>
  );
}

export default AddMedicine;
