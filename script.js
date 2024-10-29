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
    "language": "N/A" // Set default language to N/A
  }));
  updateDatabase(); // Update Firebase with initial parking slots
}

// Function to change total parking slots
function confirmChangeSlots() {
  const newTotal = parseInt(document.getElementById("carInput").value); // Changed to use carInput for new total

  // Validate the input
  if (isNaN(newTotal) || newTotal <= 0) {
    alert("Please enter a valid number of parking slots.");
    return;
  }

  // Confirm the user's intention
  const confirmation = confirm("Changing the total number of parking slots will remove any car number data from the removed slots. Do you want to proceed?");
  if (confirmation) {
    totalSlots = newTotal; // Update the global totalSlots variable
    initializeParkingSlots(); // Reinitialize parking slots based on the new total
    closeModal(); // Close the modal
    renderParkingMap(); // Re-render the parking map to reflect changes
  }
}

// Function to update the parking slots in Firebase
function updateDatabase() {
  // Update Firebase with the current parkingSlots array
  firebase.database().ref('parkingSlots').set(parkingSlots)
    .then(() => console.log("Database updated successfully."))
    .catch((error) => console.error("Error updating database:", error));
}

// Function to render the parking map
function renderParkingMap() {
  const parkingMap = document.getElementById("parkingMap");
  parkingMap.innerHTML = ""; // Clear existing map

  parkingSlots.forEach(slot => {
    const slotDiv = document.createElement("div");
    slotDiv.className = `parking-slot ${slot["car-number"] ? "occupied" : "available"}`;
    slotDiv.id = `slot-${slot["parking-number"]}`;

    slotDiv.innerHTML = `
      <strong style="font-size: smaller;">Slot ${slot["parking-number"]}</strong><br>
      Car: <span style="font-size: smaller;">${slot["car-number"] || "Available"}</span><br>
      <span style="font-size: smaller;">Language:</span> <span style="font-size: smaller;">${slot["language"] || "N/A"}</span>
    `;

    // Add Car button
    const addButton = document.createElement("button");
    addButton.textContent = "Add Car";
    addButton.onclick = () => openModal('addCar', slot["parking-number"]);
    addButton.disabled = !!slot["car-number"];

    // Remove Car button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove Car";
    removeButton.onclick = () => removeCar(slot["parking-number"]);
    removeButton.disabled = !slot["car-number"];

    slotDiv.appendChild(addButton);
    slotDiv.appendChild(removeButton);
    parkingMap.appendChild(slotDiv);
  });
}

// Function to add a car to a specific slot
function confirmAddCar(carNumber, language) {
  if (!carNumber) {
    alert("Please enter a valid car number.");
    return;
  }

  const duplicateCar = parkingSlots.some(slot => slot["car-number"] === carNumber);
  if (duplicateCar) {
    alert("This car number is already parked in another slot.");
    return;
  }

  const slot = parkingSlots.find(slot => slot["parking-number"] === currentSlotNumber);
  if (slot) {
    slot["car-number"] = carNumber; // Update the car number
    slot["language"] = language; // Save the selected language
    updateDatabase(); // Update the database with the new parkingSlots array
    closeModal();
    renderParkingMap();
  }
}

// Function to remove a car from a specific slot
function removeCar(slotNumber) {
  const slot = parkingSlots.find(slot => slot["parking-number"] === slotNumber);
  if (slot && slot["car-number"]) {
    slot["car-number"] = ""; // Clear the car number
    slot["language"] = "N/A"; // Revert language to N/A
    updateDatabase(); // Update the database
    renderParkingMap();
  }
}

// Function to open modal
// Function to open modal
function openModal(action, slotNumber = null) {
  currentModalAction = action;
  currentSlotNumber = slotNumber;
  const modalTitle = document.getElementById("modalTitle");
  const carInput = document.getElementById("carInput");
  const languageSelect = document.getElementById("languageSelect"); // Get the language select element
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
    confirmAddCar(input, selectedLanguage); // Pass the language to the confirm function
  } else if (currentModalAction === 'slotCount') {
    confirmChangeSlots(); // Call the function for changing slots
  }
}

// Initialize the parking slots and set up the database listener
function init() {
  const parkingSlotsRef = firebase.database().ref('parkingSlots');

  // Fetch existing parking slots from Firebase on page load
  parkingSlotsRef.once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        // If there is existing data, populate parkingSlots with it
        parkingSlots = snapshot.val().map((slot, index) => ({
          "parking-number": (index + 1).toString(),
          "car-number": slot["car-number"] || "",
          "language": slot["language"] || "N/A" // Ensure language is included
        }));
      } else {
        // If no data exists, initialize with default slots
        initializeParkingSlots();
      }
      renderParkingMap(); // Render the parking map with the fetched data

      // Set up a real-time listener for updates
      parkingSlotsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          parkingSlots = data.map((slot, index) => ({
            "parking-number": (index + 1).toString(),
            "car-number": slot["car-number"] || "",
            "language": slot["language"] || "N/A" // Ensure language is included
          }));
          renderParkingMap(); // Re-render the parking map with updated data
        }
      });
    })
    .catch(error => {
      console.error("Error fetching parking slots from Firebase:", error);
      // If there's an error fetching data, initialize slots anyway
      initializeParkingSlots();
      renderParkingMap(); // Render the parking map with the initialized data
    });
}

// Initial setup
init();
