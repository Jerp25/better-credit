<?php

$userid = $_COOKIE['userid'];

$url = "https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/".$userid."/transactions";
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, [
  "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2OTYwMzIwMDAsImFwaV9zdWIiOiI5YmE0N2YyYzVlNjIyOGMwN2QwMmI3Zjk5YjliMTMwNjNiNzc3YTY1MTQ5NTM0NjYyMTk2MzU2MjEyZmQyMmJjMTcxNzIwMDAwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTcxNzIwMDAwMCwiZGV2ZWxvcGVyX2lkIjoiOWJhNDdmMmM1ZTYyMjhjMDdkMDJiN2Y5OWI5YjEzMDYzYjc3N2E2NTE0OTUzNDY2MjE5NjM1NjIxMmZkMjJiYyJ9.MAr1ux2bESy5j0lXIRKZBtOQaoEaM9bbbv-8alhyWaaKbPQs2b6vNAyAM8g3muPSamd4l8_E2PSZnJcnsiWSJ4Ooe8tXpzn6yD2gn_CRW6JZMiKHfzqK9QVfzITVg-xrvvoF896ZBuOHDO7fDdChArYDl0Gp5uULCuZrFOgPoYQ7hvLVRPgFPrGV2DxkmoyPA4TEAdKcdUQVxFZg31CbIYuP1sNgT6xBbNPMB9OvlIssLI_D3xfEmUkpEyq8U3pfstx9qK7S3lUViwrxGhZMEnCmmwC1yH68HggdLWogmuFbW1Ap2RlxI4q96Kp5O4UyJPrU1iKd-zMOL3aT7ML4iw",
  "Version: 1.0",
]);
$response = curl_exec($curl);
curl_close($curl);
echo $response . PHP_EOL;

?>