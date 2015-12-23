window.onload=function() {

	var dataSet = [
		{
			title: "The Next Step Live: The Movie",
			subTitle: "43 Min | PG13",
			imageUrl: "blue", 
		},
		{
			title: "Make Me Over",
			subTitle: "The Tomboy",
			imageUrl: "green", 
		},
		{
			title: "Slide 3",
			subTitle: "SubTitle 3",
			imageUrl: "cyan", 
		},
		{
			title: "Slide 4",
			subTitle: "SubTitle 4",
			imageUrl: "orange", 
		},
		{
			title: "Slide 5",
			subTitle: "SubTitle 5",
			imageUrl: "red", 
		},
		{
			title: "Slide 6",
			subTitle: "SubTitle 6",
			imageUrl: "red", 
		}
	];

	var activeSlide = 0;
	var startingSlide = null;
	var infiniteMode = true; // Use quickest path;

	var AUTO_SLIDE = true;  
    var HOVER_ON_PAUSE = 1;  
	var AUTOSLIDE_INTERVAL = 10000;  

	if(AUTO_SLIDE == true) {  
	    var timer = setInterval('slide("right")', AUTOSLIDE_INTERVAL);  
    }

    if(HOVER_ON_PAUSE == true){  
        $('.slider-container').hover(function(){  
            clearInterval(timer)  
        },function(){  
            timer = setInterval('slide("right")', AUTOSLIDE_INTERVAL);  
        });  
    }  

	function createSlides() {
		for (var i = 0, len = dataSet.length; i < len; i++) {
			// Create Slides;
			$('#slider').append(
				'<li class="item" data-index="'+i+'">' +
					'<img src="http://lorempixel.com/960/540"/>'+
					'<div class="slide-metadata">'+
						'<h1>'+dataSet[i].title +'</h1>' +
						'<h3>'+dataSet[i].subTitle +'</h3>' +
					'</div>'+
				'</li>'
			);

			// Create Buttons
			$('#dots').append(
				'<li class="dot" onClick="goToSlide('+i+')"></li>'
			);
		}

	    $('#slider li:first').addClass("active");
	    $('#dots li:first').addClass("active");

	    $('#slider li:first').before($('#slider li:last'));
	}

	createSlides();

	//slide function  
	slide = function (dir, callback){

		var item_width = $('#slider li').outerWidth();

		if (dir == 'left'){
		    var left_indent = parseInt($('#slider').css('left')) + item_width;
		}
		else {
	    	var left_indent = parseInt($('#slider').css('left')) - item_width;
		}

		$('#slider:not(:animated)').animate({'left' : left_indent},300, "linear",function(){    

			$("#slider li.active").removeClass("active");
			$("#dots li.active").removeClass("active");

		    if (dir == 'left') {
		        // Put the last item before the first item
		        $('#slider li:first').before($('#slider li:last'));
		    }
		    else {
		        // Put the first item after the last item
		        $('#slider li:last').after($('#slider li:first')); 
		    }
		    
	        $('#slider li:nth-child(2)').addClass('active');

		    // Set default left indent
		    $('#slider').css({'left' : '-855'});

		    // Update the currently selected dot.
			$('#slider li').each(function (index, element) {
				if ( $(element).hasClass('active') ) {
					activeSlide = parseInt($(element).attr("data-index"));
					$('#dots li:nth-child(' + (activeSlide + 1) + ')').addClass('active');
				}
			});


			// Animation is done, run callback if necessary.
		    if (callback) {
		    	callback();
		    }
		});
	}

	goToSlide = function (slideNum) {

		var slideTo = function (dir, interval) {
			if (interval > 0) {
				slide(dir, function () {
					interval--;				
					slideTo(dir, interval);
				});
			}
		}

		var dif = 0;
		var itemCount = dataSet.length;

		if (infiniteMode) {

			if (activeSlide > slideNum) {
				var stepsRight = Math.abs((itemCount - activeSlide) + slideNum);
				var stepsLeft = Math.abs(activeSlide - slideNum);
				if (stepsRight < stepsLeft) {
					slideTo("right", stepsRight);	
				}
				else {
					slideTo("left", stepsLeft);	
				}
			}
			else {
				var stepsLeft = Math.abs((slideNum - activeSlide) - itemCount);
				console.log("Steps Left:", stepsLeft);

				var stepsRight = Math.abs(activeSlide - slideNum);
				console.log("Steps Right:", stepsRight);

				if (stepsRight < stepsLeft) {
					slideTo("right", stepsRight);	
				}
				else {
					slideTo("left", stepsLeft);	
				}
			}
		}
		else {

			if (activeSlide > slideNum) {
				dif = activeSlide - slideNum;
				slideTo("left", dif);	
			}
			else {
				dif = slideNum - activeSlide;
				slideTo("right", dif);	
			}
		}
	}
};