/*
* ---------------------------------------
*  Script desenvolvido por: Joseph F.
*  http://josephfelix.github.io
* ---------------------------------------
*/

window.current_work = '';
var JosephPortfolio = 
{
	start: function()
	{
		if ( $(".colorbox").length )
		{
			$(".colorbox.youtube").colorbox(
			{
				iframe: true,
				innerWidth: 640, 
				innerHeight: 390
			});
			$(".colorbox").colorbox(
			{
				rel: 'Trabalhos', 
				transition: 'fade', 
				width: '80%',
				previous: '<i class="fa fa-chevron-left"></i>',
				next: '<i class="fa fa-chevron-right"></i>',
				close: '',
				closeButton: false,
				current: "",
				onOpen: function( img )
				{
					window.current_work = '';
				},
				onLoad: function( img )
				{
					var work = ' ';
					if ( $(img.el).attr('href').length > 0 )
					{
						var tmp = $(img.el).attr('href').split('/');
						tmp.pop();
						work = tmp.pop();
					}
					
					if ( work != 'embed' ) //YouTube
					{
						if ( window.current_work != work && window.current_work != '' )
						{
							$.colorbox.close();
						}
						
						window.current_work = work;
					}
				}
			});
		}
	},
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
	JosephPortfolio.start();
	if ( window.location.hash != '' )
	{
		setTimeout(function()
		{
			JosephPortfolio.irPara( window.location.hash );
		}, 400);
	}
});