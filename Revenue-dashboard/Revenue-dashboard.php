<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "moveme2.0";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

class RevenueDataManager
{
    private $conn;

    public function __construct($host, $username, $password, $database)
    {
        $this->conn = new mysqli($host, $username, $password, $database);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    private function getDateFilter($interval)
    {
        switch ($interval) {
            case 'daily':
                return [
                    'group_by' => "DATE(start_datetime)",
                    'format' => "DATE_FORMAT(start_datetime, '%Y-%m-%d')"
                ];
            case 'weekly':
                return [
                    'group_by' => "
                        CONCAT(
                            YEAR(start_datetime), 
                            '-W', 
                            LPAD(WEEK(start_datetime, 1), 2, '0')
                        )",
                    'format' => "
                        CONCAT(
                            YEAR(start_datetime), 
                            '-W', 
                            LPAD(WEEK(start_datetime, 1), 2, '0')
                        )"
                ];
            case 'monthly':
                return [
                    'group_by' => "DATE_FORMAT(start_datetime, '%Y-%m')",
                    'format' => "DATE_FORMAT(start_datetime, '%b %Y')"
                ];
            case 'yearly':
                return [
                    'group_by' => "YEAR(start_datetime)",
                    'format' => "YEAR(start_datetime)"
                ];
        }
    }

    public function getBusWiseRevenue($interval)
    {
        $dateFilter = $this->getDateFilter($interval);
        $query = "SELECT 
                    bus_id, 
                    {$dateFilter['format']} AS period, 
                    ROUND(SUM(fare), 2) AS total_revenue 
                  FROM revenue_table 
                  GROUP BY bus_id, {$dateFilter['group_by']} 
                  ORDER BY period";
        $result = $this->conn->query($query);
        return $this->processQueryResults($result);
    }

    public function getPassengerWiseRevenue($interval)
    {
        $dateFilter = $this->getDateFilter($interval);
        $query = "SELECT 
                    rfid, 
                    {$dateFilter['format']} AS period, 
                    ROUND(SUM(fare), 2) AS total_revenue 
                  FROM revenue_table 
                  GROUP BY rfid, {$dateFilter['group_by']} 
                  ORDER BY period";
        $result = $this->conn->query($query);
        return $this->processQueryResults($result);
    }

    public function getBusOwnerWiseRevenue($interval)
    {
        $dateFilter = $this->getDateFilter($interval);
        $query = "SELECT 
                    busowner_id, 
                    {$dateFilter['format']} AS period, 
                    ROUND(SUM(fare * 0.7), 2) AS total_revenue 
                  FROM revenue_table 
                  GROUP BY busowner_id, {$dateFilter['group_by']} 
                  ORDER BY period";
        $result = $this->conn->query($query);
        return $this->processQueryResults($result);
    }

    public function getCompanyRevenue($interval)
    {
        $dateFilter = $this->getDateFilter($interval);
        $query = "SELECT 
                    {$dateFilter['format']} AS period, 
                    ROUND(SUM(fare * 0.3), 2) AS total_revenue 
                  FROM revenue_table 
                  GROUP BY {$dateFilter['group_by']} 
                  ORDER BY period";
        $result = $this->conn->query($query);
        return $this->processQueryResults($result);
    }

    private function processQueryResults($result)
    {
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        return $data;
    }
}

// AJAX Endpoint for fetching revenue data
if (isset($_GET['action'])) {
    $dataManager = new RevenueDataManager('localhost', 'root', '', 'moveme2.0');

    switch ($_GET['action']) {
        case 'bus_revenue':
            echo json_encode($dataManager->getBusWiseRevenue($_GET['interval']));
            break;
        case 'passenger_revenue':
            echo json_encode($dataManager->getPassengerWiseRevenue($_GET['interval']));
            break;
        case 'busowner_revenue':
            echo json_encode($dataManager->getBusOwnerWiseRevenue($_GET['interval']));
            break;
        case 'company_revenue':
            echo json_encode($dataManager->getCompanyRevenue($_GET['interval']));
            break;
    }
}
