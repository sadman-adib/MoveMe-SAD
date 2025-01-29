// Get references to modal and buttons
const editModal = document.getElementById("editModal");
const closeModal = document.querySelector(".close");
const saveChangesBtn = document.getElementById("saveChanges");

// Function to show the edit modal with pre-filled data
function openEditModal(busOwnerID, busOwnerName, phone, email, status, quantity) {
    console.log("Opening edit modal with data:", busOwnerID, busOwnerName, status, quantity);  // Debug log

    // Set values in modal
    document.getElementById("status").value = status;
    document.getElementById("quantity").value = quantity;

    // Store bus owner ID for later use
    editModal.setAttribute("data-id", busOwnerID);
    editModal.style.display = "block";  // Show modal
}

// Get the status tag HTML based on the status value
function getStatusTag(status) {
    let statusTag = '';
    switch (status) {
        case 'active':
            statusTag = `<span class="status active">Active</span>`;
            break;
        case 'in-progress':
            statusTag = `<span class="status in-progress">In Progress</span>`;
            break;
        case 'suspended':
            statusTag = `<span class="status suspended">Suspended</span>`;
            break;
        default:
            statusTag = `<span class="status">N/A</span>`;
    }
    return statusTag;
}

// Close the modal
closeModal.onclick = () => {
    editModal.style.display = "none";  // Hide modal when the close button is clicked
};

// Save changes when the button is clicked
saveChangesBtn.onclick = () => {
    const busOwnerID = editModal.getAttribute("data-id");
    const status = document.getElementById("status").value;
    const quantity = document.getElementById("quantity").value;

    // Debug log to check values before sending
    console.log("Saving changes for Bus Owner ID:", busOwnerID, "Status:", status, "Quantity:", quantity);

    // Send the updated data to the server using AJAX
    $.ajax({
        url: "Busowner-management-dashboard.php",
        type: "POST",
        data: {
            id: busOwnerID,
            status: status,
            quantity: quantity
        },
        success: function(response) {
            alert("Changes saved successfully!");
            
            // Find the row for this bus owner and update the status and quantity in the table
            const row = document.querySelector(`.busowner-table tbody tr[data-id="${busOwnerID}"]`);
            if (row) {
                // Update the status and quantity directly in the table
                row.querySelector(".status-cell").innerHTML = getStatusTag(status); // Update the status cell
                row.querySelector(".quantity-cell").textContent = quantity; // Update the quantity cell
            }

            editModal.style.display = "none"; // Close the modal
        },
        error: function() {
            alert("Error updating the data.");
        }
    });
};

// Delete bus owner
function deleteBusOwner(busOwnerID) {
    if (confirm("Are you sure you want to delete this bus owner?")) {
        $.ajax({
            url: "Busowner-management-dashboard.php",
            type: "POST",
            data: { id: busOwnerID },
            success: function(response) {
                alert("Bus owner deleted successfully.");
                
                // Find the row for this bus owner and remove it from the table
                const row = document.querySelector(`.busowner-table tbody tr[data-id="${busOwnerID}"]`);
                if (row) {
                    row.remove(); // Remove the row from the table
                }
            },
            error: function() {
                alert("Error deleting the bus owner.");
            }
        });
    }
}

// Function to populate the table with bus owner data
function populateBusOwnerTable() {
    $.ajax({
        url: "Busowner-management-dashboard.php",
        type: "GET",
        success: function(data) {
            console.log("Data received from server:", data);

            const busOwnerTableBody = document.querySelector(".busowner-table tbody");
            busOwnerTableBody.innerHTML = ""; // Clear the table body

            // Parse the JSON response from the PHP file
            const busOwners = JSON.parse(data);

            if (busOwners.length > 0) {
                busOwners.forEach(owner => {
                    const row = document.createElement("tr");
                    row.setAttribute("data-id", owner.busowner_id);  // Add data-id to each row

                    console.log("Bus Owner:", owner);

                    row.innerHTML = `
                        <td>${owner.busowner_id || 'N/A'}</td>
                        <td>${owner.busowner_name || 'N/A'}</td>
                        <td>${owner.phone || 'N/A'}</td>
                        <td>${owner.email || 'N/A'}</td>
                        <td class="status-cell">${getStatusTag(owner.status)}</td>
                        <td class="quantity-cell">${owner.quantity || 'N/A'}</td>
                        <td>
                            <button class="btn edit-btn" data-id="${owner.busowner_id}" data-name="${owner.busowner_name}" data-phone="${owner.phone}" data-email="${owner.email}" data-status="${owner.status}" data-quantity="${owner.quantity}">Edit</button>
                            <button class="btn delete-btn" data-id="${owner.busowner_id}">Delete</button>
                        </td>
                    `;
                    busOwnerTableBody.appendChild(row);
                });

                // Attach event listeners to dynamically created buttons
                document.querySelectorAll('.edit-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const busOwnerID = this.getAttribute('data-id');
                        const busOwnerName = this.getAttribute('data-name');
                        const phone = this.getAttribute('data-phone');
                        const email = this.getAttribute('data-email');
                        const status = this.getAttribute('data-status');
                        const quantity = this.getAttribute('data-quantity');
                        
                        openEditModal(busOwnerID, busOwnerName, phone, email, status, quantity);
                    });
                });

                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const busOwnerID = this.getAttribute('data-id');
                        deleteBusOwner(busOwnerID);
                    });
                });
            } else {
                console.log("No bus owner data found.");
            }
        },
        error: function() {
            alert("Error loading bus owner data.");
        }
    });
}

// Call the function to populate the table when the page loads
window.onload = populateBusOwnerTable;
