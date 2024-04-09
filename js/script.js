//----------------------Top check form-----------------------//
		var mycanvas=document.getElementById('mycanvas');
		var cxt=mycanvas.getContext('2d');//canvas getContext 渲染環境
		var validate="";

		var sColor=["#B22222","#F9F900","#82D900","#FFAF60"];   //干擾點顏色
		var fColor=["#000079","#006030","#820041","#4B0091"];   //文字顏色
		var indexColor=""; //顏色組序號
		var img = new Image(); 
		img.src ="https://www.chunxinstudio.com/images/checkbg.jpg";

		/*生成隨機顏色組合序號*/
		function randColor(){
		    indexColor="";
		    indexColor=Math.floor(Math.random()*sColor.length); //亂數取得 0~顏色陣列長度
		    return  indexColor;
		}

		/*生成6位隨機數*/
		function rand(){
		        validate="";
		        // 大小寫英文 數字 排除 I l o O 0  ,並重複數字 增加出現機率
		        var str="123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789";
		        var arr=str.split("");
		        var ranNum;
		        for(var i=0;i<6;i++){
		            ranNum=Math.floor(Math.random()*66);   //隨機數在[0,65]之間
		            validate+=arr[ranNum];
		        }
		        return validate;
		}

		/*干擾線的隨機x坐標值*/
		function lineX(){
		        var ranLineX=Math.floor(Math.random()*150);
		        return ranLineX;
		    }

		/*干擾線的隨機y坐標值*/
		function lineY(){
		        var ranLineY=Math.floor(Math.random()*40);
		        return ranLineY;
		    }

		/*更換內容*/
		function clickChange(){
		  //重設canvas內容
		  mycanvas.width  = mycanvas.width;
		  mycanvas.height = mycanvas.height;   

		  //選取底圖範圍
		  cxt.drawImage(img,lineX(),lineY(),150,40,0,0,150,40);
		    
		  /*生成干擾線2條*/
		  for(var j=0; j<2; j++){
		     //產生一個新路徑，產生後再使用繪圖指令來設定路徑
		    //若省略beginPath，則每點擊一次驗證碼會累積干擾線的條數
		     cxt.beginPath(); 
		     cxt.strokeStyle=sColor[randColor()];
		     cxt.moveTo(0,lineY());//起始點座標
		     cxt.lineTo(150,lineY());//從起始點畫一條直線到指定的(x, y)座標點
		     cxt.lineWidth=(Math.floor(Math.random()*(20-10+1))+10)/10; //亂數 取得介於1~2之間的值
		     cxt.stroke();
		     cxt.closePath();
		    }
		  //
		    //cxt.beginPath(); 
		    cxt.fillStyle=fColor[randColor()];//隨機文字顏色
		    cxt.font='bold 25px Verdana';
		    cxt.fillText(rand(),10,30);   //把rand()生成的隨機數文本填充到canvas中  
		 }

		/*點擊驗證碼更換*/
		mycanvas.onclick=function(e){
		        e.preventDefault();   //阻止滑鼠點擊發生預設的行為
		        clickChange();
		}

		img.onload = function() {
		clickChange();}


//----------------------End check form-----------------------//



//------------------------------------- Waiting for the entire site to load ------------------------------------------------//

jQuery(window).load(function() { 
		jQuery("#loaderInner").fadeOut(); 
		jQuery("#loader").delay(400).fadeOut("slow"); 
		$('.teaserTitle ').stop().animate({marginTop :'330px', opacity:"1"}, 1000, 'easeOutQuint');
		$('.shortcat a ').stop().animate({marginTop :'65px', opacity:"1"}, 600, 'easeOutQuint');
});



$(document).ready(function(){

//------------------------------------- Navigation setup ------------------------------------------------//


//--------- Scroll navigation ---------------//

$("#mainNav ul a, .logo a, .ctl a, .skill a").click(function(e){

	
	var full_url = this.href;
	var parts = full_url.split("#");
	var trgt = parts[1];
	var target_offset = $("#"+trgt).offset();
	var target_top = target_offset.top;
	


	$('html,body').animate({scrollTop:target_top -70}, 800);
		return false;
	
});


//-------------Highlight the current section in the navigation bar------------//


	var sections = $("section");
		var navigation_links = $("#mainNav a");

		sections.waypoint({
			handler: function(event, direction) {

				var active_section;
				active_section = $(this);
				if (direction === "up") active_section = active_section.prev();

				var active_link = $('#mainNav a[href="#' + active_section.attr("id") + '"]');
				navigation_links.removeClass("active");
				active_link.addClass("active");

			},
			offset: '35%'
		});
		
		
//------------------------------------- End navigation setup ------------------------------------------------//




//---------------------------------- Clients animation-----------------------------------------//

$('.clientList a').css({opacity:0.5});
		$('.clientList a').hover( function(){ 
			$(this).stop().animate({opacity:"1"}, 100, 'easeOutQuint');
		}, function(){ 
			$(this).stop().animate({opacity:"0.5"}, 100, 'easeOutQuint');
		});
//---------------------------------- End clients animation-----------------------------------------//


//---------------------------------- Form validation-----------------------------------------//




$('#submit').click(function(){ 

	$('input#name').removeClass("errorForm");
	$('textarea#message').removeClass("errorForm");
	$('input#email').removeClass("errorForm");
	
	var error = false; 
	var name = $('input#name').val(); 
	if(name == "" || name == " ") { 
		error = true; 
		$('input#name').addClass("errorForm");
	}
	
	
		var msg = $('textarea#message').val(); 
		if(msg == "" || msg == " ") {
			error = true;
			$('textarea#message').addClass("errorForm");
			
		}
	
	var email_compare = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i; 
	var email = $('input#email').val(); 
	if (email == "" || email == " ") { 
		$('input#email').addClass("errorForm");
		error = true;
	}else if (!email_compare.test(email)) { 
		$('input#email').addClass("errorForm");
		error = true;
	}

	if(error == true) {
		return false;
	}

	var data_string = $('.contactForm form').serialize(); 


	/*輸入驗證碼與核對*/
	var myform=document.getElementById('myform');
		
	var vad = myform.vad.value;
	if(vad.toUpperCase()===validate.toUpperCase()){
		clickChange();
	}
	else{
		$('#error').fadeIn();
		$('#success').fadeOut();
		return false;
	}
	/*驗證碼與核對結束*/	


	

	$.ajax({
		type: "POST",
		url: $('.contactForm form').attr('action'),
		data: data_string,
		
		success: function(message) {
				if(message == 'SENDING'){
					$('#success').fadeIn();
					$('#error').fadeOut();
				}
				else{
					$('#error').fadeIn();
					$('#success').fadeOut();
				}
					},
					
		error:function(err){
			$('#success').fadeIn();
			$('#error').fadeOut();
		},			
					
	});

	return false; 
});



//---------------------------------- End form validation-----------------------------------------//


//--------------------------------- Mobile menu --------------------------------//


//--------------------------------- Mobile menu --------------------------------//


var mobileBtn = $('.mobileBtn');
	var nav = $('#mainNav ul');
	var navHeight= nav.height();

$(mobileBtn).click(function(e) {
		e.preventDefault();
		nav.slideToggle();
		$('#mainNav li a').addClass('mobile');


});

$(window).resize(function(){
		var w = $(window).width();
		if(w > 320 && nav.is(':hidden')) {
			nav.removeAttr('style');
			$('#mainNav li a').removeClass('mobile');
		}

});



$('#mainNav li a').click(function(){
	if ($(this).hasClass('mobile')) {
        nav.slideToggle();
	}

});


//--------------------------------- End mobile menu --------------------------------//


//--------------------------------- End mobile menu --------------------------------//


//--------------------------------- Parallax --------------------------------//
	
$(".factsContainer").parallax("300%", 0.3);
$(".testiCliContainer").parallax("300%", 0.3);


//--------------------------------- End parallax --------------------------------//


//---------------------------------- Site slider-----------------------------------------//

$('.mainSlider, .projectSlider').flexslider({
	animation: "fade",
	slideshow: true,
	controlNav: false,
	animationSpeed: 1500
});



$('.factSlider').flexslider({
	animation: "slide",
	slideshow: true,
	controlNav: false,
	pauseOnHover: false,
	maxItems:1,
	animationSpeed: 500
});


$('.testiSlider').flexslider({
	animation: "slide",
	slideshow: false,
	directionNav:false,
	controlNav: true
});

$('.clientSlider').flexslider({
	animation: "slide",
	slideshow: false,
	directionNav:false,
 	itemWidth: 53,
    itemMargin: 0,
    minItems: 2,
    maxItems: 5,
	controlNav: true
});



//---------------------------------- End site slider-----------------------------------------//



//---------------------------------- Portfolio -----------------------------------------//

$(".desc").css({ opacity: 0 });

$('.item a').hover( function(){ 
	$(this).children('.desc ').stop().animate({ opacity: 1 }, 'fast');
}, function(){ 
	$(this).children('.desc ').stop().animate({ opacity: 0 }, 'slow'); 
});

				
$('.item').hover(function () {
    var projDesc = $(this).find('.projDesc');
    var offset = ($(this).height() / 2) - (projDesc.height() / 2);
    $(this).find('.desc').css('padding-top', offset + 1);
});


 $('.folio').magnificPopup({ 
	type: 'image',
	fixedContentPos: false,
	fixedBgPos: false,
	mainClass: 'mfp-no-margins mfp-with-zoom',
	image: {
		verticalFit: true
	},
	zoom: {
		enabled: true,
		duration: 300
	}
});


//---------------------------------- End portfolio-----------------------------------------//




//---------------------------------- Facts animation-----------------------------------------//

$('.factSlider').appear(function() {
	$(".timer .count").each(function() {
	var counter = $(this).html();
	$(this).countTo({
		from: 0,
		to: counter,
		speed: 2000,
		refreshInterval: 10,
		});
	});
});



//---------------------------------- End facts animation-----------------------------------------//


//--------------------------------- To the top  --------------------------------//

$().UItoTop({ easingType: 'easeOutQuart' });

//--------------------------------- End to the top --------------------------------//


});








