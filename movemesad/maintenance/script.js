function generateRandomLocation() {
    const locations = [
        "Gulshan", "Badda", "Link Road", "Rampura", "Uttara", "Mohakhali",
        "Mirpur", "Khilgaon", "Basabo", "Khilkhet", "Nikunjo", "Baridhara"
    ];
    const randomIndex = Math.floor(Math.random() * locations.length);
    return locations[randomIndex];
}

function handleSubmit(event) {
    event.preventDefault(); // Prevent form submission

    const location = generateRandomLocation();
    document.getElementById('location').value = location;

    const form = event.target;
    const formData = new FormData(form);

    fetch('insert_maintenance.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(`Emergency request has been sent to Maintenance team from"${location}". Helpline :- +8801914236546`);
        form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to insert data.');
    });
}