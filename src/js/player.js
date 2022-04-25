
var pathToFfmpeg = require('ffmpeg-static');
const { exec } = require('child_process');


const track_title = document.querySelector(".track-title");
const track_artist = document.querySelector(".track-artist");
const track_time_current = document.querySelector(".track-time-current");
const track_time_total = document.querySelector(".track-time-total");
const track_position_needle = document.querySelector(".track-position-needle");
const track_position_ellapsed = document.querySelector(".track-position-ellapsed");
const track_position_needle_wiper = document.querySelector(".track-position-needle-wiper");
const track_position_needle_scaler = document.querySelector(".track-position-needle-scaler");



var currentsong = document.querySelector(".song");
currentsong.id = 'audio-player';
var isAif = true;


// VOLUME ACCENT

const volume_slider = document.querySelector("#volume-slider");
const volume_control_accent = document.querySelector(".volume-slider-accent-end");

volume_slider.addEventListener("mousedown", (event) => {
    moveVolume(event);
    document.addEventListener("mousemove", moveVolume, false);
    document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", moveVolume, false);
    }, false);
});

function moveVolume(e) {
    range = volume_slider.getBoundingClientRect().right - volume_slider.getBoundingClientRect().left;
    pos = e.clientX - volume_slider.getBoundingClientRect().left;
    percentage = ((pos - 3) / range) * 100;
    cappedPercentage = Math.max(0, Math.min(percentage, 100));
    volume_control_accent.style.setProperty('margin-left', cappedPercentage + '%');
    volume_control_accent.style.setProperty('width', (100 - cappedPercentage) + '%');
    currentsong.volume = cappedPercentage / 100;
    // console.log(cappedPercentage);
}

// buttons on titlebar
document.getElementById('play').addEventListener('click', () => {
    if (!currentsong.src) {
        loadFirstSong();
    }
    currentsong.play();
});
document.getElementById('pause').addEventListener('click', () => {currentsong.pause();});

function loadFirstSong() {
    loadSong("");
}

function loadSong(path) {
    currentsong.pause();
    if (isAif) {
        exec(pathToFfmpeg + " -y -i Wave.aif prepairedsong/Wave.wav", (err, stdout, stderr) => {
            if (err) {
                return;
            }
        });
        currentsong.src = '../prepairedsong/Wave.wav';
    } else {
        currentsong.src = '../Flip.mp3';
    }
    currentsong.volume = volume_slider.value / 100; // initial volume

    navigator.mediaSession.metadata = new MediaMetadata({
        title: "As It Was",
        artist: "Harry Styles",
        album: "Album",
        // artwork: [
        //     { src: "../images/ARTWORK.jpg", sizes: "192x192", type: "image/png" }
        // ]
    });
}


navigator.mediaSession.setActionHandler('previoustrack', function() { console.log("previousTrack"); });
navigator.mediaSession.setActionHandler('nexttrack', function() { console.log("nextTrack"); });

currentsong.onplay = function () {
    navigator.mediaSession.playbackState = "playing";
    document.getElementById('play').style.setProperty('display', 'none');
    document.getElementById('pause').style.setProperty('display', 'flex');
}

currentsong.onpause = function () {
    navigator.mediaSession.playbackState = "paused";
    document.getElementById('play').style.setProperty('display', 'flex');
    document.getElementById('pause').style.setProperty('display', 'none');
}
currentsong.onloadeddata = function () {
    track_title.innerHTML = navigator.mediaSession.metadata.title;
    track_artist.innerHTML = navigator.mediaSession.metadata.artist;
    track_time_total.innerHTML = fancyTimeFormat(currentsong.duration);
    currentsong.play();
    document.querySelector('.hide-track-info').style.setProperty('display', 'contents');
    document.querySelector('.app-title').style.setProperty('display', 'none');
}

currentsong.addEventListener("timeupdate", () => {
    track_time_current.innerHTML = fancyTimeFormat(currentsong.currentTime);
    var percentage = (currentsong.currentTime / currentsong.duration) * 100;
    updateNeedle(percentage);

});

track_position_needle_wiper.addEventListener("mousedown", (event) => {
    moveNeedleByMouse(event);
    document.addEventListener("mousemove", moveNeedleByMouse, false);
    document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", moveNeedleByMouse, false);
    }, false);
});

function moveNeedleByMouse(e) {
    range = track_position_needle_scaler.getBoundingClientRect().right - track_position_needle_scaler.getBoundingClientRect().left;
    pos = e.clientX - track_position_needle_scaler.getBoundingClientRect().left;
    percentage = ((pos - 3) / range) * 100;
    cappedPercentage = Math.max(0, Math.min(percentage, 100));
    updateNeedle(cappedPercentage);
    currentsong.currentTime = currentsong.duration * (cappedPercentage / 100);
}

function updateNeedle(percentage) {
    track_position_needle.style.setProperty('margin-left', percentage + '%');
    track_position_ellapsed.style.setProperty('width', percentage + '%');
    track_position_needle.style.setProperty('margin-left', percentage + '%');
    track_position_ellapsed.style.setProperty('width', percentage + '%');
}



function fancyTimeFormat(duration) {
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}