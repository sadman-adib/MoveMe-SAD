const locations = [
    "Gulshan", "Badda", "Link Road", "Rampura", "Uttara", "Mohakhali",
    "Mirpur", "Khilgaon", "Basabo", "Khilkhet", "Nikunjo", "Baridhara"
];

let lastPassengerId = "";
let availableSeats = 50;

const passengerIdField = document.getElementById("passengerId");
const startLocationField = document.getElementById("startLocation");
const endLocationField = document.getElementById("endLocation");
const startDateTimeField = document.getElementById("startDateTime");
const endDateTimeField = document.getElementById("endDateTime");
const fareField = document.getElementById("fare");
const availableSeatsField = document.getElementById("availableSeats");

// Set initial available seats
availableSeatsField.value = availableSeats;

// Function to get Bangladesh datetime
function getBangladeshDatetime() {
    const now = new Date();
    const bangladeshOffset = 0; // Bangladesh is GMT+6
    const localOffset = now.getTimezoneOffset(); // Local timezone offset in minutes
    const bangladeshTime = new Date(now.getTime() + (bangladeshOffset - localOffset) * 60000);
    return bangladeshTime.toISOString().slice(0, 16);
}

// Function to get a random location
function getRandomLocation() {
    return locations[Math.floor(Math.random() * locations.length)];
}

// Function to get a random fare between 30 and 100
function getRandomFare() {
    return Math.floor(Math.random() * (100 - 30 + 1)) + 30;
}

// Event listener for passenger ID input
passengerIdField.addEventListener("input", () => {
    const passengerId = passengerIdField.value.trim();

    if (passengerId.length === 10) {
        if (passengerId === lastPassengerId) {
            // Passenger Exit
            endLocationField.value = getRandomLocation();
            endDateTimeField.value = getBangladeshDatetime();
            fareField.value = getRandomFare();
            availableSeats++;
            availableSeatsField.value = availableSeats;
            alert(`Passenger Exit Recorded!\nEnd Location: ${endLocationField.value}\nFare: ${fareField.value}`);

            // Send data to PHP for update
            sendDataToServer(passengerId, "bo12345", "b22312", startLocationField.value, startDateTimeField.value, endLocationField.value, endDateTimeField.value, fareField.value);
        } else {
            // Passenger Entry
            if (availableSeats > 0) {
                startLocationField.value = getRandomLocation();
                startDateTimeField.value = getBangladeshDatetime();
                endLocationField.value = "";
                endDateTimeField.value = "";
                fareField.value = "";
                availableSeats--;
                availableSeatsField.value = availableSeats;
                alert(`Passenger Entry Recorded!\nStart Location: ${startLocationField.value}`);

                // Send data to PHP for insert
                sendDataToServer(passengerId, "bo12345", "b22312", startLocationField.value, startDateTimeField.value);
            } else {
                alert("No available seats on the bus!");
            }
        }
        lastPassengerId = passengerId;
    }
});

// Function to send data to PHP script
function sendDataToServer(passengerId, busOwnerId, busId, startLocation, startDateTime, endLocation = null, endDateTime = null, fare = null) {
    const formData = new FormData();
    formData.append("passengerId", passengerId);
    formData.append("busOwnerId", busOwnerId);
    formData.append("busId", busId);
    formData.append("startLocation", startLocation);
    formData.append("startDateTime", startDateTime);
    formData.append("endLocation", endLocation);
    formData.append("endDateTime", endDateTime);
    formData.append("fare", fare);

    fetch('insert_update_revenue.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // You can log or handle success/failure here
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
