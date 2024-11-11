// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbs6UgbaxuxKZyG3v464lkeEtMJQbZ6-4",
  authDomain: "renewalparking.firebaseapp.com",
  databaseURL: "https://renewalparking-default-rtdb.firebaseio.com",
  projectId: "renewalparking",
  storageBucket: "renewalparking.appspot.com",
  messagingSenderId: "398724226058",
  appId: "1:398724226058:web:cfb4d70283c546944d13f3",
  measurementId: "G-SGV7YXDJ8X"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
console.log("Firebase initialized successfully!");

// Global variables
let totalSlots = 24; // Set initial slot count
let parkingSlots = [];
let currentModalAction = null;
let currentSlotNumber = null;

// Function to initialize parking slots
function initializeParkingSlots() {
  parkingSlots = Array.from({ length: totalSlots }, (_, i) => ({
    "parking-number": (i + 1).toString(),
    "car-number": "",
    "language": "N/A", // Set default language to N/A
    "status": "N/A" // Set default status to N/A
  }));
  updateDatabase(); // Update Firebase with initial parking slots
}
const changeSlotsPassword = "3478";
// Function to change total parking slots
function confirmChangeSlots() {
  const enteredPassword = prompt("Please enter the password to change the number of slots:");

  if (enteredPassword !== changeSlotsPassword) {
    alert("Incorrect password. Access denied.");
    return; // Exit if password is incorrect
  }else{

  const newTotal = parseInt(document.getElementById("carInput").value);

  // Validate the input
  if (isNaN(newTotal) || newTotal <= 0) {
    alert("Please enter a valid number of parking slots.");
    return;
  }

  // Confirm the user's intention
  const confirmation = confirm("Changing the total number of parking slots will remove any car number data from the removed slots. Do you want to proceed?");
  if (confirmation) {
    totalSlots = newTotal;
    initializeParkingSlots();
    closeModal();
    renderParkingMap();
  }
}}

// Function to update the parking slots in Firebase
function updateDatabase() {
  // Update Firebase with the current parkingSlots array
  firebase.database().ref('parkingSlots').set(parkingSlots)
    .then(() => console.log("Database updated successfully."))
    .catch((error) => console.error("Error updating database:", error));
}

// Define the statuses
const statuses = ["In-Car", "Fetch-to-shop", "Shopping", "Wrapping" , "Waiting for Reindeer"];



function addCar(parkingNumber, carNumber, language) {
  // Log current parkingSlots for debugging
  console.log("Current parkingSlots:", parkingSlots);
  
  // Check if car number already exists in a different spot
  const isDuplicate = parkingSlots.some(slot => slot["car-number"] === carNumber && slot["parking-number"] !== parkingNumber);
  
  if (isDuplicate) {
    alert(`Error: The car number ${carNumber} is already parked in another spot.`);
    return; // Exit if duplicate found
  }

  // Find the specific parking slot by parking number
  const slot = parkingSlots.find(slot => slot["parking-number"] === parkingNumber);
  
  if (slot && !slot["car-number"]) {
    // Assign car number to the empty slot
    slot["car-number"] = carNumber;
    slot["language"] = language; // Save language
    slot.status = "In-Car"; // Update status
    updateDatabase(); // Save updated parking data
    renderParkingMap(); // Re-render the map
  } else {
    alert("Error: The selected parking spot is already occupied or does not exist.");
  }
}


function refresh(){
  renderParkingMap();
}

// Function to change the status of a parking slot
function changeStatus(parkingNumber) {
  const slot = parkingSlots.find(slot => slot["parking-number"] === parkingNumber);
  
  // Cycle through the statuses if a car is parked
  if (slot["car-number"]) {
    const currentStatusIndex = statuses.indexOf(slot.status);
    const nextStatusIndex = (currentStatusIndex + 1) % statuses.length;
    slot.status = statuses[nextStatusIndex]; // Update to the next status
    updateDatabase(); // Update database with new status
  }
  
  renderParkingMap(); // Re-render the parking map to show updated status
}

document.getElementById("searchInput").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchCar();
    e.target.value = ""; // Clear the search box after search
  } else if (e.target.value === "") {
    // Re-render all parking slots if search box is empty
    renderParkingMap();
  }
});

// Function to search for a specific car by its number
function searchCar() {
  const searchValue = document.getElementById("searchInput").value.trim();
  const parkingMap = document.getElementById("parkingMap");

  // If the search input is empty, render the full parking map
  if (searchValue === "") {
    renderParkingMap();
    return;
  }

  // Find all slots where car-number includes the search value as a substring
  const matchingSlots = parkingSlots.filter(slot => slot["car-number"] && slot["car-number"].includes(searchValue));

  // Clear the parking map display
  parkingMap.innerHTML = "";

  // Display only the matching slot(s)
  matchingSlots.forEach(slot => {
    const slotDiv = document.createElement("div");
    slotDiv.className = `parking-slot ${slot["car-number"] ? "occupied" : "available"} ${slot.status ? `status-${slot.status.toLowerCase().replace(/ /g, '-')}` : ''}`;
    slotDiv.id = `slot-${slot["parking-number"]}`;

    slotDiv.innerHTML = `
      <strong style="font-size: smaller;">Spot ${slot["parking-number"]}</strong><br>
      Status: <span style="font-size: smaller;">${slot["car-number"] ? (slot.status || "N/A") : "N/A"}</span><br>
      Car # <span style="font-size: smaller;">${slot["car-number"] || "Available"}</span><br>
      <span style="font-size: smaller;">Language:</span> <span style="font-size: smaller;">${slot["language"] || "N/A"}</span>
    `;

    parkingMap.appendChild(slotDiv);
  });

  // If no matching slots found, display a message
  if (matchingSlots.length === 0) {
    parkingMap.innerHTML = "<p>No matching car found.</p>";
  }
}


document.getElementById("searchInput").addEventListener("keypress", (e) => {
  const allowedChars = /^[\d-]*$/;
  if (!allowedChars.test(e.key)) {
    e.preventDefault(); // Block input if character is not a digit or dash
  }
});

let lastRemovedSlot = null;

function removeCar(parkingNumber) {
  const slot = parkingSlots.find(slot => slot["parking-number"] === parkingNumber);
  if (slot && slot["car-number"]) {
    // Store details of the removed car for undo
    lastRemovedSlot = { ...slot };
    
    // Clear slot details
    slot["car-number"] = null;
    slot.language = null;
    slot.status = "N/A";
    
    // Enable the undo button
    document.getElementById("undoButton").disabled = false;
    
    // Update the database and re-render the map
    updateDatabase();
    renderParkingMap();
  }
}

// Function to undo the last car removal
function undoRemove() {
  if (lastRemovedSlot) {
    const slot = parkingSlots.find(s => s["parking-number"] === lastRemovedSlot["parking-number"]);
    
    if (slot) {
      // Restore slot details from last removed car
      slot["car-number"] = lastRemovedSlot["car-number"];
      slot.language = lastRemovedSlot.language;
      slot.status = lastRemovedSlot.status;
      
      // Clear the last removed slot after undo
      lastRemovedSlot = null;
      
      // Disable the undo button
      document.getElementById("undoButton").disabled = true;
      
      // Update the database and re-render the map
      updateDatabase();
      renderParkingMap();
    }
  }
}

// Function to open modal
function openModal(action, slotNumber = null) {
  currentModalAction = action;
  currentSlotNumber = slotNumber;
  const modalTitle = document.getElementById("modalTitle");
  const carInput = document.getElementById("carInput");
  const languageSelect = document.getElementById("languageSelect");
  const warningMessage = document.getElementById("warningMessage");

  if (action === 'addCar') {
    modalTitle.textContent = "Enter Car Number";
    carInput.placeholder = "Car Number";
    languageSelect.style.display = "block"; // Show the language dropdown
    warningMessage.style.display = "none";
  } else if (action === 'slotCount') {
    modalTitle.textContent = "Change Total Parking Slots";
    carInput.placeholder = "Total Slots";
    languageSelect.style.display = "none"; // Hide the language dropdown
    warningMessage.style.display = "block"; // Show warning message
  }

  carInput.value = "";
  languageSelect.value = "english"; // Reset language selection to default
  document.getElementById("carModal").style.display = "block";

  carInput.addEventListener("input", () => {
    carInput.value = carInput.value
      .replace(/[^0-9-]/g, "") // Remove any character that's not a number or dash
      .slice(0, 9); // Limit to 9 characters
  });
}

// Function to close modal
function closeModal() {
  document.getElementById("carModal").style.display = "none";
}

// Function to confirm action
function confirmAction() {
  if (currentModalAction === 'addCar') {
    const input = document.getElementById("carInput").value.trim();
    const selectedLanguage = document.getElementById("languageSelect").value; // Get selected language

    // Call addCar only if input is not empty
    if (input) {
      addCar(currentSlotNumber, input, selectedLanguage); // Pass the parking number, car number, and language to addCar
      closeModal(); // Close the modal after adding
    } else {
      alert("Please enter a valid car number.");
    }
  } else if (currentModalAction === 'slotCount') {
    confirmChangeSlots(); // Call the function for changing slots
  }
}

function renderParkingMap() {
  const parkingMap = document.getElementById("parkingMap");
  parkingMap.innerHTML = ""; // Clear existing map

  // Check if on the display-only page by verifying URL path or a specific query parameter
  const isDisplayOnly = window.location.pathname.includes('display-only.html'); 

  parkingSlots.forEach(slot => {
    const slotDiv = document.createElement("div");
    slotDiv.className = `parking-slot ${slot["car-number"] ? "occupied" : "available"} ${slot.status ? `status-${slot.status.toLowerCase().replace(/ /g, '-')}` : ''}`;
    slotDiv.id = `slot-${slot["parking-number"]}`;

    // Display parking slot details
    slotDiv.innerHTML = `
      <strong style="font-size: smaller;">Spot ${slot["parking-number"]}</strong><br>
      Status: <span style="font-size: smaller;">${slot["car-number"] ? (slot.status || "N/A") : "N/A"}</span><br>
      Car # <span style="font-size: smaller;">${slot["car-number"] || "Available"}</span><br>
      <span style="font-size: smaller";>Language:</span> <span style="font-size: smaller;">${slot["language"] || "N/A"}</span>
    `;

    // Only add action buttons if NOT on the display-only page
    if (!isDisplayOnly) {
      const addButton = document.createElement("button");
      addButton.textContent = "Add Car";
      addButton.onclick = () => openModal('addCar', slot["parking-number"]);
      addButton.disabled = !!slot["car-number"];

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove Car";
      removeButton.onclick = () => removeCar(slot["parking-number"]);
      removeButton.disabled = !slot["car-number"];

      const statusButton = document.createElement("button");
      statusButton.textContent = "Change Status";
      statusButton.onclick = () => changeStatus(slot["parking-number"]);
      statusButton.disabled = !slot["car-number"];

      if (slot["car-number"]) {
        slotDiv.appendChild(removeButton);
        slotDiv.appendChild(statusButton);
      } else {
        slotDiv.appendChild(addButton);
      }
    }

    parkingMap.appendChild(slotDiv);
  });
}

// Initialize the parking slots and set up the database listener
function init() {
  const parkingSlotsRef = firebase.database().ref('parkingSlots');

  // Fetch existing parking slots from Firebase on page load
  parkingSlotsRef.once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        // Populate parkingSlots with Firebase data
        parkingSlots = snapshot.val().map((slot, index) => ({
          "parking-number": (index + 1).toString(),
          ...slot
        }));
      } else {
        // Initialize slots if no data exists
        initializeParkingSlots();
      }
      renderParkingMap(); // Render the parking map with initial or fetched data
    })
    .catch(error => {
      console.error("Error loading data:", error);
    });

  // Set up a listener for real-time updates
  parkingSlotsRef.on('value', snapshot => {
    parkingSlots = snapshot.val() || [];
    renderParkingMap(); // Render the parking map with updated data
  });
}

// Call init function to start
init();
