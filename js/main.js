var audio;

$('#pause').hide();

initAudio($('#playlist li:first-child'));

function initAudio(element){
	var song = element.attr('song');
	
	
	audio = new Audio('audio/'+ song);
	
	$('#playlist li').removeClass('active');
	element.addClass('active');
}

$('#play').click(function(){
	audio.play();
	$('#play').hide();
	$('#pause').show();
	showDuration();
});

$('#pause').click(function(){
	audio.pause();
	$('#play').show();
	$('#pause').hide();
});

$('#stop').click(function(){
	audio.pause();
	$('#play').show();
	$('#pause').hide();
	audio.currentTime = 0;

});

$('#next').click(function(){
	audio.pause();
	var next = $('#playlist li.active').next();
	if(next.length == 0){
		next = $('#playlist li:first-child');
	}
	initAudio(next);
	audio.play();
	showDuration();
	$('#play').hide();
	$('#pause').show();
});

$('#prev').click(function(){
	audio.pause();
	var prev = $('#playlist li.active').prev();
	if(prev.length == 0){
		prev = $('#playlist li:last-child');
	}
	initAudio(prev);
	audio.play();
	showDuration();
	$('#play').hide();
	$('#pause').show();
});

$('#playlist li').click(function(){
	audio.pause();
	initAudio($(this));
	$('#play').hide();
	$('#pause').show();
	audio.play();
	showDuration();
});

function showDuration(){
	$(audio).bind('timeupdate',function(){
		var s = parseInt(audio.currentTime % 60);
		var m = parseInt(audio.currentTime / 60) % 60;
		if(s < 10){
			s = '0'+s;
		}
		$('#duration').html(m + ':'+ s);
		var value = 0;
		if(audio.currentTime > 0){
			value = Math.floor((100 / audio.duration) * audio.currentTime);
		}
		$('#progress').css('width',value+'%');
	});
}

