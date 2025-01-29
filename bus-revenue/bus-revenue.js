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
    fetch('bus-revenue.php')
        .then(response => response.json())
        .then(data => {
            // Get the table body element
            const tableBody = document.querySelector('#busRevenueTable');
            let totalRevenue = 0;
            let totalFare = 0;
            let count = 0;

            // Create an object to accumulate revenue data by bus_id
            const busRevenueData = {};

            // Loop through the data and group by bus_id
            data.forEach(row => {
                const busId = row.bus_id;

                // Initialize the bus data if not already in the object
                if (!busRevenueData[busId]) {
                    busRevenueData[busId] = {
                        totalFare: 0,
                        tripCount: 0,
                        startLocation: row.start_location,
                        endLocation: row.end_location,
                        startDatetime: row.start_datetime,
                        endDatetime: row.end_datetime
                    };
                }

                // Accumulate fare and trip count for the bus
                busRevenueData[busId].totalFare += parseFloat(row.fare);
                busRevenueData[busId].tripCount += 1;
            });

            // Function to format date into "1 Jan 2024, 8:30"
            function formatDate(datetime) {
                const date = new Date(datetime);
                const options = {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                };
                return date.toLocaleString('en-GB', options).replace(',', '');
            }

            // Loop through the bus revenue data and populate the table
            Object.keys(busRevenueData).forEach(busId => {
                const busData = busRevenueData[busId];
                const tableRow = document.createElement('tr');

                // Format the start and end datetime
                const formattedStartDatetime = formatDate(busData.startDatetime);
                const formattedEndDatetime = formatDate(busData.endDatetime);

                // Populate each cell with bus-specific data
                const avgFare = (busData.totalFare / busData.tripCount).toFixed(2);
                totalRevenue += busData.totalFare;
                totalFare += busData.totalFare;
                count += busData.tripCount;

                const rowData = [
                    busId,
                    busData.totalFare.toFixed(2),
                    busData.tripCount,
                    avgFare,
                    busData.startLocation,
                    busData.endLocation,
                    formattedStartDatetime,
                    formattedEndDatetime
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
                labels: Object.keys(busRevenueData),
                datasets: [{
                    label: 'Total Revenue by Bus',
                    data: Object.values(busRevenueData).map(data => data.totalFare),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            };

            const ctx = document.getElementById('revenueChart').getContext('2d');
            new Chart(ctx, {
                type: 'line', // Chart type remains unchanged
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
