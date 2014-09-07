/*
* ---------------------------------------
*  Script desenvolvido por: Joseph F.
*  http://josephfelix.github.io
* ---------------------------------------
*/

window.current_work="";
var JosephPortfolio={start:function(){$(".colorbox").length&&($(".colorbox.youtube").colorbox({iframe:!0,innerWidth:640,innerHeight:390}),$(".colorbox").colorbox({rel:"Trabalhos",transition:"fade",width:"80%",previous:'<i class="fa fa-chevron-left"></i>',next:'<i class="fa fa-chevron-right"></i>',close:"",closeButton:!1,current:"",onOpen:function(a){window.current_work=""},onLoad:function(a){var b=" ";0<$(a.el).attr("href").length&&(a=$(a.el).attr("href").split("/"),a.pop(),b=a.pop());"embed"!=b&&
(window.current_work!=b&&""!=window.current_work&&$.colorbox.close(),window.current_work=b)}}))},irPara:function(a){a=/^\#/.test(a)?a.replace(/^\#/,""):a;var b=$("#".concat(a));if(b.length&&!b.is(":visible")){var c=$(".conteudo .slider:visible");$("#navbar-collapse").hasClass("in")&&$("#navbar-collapse").animate({height:0},400,function(){$(this).removeClass("in")});$("#menu-"+c.attr("id")).parent().removeClass("active");$("#menu-"+a).parent().addClass("active");b.css({marginLeft:$(window).width(),
position:"absolute",left:$(window).width()});a=-1*c.width();c.animate({marginLeft:a},{duration:900,queue:!1,complete:function(){c.addClass("hide");b.css("position","")}});b.removeClass("hide").animate({marginLeft:0,left:0},{duration:1E3,queue:!1})}}};$(document).ready(function(){JosephPortfolio.start();""!=window.location.hash&&setTimeout(function(){JosephPortfolio.irPara(window.location.hash)},400)});