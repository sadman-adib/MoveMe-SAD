function selectOption(td, url) {
    // Remove 'selected' class from all <td> elements
    const allCells = document.querySelectorAll("td");
    allCells.forEach(cell => cell.classList.remove("selected"));

    // Add 'selected' class to the clicked <td>
    td.classList.add("selected");

    // Navigate to the specified URL
    location.href = url;
}

// Function to auto-generate a bus owner ID
function generateBusOwnerId() {
  const prefix = "BO";
  const randomNum = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number
  return `${prefix}${randomNum}`;
}

// Event listener for form submission
document.getElementById("registration-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from submitting normally

  // Generate bus owner ID
  const busOwnerId = generateBusOwnerId();

  // Capture form data
  const busowner_name = document.getElementById("busowner_name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const location = document.getElementById("location").value;
  const bus_quantity = document.getElementById("bus_quantity").value;
  const paymentMethod = document.getElementById("payment-method").value;

  let paymentDetails = "";
  if (paymentMethod === "mobile") {
      const provider = document.getElementById("mobile-banking-provider").value;
      const accountNumber = document.querySelector("#extra-input input[type='text']").value;
      paymentDetails = `${paymentMethod}:${provider}:${accountNumber}`;
  } else if (paymentMethod === "bank") {
      const bankName = document.querySelector("#extra-input input:nth-child(1)").value;
      const accountNumber = document.querySelector("#extra-input input:nth-child(2)").value;
      paymentDetails = `${paymentMethod}:${bankName}:${accountNumber}`;
  }

  // Prepare data for submission
  const formData = {
      busowner_id: busOwnerId,
      busowner_name,
      phone,
      email,
      location,
      bus_quantity,
      payment: paymentDetails,
  };

  // Send data to the backend
  fetch("Bus-owner-registration form.php", {  // Make sure the filename is correct
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
  })
      .then((response) => response.json())
      .then((data) => {
          if (data.success) {
              alert("Registration successful!");
              document.getElementById("registration-form").reset(); // Clear the form
          } else {
              alert("Registration failed: " + data.message);
          }
      })
      .catch((error) => {
        console.error("Fetch Error:", error); // Log the error
        alert("An error occurred. Please try again.");
    });

});

// Dynamic payment method input handling
document.getElementById("payment-method").addEventListener("change", function () {
  const paymentMethod = this.value;
  const extraInput = document.getElementById("extra-input");

  // Clear previous inputs
  extraInput.innerHTML = "";

  if (paymentMethod === "mobile") {
      // Show dropdown for mobile banking providers and an input for the account number
      extraInput.innerHTML = `
          <select id="mobile-banking-provider">
              <option value="">Select Mobile Banking Provider</option>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="roket">Rocket</option>
              <option value="other">Other</option>
          </select>
          <input type="text" placeholder="Enter Mobile Banking Account Number" />
      `;
      extraInput.style.display = "block";
  } else if (paymentMethod === "bank") {
      // Show input for bank name and bank account number
      extraInput.innerHTML = `
          <input type="text" placeholder="Enter Bank Name" />
          <input type="text" placeholder="Enter Bank Account Number" />
      `;
      extraInput.style.display = "block";
  } else {
      // Hide extra input fields if no valid option is selected
      extraInput.style.display = "none";
  }
});
