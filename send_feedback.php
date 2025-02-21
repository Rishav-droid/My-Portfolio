<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recipient email
    $to = "rishavsamanta2023@gmail.com";
    
    // Get and sanitize form data
    $from_email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $feedback = htmlspecialchars($_POST['feedback']);
    $subject = "New Portfolio Feedback";
    
    // Email headers
    $headers = "From: $from_email\r\n";
    $headers .= "Reply-To: $from_email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // Email body with styling
    $message = "
    <html>
    <body style='font-family: Arial, sans-serif; line-height: 1.6;'>
        <div style='max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 8px; background: #f8f9fa;'>
            <h2 style='color: #4a9eff;'>New Portfolio Feedback</h2>
            <p><strong>From:</strong> {$from_email}</p>
            <p><strong>Time:</strong> " . date('Y-m-d H:i:s') . "</p>
            <div style='margin-top: 20px; padding: 15px; background: #fff; border-radius: 5px;'>
                <p><strong>Feedback:</strong></p>
                <p>{$feedback}</p>
            </div>
        </div>
    </body>
    </html>";
    
    // Send email and handle response
    try {
        if(mail($to, $subject, $message, $headers)) {
            echo json_encode(['status' => 'success']);
        } else {
            throw new Exception('Failed to send feedback');
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
    exit;
}
?>
