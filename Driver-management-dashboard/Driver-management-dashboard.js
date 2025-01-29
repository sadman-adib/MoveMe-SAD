// Function to check and update driver status dynamically
function checkDriverStatus(driverId) {
    $.ajax({
        url: "Driver-management-dashboard.php", // Backend endpoint for driver status
        type: "GET",
        data: {
            driver_id: driverId
        },
        success: function (response) {
            var driver = response[0]; // Assuming backend returns an array of drivers with one driver object
            
            // Find the row with the specific driver ID
            var row = $("tr[data-driver-id='" + driver.driver_id + "']");
            var statusCell = row.find(".status");

            // Update the status text and class dynamically
            statusCell.text(driver.status.charAt(0).toUpperCase() + driver.status.slice(1)); // Capitalize
            statusCell.data("status", driver.status); // Update the data-status attribute

            // Update the status class based on the new status
            switch (driver.status) {
                case 'on-service':
                    statusCell.removeClass().addClass("status on-service");
                    break;
                case 'available':
                    statusCell.removeClass().addClass("status available");
                    break;
                case 'inactive':
                    statusCell.removeClass().addClass("status inactive");
                    break;
            }
        },
        error: function () {
            alert("Error: Unable to fetch the driver's status.");
        }
    });
}

// Document ready function
$(document).ready(function () {
    // Load the driver data from PHP (AJAX Request)
    $.ajax({
        url: "Driver-management-dashboard.php",
        type: "GET",
        success: function (response) {
            console.log(response); // Log the response to check if the name and license_number are present
    
            response.forEach(function (driver) {
                var statusClass = ''; // Initialize status class
                switch (driver.status) {
                    case 'on-service': statusClass = 'on-service'; break;
                    case 'available': statusClass = 'available'; break;
                    case 'inactive': statusClass = 'inactive'; break;
                }
    
                $('#driver-data').append(`
                    <tr data-driver-id="${driver.driver_id}">
                        <td>${driver.driver_id}</td>
                        <td>${driver.driver_name || 'N/A'}</td> <!-- Default to 'N/A' if name is missing -->
                        <td>${driver.phone || 'N/A'}</td> <!-- Default to 'N/A' if phone is missing -->
                        <td>${driver.license || 'N/A'}</td> <!-- Default to 'N/A' if license_number is missing -->
                        <td class="status ${statusClass}" data-status="${driver.status}">
                            ${driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                        </td>
                        <td>${driver.bus_id || 'N/A'}</td> <!-- Assuming there's a bus_id or 'N/A' -->
                        <td>
                            <button class="btn edit-btn">Edit</button>
                            <button class="btn delete-btn">Delete</button>
                        </td>
                    </tr>
                `);
            });
        }
    });

    // Handle filter button clicks
    $(".filter-btn").on("click", function () {
        var status = $(this).data("status").toLowerCase();  // Normalize to lowercase for comparison
        console.log("Filtering by status:", status);  // Log the selected filter

        if (status === "all") {
            $(".driver-table tbody tr").show();
        } else {
            $(".driver-table tbody tr").each(function () {
                var rowStatus = $(this).find(".status").data("status").toLowerCase();  // Normalize to lowercase
                console.log("Row status:", rowStatus);  // Log the row status for debugging

                if (rowStatus === status) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    });

    // Handle edit button clicks
    $(document).on("click", ".edit-btn", function () {
        var driverId = $(this).closest("tr").data("driver-id");
        var currentStatus = $(this).closest("tr").find(".status").data("status");

        $("#driver-id").val(driverId);
        $("#status-dropdown").val(currentStatus);
        $("#edit-modal").show();
    });

    // Handle save changes in the modal
    $("#save-changes").on("click", function () {
        var driverId = $("#driver-id").val();
        var newStatus = $("#status-dropdown").val();

        $.ajax({
            url: "Driver-management-dashboard.php",
            type: "POST",
            data: {
                driver_id: driverId,
                status: newStatus
            },
            success: function (response) {
                var updatedDriver = response; // Get the updated driver data

                // Find the row with the updated driver ID
                var row = $("tr[data-driver-id='" + updatedDriver.driver_id + "']");
                var statusCell = row.find(".status");

                // Update the status text and class
                statusCell.text(updatedDriver.status.charAt(0).toUpperCase() + updatedDriver.status.slice(1));
                statusCell.data("status", updatedDriver.status); // Update the data-status attribute

                // Update the status class dynamically
                switch (updatedDriver.status) {
                    case 'on-service': 
                        statusCell.removeClass().addClass("status on-service"); 
                        break;
                    case 'available': 
                        statusCell.removeClass().addClass("status available"); 
                        break;
                    case 'inactive': 
                        statusCell.removeClass().addClass("status inactive"); 
                        break;
                    case 'ongoing': 
                        statusCell.removeClass().addClass("status ongoing"); 
                        break;
                }

            },
            error: function () {
                alert("Error: Unable to save the changes.");
            }
        });

        $("#edit-modal").hide();
    });

    // Close the modal when the close button is clicked
    $(".close").on("click", function () {
        $("#edit-modal").hide();
    });

    // Handle delete button clicks
    $(document).on("click", ".delete-btn", function () {
        var driverId = $(this).closest("tr").data("driver-id");

        $.ajax({
            url: "Driver-management-dashboard.php",
            type: "POST",
            data: {
                delete_driver_id: driverId
            },
            success: function (response) {
                if (response === "delete_success") {
                    // Remove the deleted row from the table
                    $("tr[data-driver-id='" + driverId + "']").remove();
                }
            },
            error: function () {
                alert("Error: Unable to delete the driver.");
            }
        });
    });

    // Auto-refresh statuses periodically (every 10 seconds)
    setInterval(function () {
        $("tr[data-driver-id]").each(function () {
            var driverId = $(this).data("driver-id");
            checkDriverStatus(driverId); // Refresh status for each driver
        });
    }, 10000); // Refresh every 10 seconds
});
