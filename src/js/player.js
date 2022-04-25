
var pathToFfmpeg = require('ffmpeg-static');
const { exec } = require('child_process');


const track_time_current = document.querySelector(".track-time-current");
const track_time_total = document.querySelector(".track-time-total");
const track_position_needle = document.querySelector(".track-position-needle");
const track_position_ellapsed = document.querySelector(".track-position-ellapsed");
const track_position_needle_wiper = document.querySelector(".track-position-needle-wiper");
const track_position_needle_scaler = document.querySelector(".track-position-needle-scaler");


document.getElementById('play').addEventListener('click', () => playSong());


var currentsong = document.querySelector(".song");
currentsong.id = 'audio-player';
var isAif = true;


function playSong() {
    currentsong.pause();
    console.log("hoi");
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
    currentsong.play();
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
    currentsong.currentTime = currentsong.duration * (cappedPercentage /100);
}

function updateNeedle(percentage) {
    track_position_needle.style.setProperty('margin-left', percentage + '%');
    track_position_ellapsed.style.setProperty('width', percentage + '%');
    track_position_needle.style.setProperty('margin-left', percentage + '%');
    track_position_ellapsed.style.setProperty('width', percentage + '%');
}



function fancyTimeFormat(duration)
{   
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