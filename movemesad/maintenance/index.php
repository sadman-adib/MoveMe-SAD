<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bus Maintenance</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Bus Maintenance</h2>
        </div>

        <form onsubmit="handleSubmit(event)">
            <!-- Hidden fields for bus-id and driver-id -->
            <input type="hidden" name="bus_id" value="BUS12790">
            <input type="hidden" name="driver_id" value="DR12345">

            <div class="form-group">
                <label for="driver_name">Driver Name</label>
                <input type="text" name="driver_name" id="driver_name" value="Robiul Robin" readonly>
            </div>

            <div class="form-group">
                <label for="phone">Phone</label>
                <input type="text" name="phone" id="phone" value="+880123456789" readonly>
            </div>

            <!-- Hidden field for location to be auto-filled -->
            <input type="hidden" name="location" id="location">

            <!-- Hidden field for status -->
            <input type="hidden" name="status" value="emergency">

            <div class="form-group">
                <input type="submit" value="Emergency">
                <a href="http://localhost:3000/rev/index.php" class="button">Fare Collection</a>
            </div>
        </form>
    </div>

    <script src="script.js"></script>
</body>
</html>
