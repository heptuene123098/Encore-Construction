<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://encoreconstructionltd.org');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);
if (!is_array($data)) {
    $data = $_POST;
}

$name = isset($data['name']) ? trim($data['name']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$phone = isset($data['phone']) ? trim($data['phone']) : '';
$subject = isset($data['subject']) ? trim($data['subject']) : 'General';
$message = isset($data['message']) ? trim($data['message']) : '';

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo json_encode(array('success' => false, 'message' => 'Missing required fields.'));
    exit;
}

$to = 'info@encoreconstructionltd.org';
$subjectLine = 'New enquiry: ' . ($subject !== '' ? $subject : 'General');
$body = "Name: {$name}\nEmail: {$email}\nPhone: " . ($phone !== '' ? $phone : 'N/A') . "\nSubject: {$subject}\n\nMessage:\n{$message}";

$headers = array();
$headers[] = 'From: info@encoreconstructionltd.org';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

$sent = @mail($to, $subjectLine, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(array('success' => true, 'message' => 'Enquiry sent successfully.'));
} else {
    http_response_code(500);
    echo json_encode(array('success' => false, 'message' => 'Mail delivery failed.'));
}
