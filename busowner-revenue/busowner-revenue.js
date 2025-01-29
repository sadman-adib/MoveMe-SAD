function selectOption(td, url) {
    // Remove 'selected' class from all <td> elements
    const allCells = document.querySelectorAll("td");
    allCells.forEach(cell => cell.classList.remove("selected"));

    // Add 'selected' class to the clicked <td>
    td.classList.add("selected");

    // Navigate to the specified URL
    location.href = url;
}


window.onload = function() {
    // Fetch data from the PHP script
    fetch('busowner-revenue.php')
        .then(response => response.json())
        .then(data => {
            // Get the table body element
            const tableBody = document.querySelector('#busOwnerRevenueTable');
            let totalRevenue = 0;
            let count = 0;

            // Loop through the bus owner data
            Object.keys(data).forEach(ownerId => {
                const ownerData = data[ownerId];
                let ownerRevenue = 0;
                let highestFareValue = 0; // Variable to store the highest total fare collection
                let highestFareBusId = '';
                let tripCount = 0;

                // Loop through each bus under the bus owner
                const busRevenueMap = {}; // Object to map each bus to its total revenue

                ownerData.forEach(row => {
                    const fare = parseFloat(row.fare);
                    const busId = row.bus_id;
                    ownerRevenue += fare;
                    tripCount++;

                    // Sum the fares for each bus to calculate total revenue per bus
                    if (!busRevenueMap[busId]) {
                        busRevenueMap[busId] = 0;
                    }
                    busRevenueMap[busId] += fare;
                });

                // Find the bus with the highest total revenue
                Object.keys(busRevenueMap).forEach(busId => {
                    if (busRevenueMap[busId] > highestFareValue) {
                        highestFareValue = busRevenueMap[busId];
                        highestFareBusId = busId;
                    }
                });

                // Calculate average fare for this bus owner
                const avgFare = (ownerRevenue / tripCount).toFixed(2);
                totalRevenue += ownerRevenue;
                count += tripCount;

                // Format the date
                const formattedDate = formatDate(ownerData[0].start_datetime); // Assuming the first trip date

                // Create table row for each bus owner
                const tableRow = document.createElement('tr');
                const rowData = [
                    ownerId,
                    formattedDate,
                    ownerRevenue.toFixed(2),
                    tripCount,
                    avgFare,
                    highestFareBusId,
                    highestFareValue.toFixed(2) // Highest fare value is now the total fare for the bus with the highest revenue
                ];

                // Create and append each cell for the row
                rowData.forEach(value => {
                    const cell = document.createElement('td');
                    cell.textContent = value;
                    tableRow.appendChild(cell);
                });

                // Append the row to the table
                tableBody.appendChild(tableRow);
            });

            // Initialize and render the chart for revenue overview
            const chartData = {
                labels: Object.keys(data),
                datasets: [{
                    label: 'Total Revenue by Owner',
                    data: Object.values(data).map(ownerData => {
                        return ownerData.reduce((total, row) => total + parseFloat(row.fare), 0);
                    }),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            };

            const ctx = document.getElementById('revenueChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            enabled: true,
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
};

// Function to format date into "1 Jan 2024"
function formatDate(datetime) {
    const date = new Date(datetime);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };
    return date.toLocaleString('en-GB', options).replace(',', '');
}
