function selectOption(td, url) {
    // Remove 'selected' class from all <td> elements
    const allCells = document.querySelectorAll("td");
    allCells.forEach(cell => cell.classList.remove("selected"));

    // Add 'selected' class to the clicked <td>
    td.classList.add("selected");

    // Navigate to the specified URL
    location.href = url;
}

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

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission for validation

  const storeName = document.getElementById("store_name").value;
  const phone = document.getElementById("phone").value;
  const location = document.getElementById("location").value;
  const storeOwnerName = document.getElementById("storeowner_name").value;
  const nid = document.getElementById("nid").value;
  const tradeLicense = document.getElementById("trade_license_number").value;
  const paymentMethod = document.getElementById("payment-method").value;

  // Validate if all required fields are filled out
  if (!storeName || !phone || !location || !storeOwnerName || !nid || !tradeLicense || !paymentMethod) {
      alert("Error: All fields are required.");
      return;
  }

  // Now, submit the form via AJAX
  const formData = new FormData(this);

  fetch("Store-registration-form.php", {
      method: "POST",
      body: formData
  })
  .then(response => response.json())  // Parse response as JSON
  .then(data => {
      if (data.success) {
          alert("Registration successful!");
          // Optionally reset the form after success
          document.querySelector("form").reset();
      } else {
          alert("Error: " + data.message);
      }
  })
  .catch(error => {
      alert("Error: " + error.message);
  });
});
