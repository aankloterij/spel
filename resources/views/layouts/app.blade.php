<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">

	<link rel="stylesheet" href="{{ url('/css/reset.css') }}">
	<link rel="stylesheet" href="{{ url('/css/main.css') }}">
	<link rel="stylesheet" href="{{ url('/css/home.css') }}">

	<link rel="icon" href="{{ url('favicon.ico')}}">

	@yield('head')

	<title>@yield('title')</title>
</head>
<body>
	@yield('body')
</body>
</html>
