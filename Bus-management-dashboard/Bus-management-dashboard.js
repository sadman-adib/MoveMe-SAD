function selectOption(td, url) {
    // Remove 'selected' class from all <td> elements
    const allCells = document.querySelectorAll("td");
    allCells.forEach(cell => cell.classList.remove("selected"));

    // Add 'selected' class to the clicked <td>
    td.classList.add("selected");

    // Navigate to the specified URL
    location.href = url;
}
// Wait for the DOM to fully load
$(document).ready(function () {
    // Fetch bus data and populate the table
    $.ajax({
        url: 'Bus-management-dashboard.php', // PHP file to fetch bus data
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            let rows = '';
            data.forEach(function (row) {
                rows += `
                    <tr>
                        <td>${row.bus_id}</td>
                        <td>${row.model}</td>
                        <td>${row.capacity}</td>
                        <td>${row.assigned_route}</td>
                        <td class="status">${row.status}</td>
                        <td>${row.driver_name}</td>
                        <td>
                            <button class="btn edit-btn" data-id="${row.bus_id}">Edit</button>
                            <button class="btn delete-btn" data-id="${row.bus_id}">Delete</button>
                        </td>
                    </tr>`;
            });
            $('#bus-data').html(rows);

            // Apply status-based styles
            $('#bus-data tr').each(function () {
                const statusCell = $(this).find('.status');
                const status = statusCell.text().trim().toLowerCase();

                // Remove any pre-existing status classes
                statusCell.removeClass('available maintenance in-progress');

                // Add the appropriate class based on the status
                if (status === "maintenance") {
                    statusCell.addClass("maintenance");
                } else if (status === "available") {
                    statusCell.addClass("available");
                } else if (status === "in-progress") {
                    statusCell.addClass("in-progress");
                }
            });
        },
        error: function (xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });

    // Fetch available drivers and populate the driver dropdown
    $.ajax({
        url: 'Bus-management-dashboard.php', // PHP file to fetch drivers
        method: 'GET',
        dataType: 'json',
        success: function (drivers) {
            $('#driver-dropdown').empty().append('<option value="">Select Driver</option>');
            drivers.forEach(function (driver) {
                if (driver && driver.driver_name) {
                    $('#driver-dropdown').append(`<option value="${driver.driver_name}">${driver.driver_name}</option>`);
                }
            });
        },
        error: function (xhr, status, error) {
            console.error('Error fetching available drivers:', error);
        }
    });

    // Open the edit modal on "Edit" button click
    $(document).on('click', '.edit-btn', function () {
        const busId = $(this).data('id');
        openEditModal(busId);
    });

    // Close the edit modal
    $('.close').on('click', function () {
        $('#edit-modal').hide();
    });

    // Save changes on "Save Changes" button click
    $('#save-changes').on('click', function () {
        const busId = $('#bus-id').val();
        const status = $('#status-dropdown').val();
        const driver = $('#driver-dropdown').val();
        const route = $('#route-dropdown').val();

        $.ajax({
            url: 'Bus-management-dashboard.php', // PHP file to handle updates
            method: 'POST',
            data: {
                bus_id: busId,
                status: status,
                driver: driver,
                route: route
            },
            success: function () {
                alert('Bus info updated successfully!');
                $('#edit-modal').hide();
                location.reload();
            },
            error: function (xhr, status, error) {
                console.error('Error updating bus info:', error);
            }
        });
    });

    // Filter items by status
    const filterButtons = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".item");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("data-status");
            filterItems(status);
        });
    });

    function filterItems(status) {
        items.forEach((item) => {
            const itemStatus = item.getAttribute("data-status");
            if (status === "all" || itemStatus === status) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    }
});

// Function to open the edit modal and load bus data
function openEditModal(busId) {
    $.ajax({
        url: 'Bus-management-dashboard.php', // PHP file to fetch specific bus info
        method: 'GET',
        data: { bus_id: busId },
        dataType: 'json',
        success: function (data) {
            if (data) {
                $('#bus-id').val(data.bus_id);
                $('#status-dropdown').val(data.status);
                $('#driver-dropdown').val(data.driver_name);
                $('#route-dropdown').val(data.assigned_route);
                $('#edit-modal').show();
            } else {
                console.log('No data returned for bus');
            }
        },
        error: function (xhr, status, error) {
            console.error('Error fetching bus info:', error);
        }
    });
}
