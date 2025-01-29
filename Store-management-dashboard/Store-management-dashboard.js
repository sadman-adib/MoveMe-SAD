function selectOption(td, url) {
    // Remove 'selected' class from all <td> elements
    const allCells = document.querySelectorAll("td");
    allCells.forEach(cell => cell.classList.remove("selected"));

    // Add 'selected' class to the clicked <td>
    td.classList.add("selected");

    // Navigate to the specified URL
    location.href = url;
}

$(document).ready(function () {
    // Load the store data from PHP (AJAX Request)
    $.ajax({
        url: "Store-management-dashboard.php",  // The PHP file that fetches the store data
        type: "GET",
        success: function (response) {
            var stores = JSON.parse(response);  // Assuming the PHP returns JSON
            stores.forEach(function (store) {
                var statusClass = '';  // Initialize status class
                switch (store.status) {
                    case 'pending': statusClass = 'pending'; break;  // Apply pending class
                    case 'active': statusClass = 'active'; break;  // Apply active class
                    case 'inactive': statusClass = 'inactive'; break;  // Apply inactive class
                }
                $('#store-data').append(`
                    <tr data-store-id="${store.store_id}">
                        <td>${store.store_name}</td>
                        <td>${store.storeowner_name}</td>
                        <td>${store.location}</td>
                        <td>${store.sold_card}</td>
                        <td>${store.recharge_amount}</td>
                        <td class="status ${statusClass}" data-status="${store.status}">
                            ${store.status.charAt(0).toUpperCase() + store.status.slice(1)}
                        </td>
                        <td>
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>
                        </td>
                    </tr>
                `);
            });
        }
    });
    
    // Handle filter button clicks
    $(".filter-btn").on("click", function () {
        var status = $(this).data("status");
        if (status === "all") {
            $(".store-table tbody tr").show();
        } else {
            $(".store-table tbody tr").each(function () {
                var rowStatus = $(this).find(".status").data("status");
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
        var storeId = $(this).closest("tr").data("store-id");
        var currentStatus = $(this).closest("tr").find(".status").data("status");

        $("#store-id").val(storeId);
        $("#status-dropdown").val(currentStatus);
        $("#edit-modal").show();
    });

    // Handle save changes in the modal
    $("#save-changes").on("click", function () {
        var storeId = $("#store-id").val();
        var newStatus = $("#status-dropdown").val();

        $.ajax({
            url: "Store-management-dashboard.php",
            type: "POST",
            data: {
                store_id: storeId,
                status: newStatus
            },
            success: function (response) {
                var updatedStore = JSON.parse(response);  // Get the updated store data

                // Find the row with the updated store ID
                var row = $("tr[data-store-id='" + updatedStore.store_id + "']");
                var statusCell = row.find(".status");

                // Update the status text and class
                statusCell.text(updatedStore.status.charAt(0).toUpperCase() + updatedStore.status.slice(1));
                statusCell.data("status", updatedStore.status);  // Update the data-status attribute

                // Update the status class dynamically
                switch (updatedStore.status) {
                    case 'pending': 
                        statusCell.removeClass().addClass("status pending"); 
                        break;
                    case 'active': 
                        statusCell.removeClass().addClass("status active"); 
                        break;
                    case 'inactive': 
                        statusCell.removeClass().addClass("status inactive"); 
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
        var storeId = $(this).closest("tr").data("store-id");

        $.ajax({
            url: "Store-management-dashboard.php",
            type: "POST",
            data: {
                delete_store_id: storeId
            },
            success: function (response) {
                if (response === "delete_success") {
                    // Remove the deleted row from the table
                    $("tr[data-store-id='" + storeId + "']").remove();
                }
            },
            error: function () {
                alert("Error: Unable to delete the store.");
            }
        });
    });
});
