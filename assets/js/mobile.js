$(document).ready(function(){
	$('.opener').on('click',function(){
		$(this).next().slideToggle();
		$(this).find('i').toggleClass('rotate');
	});
});
