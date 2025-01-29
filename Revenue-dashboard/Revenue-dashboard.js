function selectOption(td, url) {
    // Remove 'selected' class from all <td> elements
    const allCells = document.querySelectorAll("td");
    allCells.forEach(cell => cell.classList.remove("selected"));

    // Add 'selected' class to the clicked <td>
    td.classList.add("selected");

    // Navigate to the specified URL
    location.href = url;
}

document.addEventListener('DOMContentLoaded', function() {
  const charts = {
      chart1: { canvas: document.getElementById('chart1'), instance: null },
      chart2: { canvas: document.getElementById('chart2'), instance: null },
      chart3: { canvas: document.getElementById('chart3'), instance: null },
      chart4: { canvas: document.getElementById('chart4'), instance: null }
  };

  const chartConfigs = {
      chart1: { 
          title: 'Bus-wise Revenue', 
          endpoint: 'bus_revenue' 
      },
      chart2: { 
          title: 'Passenger-wise Revenue', 
          endpoint: 'passenger_revenue' 
      },
      chart3: { 
          title: 'Bus Owner-wise Revenue', 
          endpoint: 'busowner_revenue' 
      },
      chart4: { 
          title: 'Company Revenue', 
          endpoint: 'company_revenue' 
      }
  };

  function fetchRevenueData(chartId, interval) {
    console.log(`Fetching data for ${chartId} with interval ${interval}`);
    fetch(`Revenue-dashboard.php?action=${chartConfigs[chartId].endpoint}&interval=${interval}`)
        .then(response => {
            console.log('Response:', response);
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            renderChart(chartId, data, interval);
        })
        .catch(error => console.error('Error:', error));
}

function renderChart(chartId, data, interval) {
  const ctx = charts[chartId].canvas;
  
  // Destroy existing chart if it exists
  if (charts[chartId].instance) {
      charts[chartId].instance.destroy();
  }

  // Aggregate data if too many periods
  const MAX_PERIODS = 20;
  if (data.length > MAX_PERIODS) {
      const aggregatedData = aggregateData(data, MAX_PERIODS);
      data = aggregatedData;
  }

  const chartData = {
      labels: data.map(item => item.period),
      datasets: [{
          label: chartConfigs[chartId].title,
          data: data.map(item => parseFloat(item.total_revenue)),
          backgroundColor: 'rgba(255, 217, 0, 0.4)',
          borderColor: 'rgba(255, 217, 0, 1)',
          borderWidth: 1
      }]
  };

  charts[chartId].instance = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true,
                  title: {
                      display: true,
                      text: 'Revenue (TAKA)'
                  }
              },
              x: {
                  title: {
                      display: true,
                      text: interval.charAt(0).toUpperCase() + interval.slice(1)
                  }
              }
          }
      }
  });
}

function aggregateData(data, maxPeriods) {
  if (data.length <= maxPeriods) return data;

  const groupSize = Math.ceil(data.length / maxPeriods);
  const aggregated = [];

  for (let i = 0; i < data.length; i += groupSize) {
      const group = data.slice(i, i + groupSize);
      const aggregatedItem = {
          period: group[0].period + ' - ' + group[group.length - 1].period,
          total_revenue: group.reduce((sum, item) => sum + parseFloat(item.total_revenue), 0) / group.length
      };
      aggregated.push(aggregatedItem);
  }

  return aggregated;
}

  // Attach event listeners to filter buttons
  function setupFilterButtons() {
      document.querySelectorAll('.filters button').forEach(button => {
          button.addEventListener('click', function() {
              const interval = this.textContent.toLowerCase();
              const chartId = this.closest('.graph').querySelector('canvas').id;
              fetchRevenueData(chartId, interval);
          });
      });
  }

  // Initialize charts
  function initCharts() {
      Object.keys(charts).forEach(chartId => {
          fetchRevenueData(chartId, 'monthly');  // Default to monthly view
      });
      setupFilterButtons();
  }

  initCharts();
});