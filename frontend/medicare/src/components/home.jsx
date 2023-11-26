import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/home.css'

function Home() {
  const [userData, setUserData] = useState([]);
  const [medicineData, setMedicineData] = useState([]);

  // Delete medicine for Database
  function deleteMedicine(id) {
    fetch(`http://localhost:8000/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(`Medicine with ID ${id} deleted successfully`);
        return fetch("http://localhost:8000/getData", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Data received successfully after deletion");
        return response.json();
      })
      .then((receivedData) => {
        setUserData(receivedData.sunita);
        setMedicineData(receivedData.medicine);
      })
      .catch((error) => {
        console.error("Error deleting medicine:", error);
      });
  }

  // Making call to api and get all respective data
  useEffect(() => {
    fetch("http://localhost:8000/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Data received successfully");
        return response.json();
      })
      .then((receivedData) => {
        console.log(receivedData);
        setUserData(receivedData.sunita);
        setMedicineData(receivedData.medicine);
        console.log(medicineData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Based on BMI person will be cateogeriazed
  const getWeightCategory = (bmi) => {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return 'Healthy weight';
    } else if (bmi >= 25 && bmi <= 29.9) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  };

  return (
    <div id="home">
      <div id="welcome">
        <h4>Welcome to Oldcare Sunita</h4>
      </div>

      <div id="user">

      </div>

      <div id="add-medicine">
        <Link to='/add-medicine'>Add Medicine</Link>
      </div>

      {medicineData.length > 0 ? (
        <div id="medicineTable">
          <table id="medicineTable">
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Medicine Time</th>
                <th>Meal Info</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {medicineData.map((medicine) => (
                <tr key={medicine._id}>
                  <td>{medicine.medicineName}</td>
                  <td>{medicine.morning || medicine.afternoon || medicine.evening}</td>
                  <td>
                    {/* Display all meal information with line breaks */}
                    {medicine.morning ? "`${medicine.morning}`" : ''}<br />
                    {medicine.afternoon ? `${medicine.afternoon}` : ''}<br />
                    {medicine.evening ? `${medicine.evening}` : ''}
                  </td>
                  <td className="delete-button">
                    {/* Use arrow function to pass parameters */}
                    <button onClick={() => deleteMedicine(medicine._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No medicine data available.</p>
      )}

      <div id="userDetails">
        <h2>User Details</h2>
        <ul>
          {userData.map((user) => (
            <li key={user._id}>
              <strong>BMI:</strong> {user.bmi.toFixed(2)} - {getWeightCategory(user.bmi)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
