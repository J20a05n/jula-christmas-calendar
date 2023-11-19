import React, { useEffect, useState } from "react";
import "./App.css";
//Json file that holds our door data. Could be changed to a database connection instead if prefered.
import doors from "./json/doors.json";
import shuffle from 'lodash/shuffle';
import config from "./config";
import CountdownTimer from "./CountdownTimer"; // Import the CountdownTimer component

// Want to try a door and se what it looks like? Change the date to todays date.
// Viewing this another year, change the dates in doors.json in json map

function App() {
  // Password for accessing the main application
  const correctPassword = config.password; // Set your password here
  const semiPassword = config.semiPassword;

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState(""); // Add state for the second password
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticated2, setAuthenticated2] = useState(false); // Add state for the second password
  const [isOpen, setIsOpen] = useState([]);
  const [submitToStorage, setSubmitToStorage] = useState([]);
  const [openedDoors, setOpenedDoors] = useState([]);

  useEffect(() => {
    const local = localStorage.getItem("isOpen");
    setIsOpen(local ? JSON.parse(local) : []); // Parse the stored JSON string into an array
    setOpenedDoors(local ? JSON.parse(local) : []); // Parse the stored JSON string into an array
  }, []);
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
      setOpenedDoors([...openedDoors, day]);
      localStorage.setItem("isOpen", JSON.stringify([...openedDoors, day]));
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
    setOpenedDoors([]); // Clear the opened doors
  };

  const shuffledDoors = shuffle(doors);


  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const handlePasswordSubmit2 = () => {
    if (password2 === semiPassword) {
      setAuthenticated2(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordInputChange2 = (e) => {
    setPassword2(e.target.value);
  };

  const handlePasswordInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handlePasswordSubmit();
    }
  };

  const handlePasswordInputKeyPress2 = (e) => {
    if (e.key === "Enter") {
      handlePasswordSubmit2();
    }
  };

  

  return (
    <div className="container">
      {authenticated ? ( // Display your main application if authenticated
      <div className="content">
        <div className="calendar">
          {shuffledDoors.map((door, i) => {
            const isDoorOpened = openedDoors.some((openedDoor) => openedDoor === door.day);
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
          Kalender Zurücksetzen
        </button>
        </div>
      ) : authenticated2 ? (
        <div className="message">
          <p style={{ color: "red" }}>Geschafft! Mach hier von einen Screenshot und schick ihn mir, dann gibts was kleines :)</p>
        </div>
      ) : (
        <div className="center-content">
          <CountdownTimer />
          <div className="riddle-text">
            I'm a calendar unique, with surprises concealed,
            <br></br>
            Each day, a small mystery, yet to be revealed.
            <br></br>
            You'll find me in homes, a December tradition,
            <br></br>
            I add to the season, with daily elation.
            <br></br>
            <br></br>
            On my colorful surface, the numbers don't reveal,
            <br></br>
            The object that's kept concealed.
            <br></br>
            A countdown to Christmas, with joy I am filled,
            <br></br>
            What am I, in homes, that keeps time's thrill?
            <br></br>
            |
            <br></br>
            I'm made of frost, a winter's delight,
            <br></br>
            Adorning windows, creating a sight.
            <br></br>
            Intricate and lacy, I'm a chilly art,
            <br></br>
            A decoration that warms the heart.
            <br></br>
            <br></br>
            I form on glass when temperatures drop,
            <br></br>
            A crystalline pattern, I can't stop.
            <br></br>
            A natural beauty, on panes, I cling tight,
            <br></br>
            What am I that decorates the winter night?
            <br></br>
            ...
            <div className="password-page">
            <input
              type="password"
              placeholder="Alles klein :)"
              value={password}
              onChange={handlePasswordInputChange}
              onKeyPress={handlePasswordInputKeyPress}
            />
            <button onClick={handlePasswordSubmit}>Los</button>
            </div>
          </div>
          {/* <div className="password-page">
            <input
              type="password"
              placeholder="Alles klein geschrieben" // Change the placeholder text
              value={password2}
              onChange={handlePasswordInputChange2}
              onKeyPress={handlePasswordInputKeyPress2}
            />
            <button onClick={handlePasswordSubmit2}>Submit</button>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default App;