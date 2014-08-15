/**
* Desenvolvido por: Joseph F.
* http://josephfelix.github.io
*/
$(document).ready(function()
{   
	  jQuery('.camera_wrap').camera(
	  {
			onEndTransition: function()
			{
				var animated = $('.cameracurrent .caption_animated');
				if ( animated.length )
				{
					animated.each(function()
					{
						if ( !$(this).hasClass('animated') )
						{	
							$(this).addClass('animated')
							.addClass( $(this).data('easing') )
							.css( { position: 'absolute', left: $(this).data('x'), top: $(this).data('y') });
							
							if ( $(this).data( 'iteration' ) )
							{
								$(this).css({
										'-moz-animation-iteration-count': $(this).data( 'iteration' ),
										'-webkit-animation-iteration-count': $(this).data( 'iteration' ),
										'-o-animation-iteration-count': $(this).data( 'iteration' ),
										'animation-iteration-count': $(this).data( 'iteration' )
									});
							}		
							if ( $(this).data( 'delay' ) )
							{
								$(this).css({
										'-moz-animation-delay': $(this).data( 'delay' ),
										'-webkit-animation-delay': $(this).data( 'delay' ),
										'-o-animation-delay': $(this).data( 'delay' ),
										'animation-delay': $(this).data( 'delay' )
									});
							}
							
							if ( $(this).data( 'duration' ) )
							{
								$(this).css({
										'-moz-animation-duration': $(this).data( 'duration' ),
										'-webkit-animation-duration': $(this).data( 'duration' ),
										'-o-animation-duration': $(this).data( 'duration' ),
										'animation-duration': $(this).data( 'duration' )
									});
							}
							
						}
					});
				}
			}
	  });
}); 