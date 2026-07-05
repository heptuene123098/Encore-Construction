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

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$subject = trim($data['subject'] ?? 'General');
$message = trim($data['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
    exit;
}

$from = 'info@encoreconstructionltd.org';
$to = 'info@encoreconstructionltd.org';
$username = 'info@encoreconstructionltd.org';
$password = 'ogll-eimp-eu4n-uuro';
$host = 'smtp.hostinger.com';
$port = 465;

$phoneText = $phone !== '' ? $phone : 'N/A';

$htmlBody = '<h3>New enquiry received</h3>'
    . '<p><strong>Name:</strong> ' . htmlspecialchars($name) . '</p>'
    . '<p><strong>Email:</strong> ' . htmlspecialchars($email) . '</p>'
    . '<p><strong>Phone:</strong> ' . htmlspecialchars($phoneText) . '</p>'
    . '<p><strong>Subject:</strong> ' . htmlspecialchars($subject) . '</p>'
    . '<p><strong>Message:</strong></p>'
    . '<p>' . nl2br(htmlspecialchars($message)) . '</p>';

$boundary = md5(uniqid(time()));
$rawMessage = "From: {$from}\r\n"
    . "To: {$to}\r\n"
    . "Reply-To: {$email}\r\n"
    . "Subject: New enquiry: {$subject}\r\n"
    . "MIME-Version: 1.0\r\n"
    . "Content-Type: multipart/alternative; boundary=\"{$boundary}\"\r\n"
    . "\r\n"
    . "--{$boundary}\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\n"
    . "Content-Transfer-Encoding: 7bit\r\n"
    . "\r\n"
    . "Name: {$name}\r\nEmail: {$email}\r\nPhone: {$phoneText}\r\nSubject: {$subject}\r\n\r\nMessage:\r\n{$message}\r\n"
    . "\r\n--{$boundary}\r\n"
    . "Content-Type: text/html; charset=UTF-8\r\n"
    . "Content-Transfer-Encoding: 7bit\r\n"
    . "\r\n"
    . $htmlBody . "\r\n"
    . "\r\n--{$boundary}--\r\n";

$errno = 0;
$errstr = '';
$socket = stream_socket_client('ssl://' . $host . ':' . $port, $errno, $errstr, 20);
if (!$socket) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Unable to connect to SMTP server.', 'error' => $errstr]);
    exit;
}

function readResponse($socket) {
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (substr($line, 3, 1) === ' ') {
            break;
        }
    }
    return trim($response);
}

function writeCommand($socket, $command) {
    fwrite($socket, $command . "\r\n");
}

writeCommand($socket, 'EHLO localhost');
$resp = readResponse($socket);
if (strpos($resp, '250') !== 0) {
    fclose($socket);
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'SMTP EHLO failed.', 'error' => $resp]);
    exit;
}

writeCommand($socket, 'AUTH LOGIN');
$resp = readResponse($socket);
if (strpos($resp, '334') !== 0) {
    fclose($socket);
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'SMTP AUTH LOGIN not accepted.', 'error' => $resp]);
    exit;
}

writeCommand($socket, base64_encode($username));
$resp = readResponse($socket);
if (strpos($resp, '334') !== 0) {
    fclose($socket);
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'SMTP username rejected.', 'error' => $resp]);
    exit;
}

writeCommand($socket, base64_encode($password));
$resp = readResponse($socket);
if (strpos($resp, '235') !== 0) {
    fclose($socket);
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'SMTP password rejected.', 'error' => $resp]);
    exit;
}

writeCommand($socket, 'MAIL FROM:<'.$from.'>');
$resp = readResponse($socket);
if (strpos($resp, '250') !== 0) {
    fclose($socket);
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'SMTP MAIL FROM failed.', 'error' => $resp]);
    exit;
}

writeCommand($socket, 'RCPT TO:<'.$to.'>');
$resp = readResponse($socket);
if (strpos($resp, '250') !== 0 && strpos($resp, '251') !== 0) {
    fclose($socket);
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'SMTP RCPT TO failed.', 'error' => $resp]);
    exit;
}

writeCommand($socket, 'DATA');
$resp = readResponse($socket);
if (strpos($resp, '354') !== 0) {
    fclose($socket);
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'SMTP DATA failed.', 'error' => $resp]);
    exit;
}

fwrite($socket, $rawMessage . "\r\n.\r\n");
$resp = readResponse($socket);
if (strpos($resp, '250') !== 0) {
    fclose($socket);
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'SMTP message submission failed.', 'error' => $resp]);
    exit;
}

writeCommand($socket, 'QUIT');
readResponse($socket);
fclose($socket);

echo json_encode(['success' => true, 'message' => 'Enquiry sent successfully.']);
