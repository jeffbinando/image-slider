//Declaring global variables
var totalSlides;
var slideCounter;
var slidePosition;
var slideWidth;
var thumbWidth;
var slideHeight;
var animation;
//Slider Options
var sliderArrows = true;
var sliderDots = true;
var sliderThumbnails = true;
var autoRotate = false;
var rotateSpeed = 5000;
$(window).on("orientationchange",function(){
	setTimeout(function(){ responder.resized(); }, 200);
	setTimeout(function(){ slider.resize(); }, 200);	
});
$(window).resize(function(){ 
	setTimeout(function(){ responder.resized(); }, 200);
	setTimeout(function(){ slider.resize(); }, 200);
});
$(document)
.ready(function(){
	responder.setFrameWidths();
	setTimeout(function(){ slider.init(); }, 200);
	if(autoRotate){
		animation = setInterval("slider.animate()", rotateSpeed);	
	}	
})
.on("click", ".slidenav.next", function(){
	slider.next();
	clearInterval(animation);
	return false;	
})
.on("click", ".slidenav.prev", function(){
	slider.prev();
	clearInterval(animation);
	return false;	
})
.on("click", ".nav_dot", function(){
	var thisDot = $(this);
	slider.nav(thisDot);
	clearInterval(animation);
	return false;	
})
.on("click", ".slide_thumb", function(){
	var thisThumb = $(this);
	slider.thumbnail(thisThumb);
	clearInterval(animation);
	return false;	
});