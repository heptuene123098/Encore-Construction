<?php
header('Content-Type: application/json');

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

$body = "Name: {$name}\nEmail: {$email}\nPhone: {$phone}\nSubject: {$subject}\n\nMessage:\n{$message}";
$htmlBody = '<h3>New enquiry received</h3>'
    . '<p><strong>Name:</strong> ' . htmlspecialchars($name) . '</p>'
    . '<p><strong>Email:</strong> ' . htmlspecialchars($email) . '</p>'
    . '<p><strong>Phone:</strong> ' . htmlspecialchars($phone ?: 'N/A') . '</p>'
    . '<p><strong>Subject:</strong> ' . htmlspecialchars($subject) . '</p>'
    . '<p><strong>Message:</strong></p>'
    . '<p>' . nl2br(htmlspecialchars($message)) . '</p>';

try {
    $socket = stream_socket_client('ssl://' . $host . ':' . $port, $errno, $errstr, 20);
    if (!$socket) {
        throw new Exception('Unable to connect to SMTP server.');
    }

    $read = function () use ($socket) {
        $response = '';
        while (($line = fgets($socket, 515)) !== false) {
            $response .= $line;
            if (substr($line, 3, 1) === ' ') {
                break;
            }
        }
        return trim($response);
    };

    $write = function ($command) use ($socket) {
        fwrite($socket, $command . "\r\n");
    };

    $write('EHLO localhost');
    $read();

    $write('AUTH LOGIN');
    if (strpos($read(), '334') !== 0) {
        throw new Exception('SMTP AUTH LOGIN not accepted.');
    }

    $write(base64_encode($username));
    if (strpos($read(), '334') !== 0) {
        throw new Exception('SMTP username rejected.');
    }

    $write(base64_encode($password));
    if (strpos($read(), '235') !== 0) {
        throw new Exception('SMTP password rejected.');
    }

    $write('MAIL FROM:<' . $from . '>');
    if (strpos($read(), '250') !== 0) {
        throw new Exception('MAIL FROM failed.');
    }

    $write('RCPT TO:<' . $to . '>');
    if (strpos($read(), '250') !== 0 && strpos($read(), '251') !== 0) {
        throw new Exception('RCPT TO failed.');
    }

    $write('DATA');
    if (strpos($read(), '354') !== 0) {
        throw new Exception('SMTP DATA command failed.');
    }

    $messageData = "From: {$from}\r\n"
        . "To: {$to}\r\n"
        . "Reply-To: {$email}\r\n"
        . "Subject: New enquiry: {$subject}\r\n"
        . "MIME-Version: 1.0\r\n"
        . "Content-Type: text/html; charset=UTF-8\r\n"
        . "\r\n"
        . $htmlBody
        . "\r\n.\r\n";

    fwrite($socket, $messageData);
    if (strpos($read(), '250') !== 0) {
        throw new Exception('SMTP message submission failed.');
    }

    $write('QUIT');
    fclose($socket);

    echo json_encode(['success' => true, 'message' => 'Enquiry sent successfully.']);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send enquiry.', 'error' => $e->getMessage()]);
}
