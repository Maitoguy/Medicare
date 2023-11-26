import { Link } from "react-router-dom";
import '../CSS/start.css';


    function Start() {
        // If value is not entered then getting that value
        function checkValue(){
        let height = document.getElementsByName("height")[0].value;
        let weight = document.getElementsByName("weight")[0].value;
        let wcircum = document.getElementsByName("wcircum")[0].value;
        let hcircum = document.getElementsByName("hcircum")[0].value;
        let email = document.getElementsByName("email")[0].value;

        if(!height){
            height = prompt("Please Enter your Height");
        }
        if(!weight){
            weight = prompt("Please Enter your Weight");
        }
        if(!wcircum){
            wcircum = prompt("Please Enter your Waist Circumference");
        }
        if(!hcircum){
            hcircum = prompt("Pleae Enter your Hip Circumderence");
        }

        // Sending data to server to server and add it to database
        const data = {
            height: height,
            weight: weight,
            wcircum: wcircum,
            hcircum: hcircum,
            email: email
        }

        fetch("http://localhost:8000/userInput", {
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
        <div className="Start">
            <h1>Hello Sunita Sharma,</h1>
            <h2>Please Enter Following Details</h2>
            <div >

                <form action="http://localhost:8000/userInput" method="POST">

                    <div className="input">
                        <input type="number" name="height" placeholder="Enter your Height in Meter ..." min="0" />
                    </div>

                    <div className="input">
                        <input type="number" name="weight" placeholder="Enter your Weight in Kg ..." min="0"/>
                    </div> 

                    <div className="input">
                        <input type="number" name="wcircum" placeholder="Enter Your Waist cirumference in cm ..." min="0" />
                    </div>  

                    <div className="input">
                        <input type="number" name="hcircum" placeholder="Enter Your Hip cirumference in cm ..." min="0"/>
                    </div>

                    <div className="input">
                        <input type="email" name="email" placeholder="Enter Your Email ..." required/>
                    </div>

                    <Link to="/home" onClick={checkValue}><input type="submit" value="Submit" /></Link>

                </form>

            </div>
            

        </div>
        );
    }
    
    export default Start;
    