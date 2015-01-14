console.log('\'Allo \'Allo!');// $('myModal').modal();


//bootstrap 3 tooltips on
// $(function () {
//     $('[data-toggle="tooltip"]').tooltip()
// })
function greetz(divName) {
    console.log('Greetz' + divName);
}


//script for smooth scroll
$('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');


        if (target.length) {
            $('html,body').animate({ scrollTop: target.offset().top - 80}, 500);
            window.location.hash = hashStr;
            return false;
        }
    }
});

//sanity check key check
// var feed = new Instafeed({
//    get: 'tagged',
//    tagName: 'awesome',
//    clientId: '1e10647fea804bf9bda96435ea90eebc'
// });
// feed.run();

moreButton = $('.load-more');
// 
coreyFeed = new Instafeed({
get: 'user',
userId: 303777521,
accessToken: '1547287828.1e10647.be88b5479fdf4008a02ad67c7b3c6dcc',
limit: 8,
template: '<a class="col-md-2 bg" href="{{link}}"><img src="http://{{image}}" /></a>',

after: function() {
	if (!this.hasNext()) {
		moreButton.hide();
	}
}

});

// call feed.next() on button click
moreButton.on('click', function() {
	coreyFeed.next();
});

// cycle the divs
// //script to cycle quotes div
var divs = $('[id^="quote_"]').hide(),
    i = 0;

function cycle() {
    divs.eq(i).fadeIn(400)
        .delay(5000)
        .fadeOut(400, cycle);

    i = ++i % divs.length; // increment i,
    //   and reset to 0 when it equals divs.length
}





//go go go!
$(function() { // document ready

    coreyFeed.run();
    cycle();
    greetz('thing');

    $('.jcarousel-prev.jcarousel-prev-horizontal').click(function() {
        greetz('thing');
    });


}); // document over



// 
// //video slider
// var videos = ["saab", "volvo", "BWM"];
// var currentVid = document.getElementById("current-video").data("video-index"); //0
// var nextVid = currentVid++ //initialize nextVid
// 
// 
// nextVid.addEventListener("click",function(){ 
// 	currentVid.data("video-index", currentVideo);
//  });
// 
// function allowLoop(){
// 	if (currentVid === videos.length) {
// 	    // block of code to be executed if the condition is true
// 		var nextVid = videos[0]
// 	} else { 
// 	    var nextVid = videos[currentVid ++]
// 	}
// }



