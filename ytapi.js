/*!
 * YouTube api with Bootstrap 3  v.1 https://github.com/robmccormack/tb-youtube-api
 * Copyright 2014 Rob McCormack.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */


/*
http://stackoverflow.com/questions/5194619/getting-youtube-video-information-using-javascript-jquery
*/

$(document).ready(function() {
    var id = "vslQm7IYME4";
    var t = 0; // time to start in seconds

    /*
 pass the id and the start time to function
 $(function() {
setTimeout("getYouTubeInfo(id, t)", 8000);
 });
*/
    // pause the script, to allow message to be read

    myVar = setTimeout(function() {
        getYouTubeInfo(id, t);
    }, 5000);
    //getYouTubeInfo(id, t);

    // $('#alertmess').show().fadeOut(3000);
});


$(function() {
    // this is the jQuery function if testButton is clicked
    $('#btnChangeVid').click(function() {
        var id = "zJahlKPCL9g";
        var t = 50; // time to start  in seconds
        getYouTubeInfo(id, t);
    }); // end  btn function
}); // end function


function getYouTubeInfo(id, t) {

    // enter your YouTube id here:
    //   id = "zJahlKPCL9g";
    //var id = "vslQm7IYME4";

    var url = "http://gdata.youtube.com/feeds/api/videos/" + id + "?v=2&alt=json";
    $.ajax({
        url: url,
        dataType: "jsonp",
        success: function(data) {
            parseresults(data)
        }
    });

    // EMBED for iFrame
    var frame = '<iframe title="Youtube Video Player" width="640" height="390" src="http://www.youtube.com/embed/' + id + '?fs=1&autoplay=0&loop=0&start= ' + t + '" frameborder="0" allowfullscreen style="border: 1px solid black"></iframe>';
    $('#yt-frame').hide().html(frame).fadeIn(3000).delay(200);


}

function parseresults(data) {
    var title = data.entry.title.$t;
    var link = data.entry.link[0].href;

    var description = data.entry.media$group.media$description.$t;

    var published = data.entry.published.$t;


    /* from JSON file, date format
        "published": {
      "$t": "2014-02-03T13:46:12.000Z"
    */

    // convert the date
    var published = new Date(published);

    // thumbnail is an array, zero id default
    var thumbnail = data.entry.media$group.media$thumbnail[0].url;

    // thumbnails available
    var thumbnail1 = data.entry.media$group.media$thumbnail[4].url;

    var thumbsec1 = data.entry.media$group.media$thumbnail[4].time;
    // ??? get this working with thumb and link alert (thumbsec1);


    var thumbnail2 = data.entry.media$group.media$thumbnail[5].url;
    var thumbnail3 = data.entry.media$group.media$thumbnail[6].url;




    var viewcount = data.entry.yt$statistics.viewCount;

    var author = data.entry.author[0].name.$t;
    //data.entry.media$group.media$description.$t;
    var duration = data.entry.media$group.yt$duration.seconds;

    // String.prototype at bottom

    duration = duration.toHHMMSS();

    $('#yt-title').html(title);


    // no work fo some reason
    $('#yt-link').html('<a href="' + link + '" class="btn btn-danger btn-xs" >view on YouTube</a>');


    // can we fade in?
    //  $('#message').hide().html("You clicked on a checkbox.").fadeIn('slow');

    $('.yt-description').hide().html('<b>Description</b>: ' + description).fadeIn(3000);
    $('#yt-author').hide().html('<b>Author</b>: ' + author).fadeIn(5000);
    $('#yt-published').html('<b>Published</b>: <small> ' + published + '</small>');



    $('#yt-viewcount').html('<br/><b>Views</b>: ' + addCommas(viewcount));


    $('#yt-thumbnail').hide().html('<img src=" ' + thumbnail + '" alt="">').delay(2000).fadeIn(4000);

    $('#yt-thumbnail1').html('<img src=" ' + thumbnail1 + '" alt="" class="img-rounded pad5">');
    $('#yt-thumbnail2').html('<img src=" ' + thumbnail2 + '" alt="" class="img-rounded pad5">');
    $('#yt-thumbnail3').html('<img src=" ' + thumbnail3 + '" alt="" class="img-rounded pad5">');


    $('#yt-duration').html('<b>Duration: </b><small>' + duration + '</small>');
}


var spin = "⣾⣽⣻⢿⡿⣟⣯⣷",
    title$ = $('#spinner'),
    i = 0;
setInterval(function() {
    i = i == spin.length - 1 ? 0 : ++i;
    title$.text(spin[i]);
}, 300);


function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}


//http://stackoverflow.com/questions/6312993/javascript-seconds-to-time-with-format-hhmmss
String.prototype.toHHMMSS = function() {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
}