<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

$empresa = strip_tags($_POST["empresa"]);
$email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
$mensagem = strip_tags($_POST["mensagem"]);

$mail = new PHPMailer(true);

try {

$mail->isSMTP();

$mail->Host = 'mail.zaiauniformes.com.br'; 
$mail->SMTPAuth = true;

$mail->Username = 'comercial@zaiauniformes.com.br';
$mail->Password = 'Estrupicio123*';

$mail->SMTPSecure = 'tls';
$mail->Port = 587;

$mail->CharSet = 'UTF-8';

$mail->setFrom('comercial@zaiauniformes.com.br', 'Site ZAIA Uniformes');

$mail->addAddress('comercial@zaiauniformes.com.br');

$mail->addReplyTo($email, $empresa);

$mail->isHTML(true);

$mail->Subject = 'Novo orçamento solicitado - ZAIA Uniformes';

$mail->Body = "

<h2>Nova solicitação pelo site</h2>

<p><b>Empresa:</b> $empresa</p>

<p><b>Email:</b> $email</p>

<p><b>Mensagem:</b></p>

<p>$mensagem</p>

";

$mail->AltBody = "Empresa: $empresa | Email: $email | Mensagem: $mensagem";

$mail->send();

echo "sucesso";

} catch (Exception $e) {

echo "erro";

}

}
?>