jQuery(document).ready(function() {
	
	"use strict";
    
    function showTooltip(x, y, contents) {
		jQuery('<div id="tooltip" class="tooltipflot">' + contents + '</div>').css( {
		  position: 'absolute',
		  display: 'none',
		  top: y + 5,
		  left: x + 5
		}).appendTo("body").fadeIn(200);
	}
	 
	function labelFormatter(label, series) {
		return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
	}
	function lastDayMonth( month )
	{
		var d = new Date((new Date).getFullYear(), month + 1, 0);
		return d.getDate();
	}

	
	if ( jQuery("#novos_investidores").length )
	{
		var cadastrados = [], enviados = [];
		$.get( BASE_URL + 'dashboard/graficos/investidores/',
		function(json)
		{
			json = JSON.parse( json );
			var last_day = lastDayMonth( new Date().getMonth() );
			var ind = 1;
			for ( ind = 1; ind < last_day; ind++ )
			{
				if ( json[0][ind] )
					cadastrados.push([ ind, json[0][ind] ] );
				else
					cadastrados.push([ ind, 0 ]);
			}
			for ( ind = 1; ind < last_day; ind++ )
			{
				if ( json[1][ind] )
					enviados.push([ ind, json[1][ind] ] );
				else
					enviados.push([ ind, 0 ]);
			}
			
			var plot = jQuery.plot(jQuery("#novos_investidores"),
			[ 
				{ 
					data: cadastrados,
					label: 'Cadastrados',
					color: "#1CAF9A"
				},
				{
					data: enviados,
					label: 'Enviados',
					color: '#428BCA'
				}
			],
			{
				series: {
					 lines: {
					show: true,
					fill: true,
					lineWidth: 1,
					fillColor: {
					  colors: [ { opacity: 0.5 },
								{ opacity: 0.5 }
							  ]
					}
				  },
					 points: {
					show: true
				  },
				  shadowSize: 0
				  },
				  legend: {
				  position: 'nw'
				},
				grid: {
				  hoverable: true,
				  clickable: true,
				  borderColor: '#ddd',
				  borderWidth: 1,
				  labelMargin: 10,
				  backgroundColor: '#fff'
				},
				  yaxis: {
				  min: 0,
				  max: 15,
				  color: '#eee'
				},
				xaxis: {
				  color: '#eee'
				}
			});

			  var previousPoint = null;
			  jQuery("#novos_investidores").bind("plothover", function (event, pos, item) {
			  jQuery("#x").text(pos.x);
			  jQuery("#y").text(pos.y);
					
				if(item) {
				  if (previousPoint != item.dataIndex) {
					 previousPoint = item.dataIndex;
								
					 jQuery("#tooltip").remove();
					 var x = item.datapoint[0],
					 y = item.datapoint[1];
					var label;	
					if ( item.series.label == 'Enviados' )
					{
						label = 'Dia ' + x + ': ' + y + (y != 1 ? ' envios' : ' envio');
					} else if ( item.series.label == 'Cadastrados' )
					{
						label = 'Dia ' + x + ': ' + y + (y != 1 ? ' cadastros' : ' cadastro');
					}
					showTooltip(item.pageX, item.pageY, label);
				  }
					
				} else {
				  jQuery("#tooltip").remove();
				  previousPoint = null;            
				}
				
			 });
			
			 jQuery("#novos_investidores").bind("plotclick", function (event, pos, item) {
				if (item) {
				  plot.highlight(item.series, item.datapoint);
				}
			 });
		
		});
    }
    
    /***** PIE CHART *****/
    
	if ( jQuery('#piechart').length )
	{
		var piedata = [
			{ label: "Series 1", data: [[1,10]], color: '#D9534F'},
			{ label: "Series 2", data: [[1,30]], color: '#1CAF9A'},
			{ label: "Series 3", data: [[1,90]], color: '#F0AD4E'},
			{ label: "Series 4", data: [[1,70]], color: '#428BCA'},
			{ label: "Series 5", data: [[1,80]], color: '#5BC0DE'}
		 ];
		
		jQuery.plot('#piechart', piedata, {
			series: {
				pie: {
					show: true,
					radius: 1,
					label: {
						show: true,
						radius: 2/3,
						formatter: labelFormatter,
						threshold: 0.1
					}
				}
			},
			grid: {
				hoverable: true,
				clickable: true
			}
		});
	}
   
   
   /***** MORRIS CHARTS *****/
   
   if ( jQuery('#line-chart').length )
   {
		var m1 = new Morris.Line({
			// ID of the element in which to draw the chart.
			element: 'line-chart',
			// Chart data records -- each entry in this array corresponds to a point on
			// the chart.
			data: [
				{ y: '2006', a: 30, b: 20 },
				{ y: '2007', a: 75,  b: 65 },
				{ y: '2008', a: 50,  b: 40 },
				{ y: '2009', a: 75,  b: 65 },
				{ y: '2010', a: 50,  b: 40 },
				{ y: '2011', a: 75,  b: 65 },
				{ y: '2012', a: 100, b: 90 }
			],
			xkey: 'y',
			ykeys: ['a', 'b'],
			labels: ['Series A', 'Series B'],
			lineColors: ['#D9534F', '#428BCA'],
			lineWidth: '2px',
			hideHover: true
		});  
	}
	
	
	 /***** BAR CHART *****/
    
	if ( jQuery('#novos_investidores_nivel').length )
	{
		$.get( BASE_URL + 'dashboard/graficos/novosinvestidores/',
		function(json)
		{
			var bardata = JSON.parse( json );
			jQuery.plot("#novos_investidores_nivel", [bardata], {
				  series: {
					lines: {
					  lineWidth: 1  
					},
						bars: {
							show: true,
							barWidth: 0.5,
							align: "center",
					   lineWidth: 0,
					   fillColor: "#428BCA"
						}
				  },
				grid: {
					borderColor: '#ddd',
					borderWidth: 1,
					labelMargin: 10
				  },
				  xaxis: {
						mode: "categories",
						tickLength: 0
				  }
			 });
		});
	}
});