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
    fetch('Passanger-revenue.php')
        .then(response => response.json())
        .then(data => {
            if (!data || Object.keys(data).length === 0) {
                console.error('No data received from the server.');
                return;
            }

            const tableBody = document.querySelector('#passengerRevenueTable');
            let totalRevenue = 0;
            let count = 0;

            // Loop through the passenger data
            Object.keys(data).forEach(passengerId => {
                const passengerData = data[passengerId];
                let passengerRevenue = 0;
                let highestFareValue = 0;
                let highestFareBusId = '';
                let tripCount = 0;

                const busRevenueMap = {};

                passengerData.forEach(row => {
                    const fare = parseFloat(row.fare);
                    const busId = row.bus_id;
                    passengerRevenue += fare;
                    tripCount++;

                    if (!busRevenueMap[busId]) {
                        busRevenueMap[busId] = 0;
                    }
                    busRevenueMap[busId] += fare;
                });

                Object.keys(busRevenueMap).forEach(busId => {
                    if (busRevenueMap[busId] > highestFareValue) {
                        highestFareValue = busRevenueMap[busId];
                        highestFareBusId = busId;
                    }
                });

                const avgFare = (passengerRevenue / tripCount).toFixed(2);
                totalRevenue += passengerRevenue;
                count += tripCount;

                // Ensure the date is correctly formatted
                const formattedDate = formatDate(passengerData[0].start_datetime);

                const tableRow = document.createElement('tr');
                const rowData = [
                    passengerId,
                    formattedDate,
                    passengerRevenue.toFixed(2),
                    tripCount,
                    avgFare,
                    highestFareBusId,
                    highestFareValue.toFixed(2)
                ];

                rowData.forEach(value => {
                    const cell = document.createElement('td');
                    cell.textContent = value;
                    tableRow.appendChild(cell);
                });

                tableBody.appendChild(tableRow);
            });

            // Chart rendering (as per your original code)
            const chartData = {
                labels: Object.keys(data),
                datasets: [{
                    label: 'Total Revenue by Passenger',
                    data: Object.values(data).map(passengerData => {
                        return passengerData.reduce((total, row) => total + parseFloat(row.fare), 0);
                    }),
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
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

// Function to format date
function formatDate(datetime) {
    const date = new Date(datetime);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };
    return date.toLocaleString('en-GB', options).replace(',', '');
}
