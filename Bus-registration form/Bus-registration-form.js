function selectOption(td, url) {
  // Remove 'selected' class from all <td> elements
  const allCells = document.querySelectorAll("td");
  allCells.forEach(cell => cell.classList.remove("selected"));

  // Add 'selected' class to the clicked <td>
  td.classList.add("selected");

  // Navigate to the specified URL
  location.href = url;
}

// Function to call PHP backend for specific actions
async function callPhpEndpoint(action, data = {}) {
  const formData = new FormData();
  formData.append('action', action);
  for (const key in data) {
    formData.append(key, data[key]);
  }

  try {
    const response = await fetch('bus-registration-form.php', {
      method: 'POST',
      body: formData,
    });

    return await response.json();
  } catch (error) {
    console.error('Error connecting to backend:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
}

// Function to get the Bus count by Owner from the database
async function getBusCountByOwner(busownerId) {
  if (!busownerId) return 0;

  const result = await callPhpEndpoint('getBusCount', { busownerId });
  return result.bus_count || 0;
}

// Function to get the next Bus ID from the database
async function getNextBusId() {
  const result = await callPhpEndpoint('getNextBusId');
  return result.next_bus_id || 'BUS001';
}

// Function to register a bus in the database
async function registerBus(busData) {
  const result = await callPhpEndpoint('registerBus', busData);

  if (result.success) {
    alert('Bus registered successfully!');
  } else {
    alert('Failed to register the bus. ' + (result.error || ''));
  }
}

// Validate form fields before registering a bus
function validateBusForm(busData) {
  if (
    !busData.busId ||
    !busData.registrationNumber ||
    !busData.model ||
    !busData.capacity ||
    !busData.deviceId ||
    !busData.taxToken ||
    !busData.insurance ||
    !busData.fitness
  ) {
    alert('All fields are required.');
    return false;
  }
  if (isNaN(busData.capacity) || busData.capacity <= 0) {
    alert('Capacity must be a positive number.');
    return false;
  }
  return true;
}

// Event listener for when the Busowner ID changes
document.getElementById('busowner-id').addEventListener('change', async function () {
  const busownerId = this.value;

  // Query to get the number of buses for this busowner
  const busCount = await getBusCountByOwner(busownerId);

  // If Busowner has buses, display bus info and 'Add Bus' button
  if (busCount > 0) {
    document.getElementById('bus-owner-info').style.display = 'block';
    document.getElementById('bus-count').textContent = busCount;
    document.getElementById('add-bus-btn').style.display = 'inline-block';
  } else {
    document.getElementById('bus-owner-info').style.display = 'none';
    document.getElementById('add-bus-btn').style.display = 'none';
  }
});

// Event listener to display the extended form to add a new bus
document.getElementById('add-bus-btn').addEventListener('click', async function () {
  // Show the extended form
  document.getElementById('bus-info').style.display = 'block';

  // Fetch the next available Bus ID from the database
  const nextBusId = await getNextBusId();
  document.getElementById('bus-id').value = nextBusId;
});

// Event listener to handle the registration of a bus
document.getElementById('register-bus-btn').addEventListener('click', async function (e) {
  e.preventDefault();

  // Collect the form values
  const busData = {
    busId: document.getElementById('bus-id').value,
    busownerId: document.getElementById('busowner-id').value,
    model: document.getElementById('bus-model').value,
    capacity: document.getElementById('seats').value,
    registrationNumber: document.getElementById('registration-number').value,
    deviceId: document.getElementById('device-id').value,
    taxToken: document.getElementById('tax-token').value,
    insurance: document.getElementById('insurance-expiry').value,
    fitness: document.getElementById('fitness').value,
  };

  // Validate form data
  if (!validateBusForm(busData)) return;

  // Register the bus
  await registerBus(busData);

  // Refresh bus count
  const busownerId = document.getElementById('busowner-id').value;
  const busCount = await getBusCountByOwner(busownerId);
  document.getElementById('bus-count').textContent = busCount;
});
