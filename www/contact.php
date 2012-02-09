<?php
	if (($_SERVER['REQUEST_METHOD'] == 'POST')  && isset($_REQUEST['name'])  && isset($_REQUEST['email']) && isset($_REQUEST['subject']) && isset($_REQUEST['message'])) {
	    $name = $_REQUEST['name'];
	    $email = $_REQUEST['email'];
	    $subject = $_REQUEST['subject'];
	    $message = $_REQUEST['message'];
		mail(
			"Jane Matthews <jane@janematthewsdesign.com>",
			"Contact] $subject",
			"<html>" .
			"<body>" .
			"<div>From: $name<div>" .
			"<div>Email: $email</div>" .
			"<div>Message</div>" .
			"<div>$message</div>" .
			"</body>" .
			"</html>", 
			"From: Web Master <webmaster@janematthewsdesign.com>\n" .
			"MIME-Version: 1.0\n" .
			"Content-type: text/html; charset=utf-8");
		header('Location: http://www.janematthewsdesign.com/contact.html');
	}
	else {
		header('Location: http://www.janematthewsdesign.com');
	}
?>
