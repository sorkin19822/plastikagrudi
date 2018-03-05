<?php
require 'class.simple_mail.php';
function clstr($data){
    return trim(strip_tags($data));
}

if($_SERVER['REQUEST_METHOD']=='POST'){
    $name = clstr($_POST['name']);
    $phone = clstr($_POST['phone']);
    $email = clstr($_POST['email']);
    $msg = clstr($_POST['mess']);
    $target = clstr($_POST['target']);
}


$mail = SimpleMail::make()
    ->setTo('seo@dobro-clinic.com', 'Посетитель')
	->setTo('call@dobro-clinic.com', 'Посетитель')
    ->setSubject("Сообщение из сайта ЛЕНДИНГ Абдоминопластика живота")
    ->setFrom($email, 'Mail Bot')
    ->addGenericHeader('X-Mailer', 'PHP/' . phpversion())
    ->setHtml()
    ->setMessage('<br><strong> Сообщение из сайта '.$target.'</strong><br> '.'<br> Имя - '.$name.'<br> Телефон - '. $phone.'<br>  Почта - '. $email.'<br>  Сообщение - '. $msg


    )
    ->setWrap(78);
$send = $mail->send();
//echo $mail->debug();

if ($send) {
    echo 'Письмо успешно отправлено';
} else {
    echo 'Ой, что-то пошло не так. Мы не можем получить Ваше письмо. Пожалуйста перезвоните нам';
}


?>


