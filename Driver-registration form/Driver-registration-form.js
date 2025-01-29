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
    extraInput.innerHTML = "";

    if (paymentMethod === "mobile") {
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
        extraInput.innerHTML = `
            <input type="text" placeholder="Enter Bank Name" />
            <input type="text" placeholder="Enter Bank Account Number" />
        `;
        extraInput.style.display = "block";
    } else {
        extraInput.style.display = "none";
    }
});

document.getElementById("driver-registration-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch("Driver-registration-form.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert("Driver registered successfully!");
            document.getElementById("driver-id").value = result.driver_id;
            this.reset();
        } else {
            alert("Error: " + result.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while submitting the form. Please try again.");
    });
});
