function selectOption(td, url) {
    // Remove 'selected' class from all <td> elements
    const allCells = document.querySelectorAll("td");
    allCells.forEach(cell => cell.classList.remove("selected"));

    // Add 'selected' class to the clicked <td>
    td.classList.add("selected");

    // Navigate to the specified URL
    location.href = url;
}

fetch('home.php')
            .then(response => response.json())
            .then(data => {
                const userNameLabel = document.getElementById('UserName');
                userNameLabel.textContent = data.name; // Update the UserName label
            })
            .catch(error => {
                console.error('Error fetching employee name:', error);
            });