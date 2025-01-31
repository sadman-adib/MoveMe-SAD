<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fare Collection</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>RFID READER</h1>
        <form id="passengerForm">
            <div class="form-group">
                <label for="passengerId">Passenger ID:</label>
                <input type="text" id="passengerId" name="passengerId" placeholder="Enter Passenger ID" maxlength="10">
            </div>
            <div class="form-group">
                <label for="busOwnerId">Bus Owner ID:</label>
                <input type="text" id="busOwnerId" name="busOwnerId" class="readonly-field" value="bo12345" readonly>
            </div>
            <div class="form-group">
                <label for="busId">Bus ID:</label>
                <input type="text" id="busId" name="busId" class="readonly-field" value="b22312" readonly>
            </div>
            <div class="form-group">
                <label for="startLocation">Start Location:</label>
                <input type="text" id="startLocation" name="startLocation" class="readonly-field" readonly>
            </div>
            <div class="form-group">
                <label for="endLocation">End Location:</label>
                <input type="text" id="endLocation" name="endLocation" class="readonly-field" readonly>
            </div>
            <div class="form-group">
                <label for="startDateTime">Start DateTime:</label>
                <input type="datetime-local" id="startDateTime" name="startDateTime" class="readonly-field" readonly>
            </div>
            <div class="form-group">
                <label for="endDateTime">End DateTime:</label>
                <input type="datetime-local" id="endDateTime" name="endDateTime" class="readonly-field" readonly>
            </div>
            <div class="form-group">
                <label for="fare">Fare:</label>
                <input type="text" id="fare" name="fare" class="readonly-field" readonly>
            </div>
            <div class="form-group">
                <label for="availableSeats">Available Seats:</label>
                <input type="text" id="availableSeats" name="availableSeats" class="readonly-field" value="50" readonly>
                <a href="http://localhost:3000/maintenance/index.php" class="button">Maintenance</a>
            </div>
        </form>
    </div>
    <script src="script.js"></script>
</body>
</html>
