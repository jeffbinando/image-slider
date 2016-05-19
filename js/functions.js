var slider = {
	init:function(){
		totalSlides = $('.slide').length;
		slideCounter = 0;
		slidePosition = 0;
		$('.slide').each(function(i){
			$(this).attr('id','slide-'+i);
			i++	
		});
		if(responder.curzindex==1){
			slideWidth = $('.slide').width();
			slideHeight = $('.slide').height();	
			$('#rail_viewport').width(slideWidth).height(slideHeight);			
		}else{
			slideWidth = $('#rail_viewport').width();
			slideHeight = $('.slide').height();
			$('#rail_viewport').height(slideHeight);
			$('.slide').width(slideWidth);
		}
		$('.rail').width(slideWidth*totalSlides);
		$('#slider').animate({opacity: '1'},700);
		if(sliderArrows){
			var arrows = '<div id="slider_nav_arrows"><a href="#" title="Previous Slide" class="slidenav prev"><img src="images/prev_arrow.png" alt="Previous Slide" /></a><a href="#" title="Next Image" class="slidenav next"><img src="images/next_arrow.png" alt="Next Slide" /></a></div>';
			$('#rail_viewport').prepend(arrows);
			var arrowHeight = $('.slidenav').height()/2;
			$('.slidenav').css('top',slideHeight/2-arrowHeight);
			$('.slidenav.prev').animate({opacity:'.4'},500);			
		}
		if(sliderDots){
			$('#rail_viewport').prepend('<div id="slider_nav_dots"></div>');
			$('.slide').each(function(i){
				$('#slider_nav_dots').append('<a href="#" class="nav_dot" id="nav_dot-'+i+'"></a>');
				i++		
			});	
			$('#nav_dot-'+slideCounter).addClass('active_dot');
		}
		if(sliderThumbnails){
			$('#slider').append('<div id="thumbnail_viewport" class="mCustomScrollbar"><div id="thumbnail_rail"></div></div>');
			$('.slide').each(function(i){
				var thumbnail = $(this).find('img').attr('src');
				$('#thumbnail_rail').append('<a href="#" id="thumbnail-'+i+'" class="slide_thumb"><img src="'+thumbnail+'" /></a>');
				i++		
			});	
			$('#thumbnail-'+slideCounter).addClass('slide_thumb_active');	
			thumbWidth = $('.slide_thumb').width();
			$('#thumbnail_rail').width(thumbWidth*totalSlides);
			$("#thumbnail_viewport").mCustomScrollbar({
				axis:'x'
			});
		}	
	},
	nav:function(thisDot){
		var id = thisDot.attr('id').split('-')[1];
		$('#slide-'+slideCounter).stop(true,true).animate({opacity: '0'},800, function(){
			$(this).css('opacity','1');
		});
		slideCounter = parseInt(id);
		slidePosition = slideWidth*slideCounter;
		$('.rail').stop(true,true).animate({left: -slidePosition},700);	
		$('.slidenav.prev').animate({opacity:'1'},500);	
		slideHeight = $('#slide-'+slideCounter).height();	
		$('#rail_viewport').stop(true,true).animate({height: slideHeight},500);
		$('.nav_dot').removeClass('active_dot');
		$('#nav_dot-'+slideCounter).addClass('active_dot');
		$('.slide_thumb').removeClass('slide_thumb_active');
		$('#thumbnail-'+slideCounter).addClass('slide_thumb_active');
		if(slideCounter>=totalSlides-1){
			$('.slidenav.prev').animate({opacity:'1'},500);	
			$('.slidenav.next').animate({opacity:'.4'},500);
		}else if(slideCounter==0){
			$('.slidenav.prev').animate({opacity:'.4'},500);	
			$('.slidenav.next').animate({opacity:'1'},500);
		}else{
			$('.slidenav.prev').animate({opacity:'1'},500);	
			$('.slidenav.next').animate({opacity:'1'},500);	
		}
	},
	thumbnail:function(thisThumb){
		var id = thisThumb.attr('id').split('-')[1];
		$('#slide-'+slideCounter).stop(true,true).animate({opacity: '0'},800, function(){
			$(this).css('opacity','1');
		});
		slideCounter = parseInt(id);
		console.log('Total Slides '+totalSlides);
		console.log('Counter '+slideCounter);
		slidePosition = slideWidth*slideCounter;
		$('.rail').stop(true,true).animate({left: -slidePosition},700);	
		$('.slidenav.prev').animate({opacity:'1'},500);	
		slideHeight = $('#slide-'+slideCounter).height();	
		$('#rail_viewport').stop(true,true).animate({height: slideHeight},500);
		$('.slide_thumb').removeClass('slide_thumb_active');
		$('#thumbnail-'+slideCounter).addClass('slide_thumb_active');
		$('.nav_dot').removeClass('active_dot');
		$('#nav_dot-'+slideCounter).addClass('active_dot');
		if(slideCounter>=totalSlides-1){
			$('.slidenav.prev').stop(true,true).animate({opacity:'1'},500);	
			$('.slidenav.next').stop(true,true).animate({opacity:'.4'},500);
		}else if(slideCounter==0){
			$('.slidenav.prev').stop(true,true).animate({opacity:'.4'},500);	
			$('.slidenav.next').stop(true,true).animate({opacity:'1'},500);
		}else{
			$('.slidenav.prev').stop(true,true).animate({opacity:'1'},500);	
			$('.slidenav.next').stop(true,true).animate({opacity:'1'},500);	
		}
	},
	next:function(){
		if(slideCounter+1>=totalSlides){
			slideCounter=0;	
			slidePosition = slideWidth*slideCounter;
			$('.rail').stop(true,true).animate({opacity: '0'},600, function(){
				$('.rail').css('left',-slidePosition);
				$(this).delay(100).stop(true,true).animate({opacity: '1'},600);
			});
			$('.slidenav.prev').animate({opacity:'.4'},500);	
			$('.slidenav.next').animate({opacity:'1'},500);
		}else{
			$('#slide-'+slideCounter).stop(true,true).animate({opacity: '0'},800, function(){
				$(this).css('opacity','1');
			});
			slideCounter++;
			slideHeight = $('#slide-'+slideCounter).height();	
			$('#rail_viewport').stop(true,true).animate({height: slideHeight},500);
			slidePosition = slideWidth*slideCounter;
			$('.rail').stop(true,true).animate({left: -slidePosition},700);	
			$('.slidenav.prev').animate({opacity:'1'},500);	
			if(slideCounter+1>=totalSlides){
				$('.slidenav.next').animate({opacity:'.4'},500);	
			}
		}
		$('.nav_dot').removeClass('active_dot');
		$('#nav_dot-'+slideCounter).addClass('active_dot');
		$('.slide_thumb').removeClass('slide_thumb_active');
		$('#thumbnail-'+slideCounter).addClass('slide_thumb_active');
	},
	prev:function(){
		if(slideCounter==0){
			
		}else{
			$('#slide-'+slideCounter).stop(true,true).animate({opacity: '0'},1000, function(){
				$(this).css('opacity','1');
			});
			slideCounter--;
			slideHeight = $('#slide-'+slideCounter).height();	
			$('#rail_viewport').stop(true,true).animate({height: slideHeight},500);
			slidePosition = slideWidth*slideCounter;
			$('.rail').stop(true,true).animate({left: -slidePosition},700);	
			$('.slidenav.next').animate({opacity:'1'},500);	
			if(slideCounter==0){
				$('.slidenav.prev').animate({opacity:'.4'},500);	
			}
		}
		$('.nav_dot').removeClass('active_dot');
		$('#nav_dot-'+slideCounter).addClass('active_dot');
		$('.slide_thumb').removeClass('slide_thumb_active');
		$('#thumbnail-'+slideCounter).addClass('slide_thumb_active');
	},
	animate:function(){
		if(slideCounter+1>=totalSlides){
			slideCounter=0;	
			slidePosition = slideWidth*slideCounter;
			$('.rail').stop(true,true).animate({opacity: '0'},600, function(){
				$('.rail').css('left',-slidePosition);
				$(this).delay(100).stop(true,true).animate({opacity: '1'},600);
			});	
			$('.slidenav.prev').animate({opacity:'.4'},500);	
			$('.slidenav.next').animate({opacity:'1'},500);
		}else{
			$('#slide-'+slideCounter).stop(true,true).animate({opacity: '0'},800, function(){
				$(this).css('opacity','1');
			});
			slideCounter++;
			slidePosition = slideWidth*slideCounter;
			$('.rail').stop(true,true).animate({left: -slidePosition},700);	
			$('.slidenav.prev').animate({opacity:'1'},500);	
			if(slideCounter+1>=totalSlides){
				$('.slidenav.next').animate({opacity:'.4'},500);	
			}
			if(responder.curzindex==20){
				slideHeight = $('#slide-'+slideCounter).height();	
				$('#rail_viewport').stop(true,true).animate({height: slideHeight},500);
			}
		}
		$('.nav_dot').removeClass('active_dot');
		$('#nav_dot-'+slideCounter).addClass('active_dot');
		$('.slide_thumb').removeClass('slide_thumb_active');
		$('#thumbnail-'+slideCounter).addClass('slide_thumb_active');
	},
	resize:function(){
		if(responder.curzindex==1){
			$('.slide').css('width','').css('height','');
			slideWidth = $('.slide').width();
			slideHeight = $('#slide-'+slideCounter).height();	
			$('#rail_viewport').width(slideWidth).stop(true,true).animate({height: slideHeight},500);
		}else{
			$('#rail_viewport').css('width','').css('height','');
			slideWidth = $('#rail_viewport').width();
			slideHeight = $('#slide-'+slideCounter).height();	
			$('#rail_viewport').stop(true,true).animate({height: slideHeight},500);
			$('.slide').width(slideWidth);
		}
		$('.rail').width(slideWidth*totalSlides);	
		slidePosition = slideWidth*slideCounter;
		$('.rail').stop(true,true).animate({left: -slidePosition},200);	
		if(sliderArrows){
			var arrowHeight = $('.slidenav').height()/2;
			$('.slidenav').css('top',slideHeight/2-arrowHeight);		
		}		
	}
};
var responder = {
	curzindex:1,
	setFrameWidths:function(){
		this.curzindex = parseInt($("#responder").css('z-index'));
		switch(this.curzindex){
			case 1:
			break;
			case 10:
			break;
			case 20:
			break;
		}
	},
	resized:function(){
		this.setFrameWidths();
	}
};