function selectOption(td, url) {
    // Remove 'selected' class from all <td> elements
    const allCells = document.querySelectorAll("td");
    allCells.forEach(cell => cell.classList.remove("selected"));

    // Add 'selected' class to the clicked <td>
    td.classList.add("selected");

    // Navigate to the specified URL
    location.href = url;
}

document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("driver-table-body");

    // Fetch maintenance data tagged as 'emergency'
    fetch("Maintanence.php?status=emergency")
        .then((response) => {
            if (!response.ok) throw new Error(`Server returned ${response.status}`);
            return response.json();
        })
        .then((data) => {
            if (data.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='8'>No emergency maintenance data available</td></tr>";
                return;
            }

            // Populate table rows
            data.forEach((item) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.bus_id}</td>
                    <td>${item.driver_id}</td>
                    <td>${item.driver_name}</td>
                    <td>${item.phone}</td>
                    <td>${item.location}</td>
                    <td id="status-${item.bus_id}">${item.status}</td>
                    <td id="mechanic-${item.bus_id}">${item.assigned_mechanic || "Not Assigned"}</td>
                    <td>
                        <button class="edit-btn" onclick="editItem('${item.bus_id}')">Edit</button>
                        <button class="delete-btn" onclick="deleteItem(${item.bus_id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Error fetching emergency maintenance data:", error);
            tableBody.innerHTML = "<tr><td colspan='8'>Error loading data</td></tr>";
        });
});

// Function to open the modal and populate it with the mechanic's name
function editItem(busId) {
    const mechanicName = prompt("Enter the mechanic's name to assign:");
    if (mechanicName) {
        fetch("Maintanence.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bus_id: busId, mechanic: mechanicName })
        })
            .then((response) => {
                if (!response.ok) throw new Error(`Server returned ${response.status}`);
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    document.getElementById(`mechanic-${busId}`).innerText = mechanicName;
                    document.getElementById(`status-${busId}`).innerText = "In Progress";
                    alert("Mechanic assigned successfully!");
                } else {
                    alert(data.message || "Failed to assign mechanic. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error assigning mechanic:", error);
                alert(`Error: ${error.message}`);
            });
    }
}

// Function to delete an item (remove entry from database)
function deleteItem(busId) {
    if (confirm("Are you sure you want to delete this item?")) {
        fetch("Maintanence.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bus_id: busId })
        })
            .then((response) => {
                if (!response.ok) throw new Error(`Server returned ${response.status}`);
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    alert("Bus deleted successfully!");
                    document.location.reload();
                } else {
                    alert(data.message || "Failed to delete bus. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error deleting bus:", error);
            });
    }
}
