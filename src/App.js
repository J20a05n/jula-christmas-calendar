import React, { useEffect, useState } from "react";
import "./App.css";
//Json file that holds our door data. Could be changed to a database connection instead if prefered.
import doors from "./json/doors.json";
import shuffle from 'lodash/shuffle';
import config from "./config";
// Want to try a door and se what it looks like? Change the date to todays date.
// Viewing this another year, change the dates in doors.json in json map

function App() {
  // Password for accessing the main application
  const correctPassword = config.password; // Set your password here

  // State to manage password input and authentication
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  // isOpen - the variable wich our localstorage item is saved to.
  const [isOpen, setIsOpen] = useState([]);
  // State wich is used as variable when saving to localstorage. Also used as a variable
  // for useEffect to detect change
  const [submitToStorage, setSubmitToStorage] = useState([]);

  // Check if we are allowed to open the door. If the date has passed or not.
  // if true then call openDoor function. Else alert with message that you want.
  // or null if you prefer that
  const checkIfAllowedToOpen = (inputdate) => {
    const doordate = new Date(inputdate);
    const today = new Date();

    today >= doordate
      ? openDoor(inputdate)
      : alert(
          "Na na na, da müssen Sie sich noch was geduldigen"
        );
  };

  // Open the door and saves which doors have been opened to localstorage.
  // Also changes the setSubmitToStorage state to detect changes.
  const openDoor = (doorDate) => {
    const door = doors.find((d) => d.day === doorDate);
    if (door) {
      const { day, pdfUrl } = door;
  
      // Check if the PDF URL is provided
      if (pdfUrl) {
        window.open(pdfUrl, "_blank"); // Open the PDF in a new tab
      } else {
        alert("No PDF available for this day.");
      }
  
      // Update the list of opened doors
      setOpenedDoors([...openedDoors, door]);
  
      // Update the state to mark the door as opened
      setSubmitToStorage([...isOpen, day]);
      localStorage.setItem("isOpen", JSON.stringify(submitToStorage));
    }
  };

  // Convert the json date format (string) to date to compare to today's date.
  const converDateToDay = (inputdate) => {
    const date = new Date(inputdate);
    const day = date.getDate();

    return day;
  };

  // Remove the item from localstorage and that way resets the doors.
  const resetDoors = () => {
    setSubmitToStorage([]);
    localStorage.removeItem("isOpen");
  };

  // Initial fetch of localstorage.
  useEffect(() => {
    const local = localStorage.getItem("isOpen");
    setIsOpen(local ? local : []);
  }, [submitToStorage]);

  const shuffledDoors = shuffle(doors);

  const [openedDoors, setOpenedDoors] = useState([]);

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="container">
      {authenticated ? ( // Display your main application if authenticated
      <div className="content">
        <div className="calendar">
          {shuffledDoors.map((door, i) => {
            const isDoorOpened = openedDoors.some((openedDoor) => openedDoor.day === door.day);
            return (
              <div key={i}>
                {isDoorOpened ? (
                  <div className="dooropen">
                    <p>{door.message}</p>
                  </div>
                ) : (
                  <div
                    className="door"
                    onClick={() => checkIfAllowedToOpen(door.day)}
                  >
                    <p>{converDateToDay(door.day)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <button className="resetbutton" onClick={resetDoors}>
          Reset doors
        </button>
        </div>
      ) : ( // Display the password input page if not authenticated
        <div className="password-page">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handlePasswordSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default App;