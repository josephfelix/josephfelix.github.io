/*
* ---------------------------------------
*  Script desenvolvido por: Joseph F.
*  http://josephfelix.github.io
* ---------------------------------------
*/

var JosephPortfolio = 
{
	irPara: function( pag )
	{
		pag = /^\#/.test(pag) ? pag.replace(/^\#/,'') : pag;
		var element = $("#".concat(pag));
		if ( element.length )
		{
			if ( element.is(':visible') )
				return;
			var atual = $(".conteudo .slider:visible");

			if ( $("#navbar-collapse").hasClass('in') )
				$("#navbar-collapse").animate({
					height: 0
				}, 400, function()
				{
					$(this).removeClass('in');
				});
				
			$("#menu-" + atual.attr('id')).parent().removeClass('active');
			$("#menu-" + pag).parent().addClass('active');
			
			element.css({ marginLeft: $(window).width(), position: 'absolute', left: $(window).width() });
			var negative_width = atual.width() * (-1);
		
			atual.animate({
				marginLeft: negative_width
			}, {
				duration: 900, 
				queue: false,
				complete: function()
				{
					atual.addClass('hide');
					element.css('position', '');
				}
			});
			
			element.removeClass('hide').animate({
					marginLeft: 0,
					left: 0
				}, {duration: 1000, queue: false});
				
			
		}
	}
};

$(document).ready(function()
{
	if ( window.location.hash != '' )
	{
		setTimeout(function()
		{
			JosephPortfolio.irPara( window.location.hash );
		}, 400);
	}
});