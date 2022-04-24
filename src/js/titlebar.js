const { ipcRenderer } = require('electron');

document.getElementById('app-minimize').addEventListener('click', () => {
    ipcRenderer.send("app-minimize", true);
});

document.getElementById('app-close').addEventListener('click', () => {
    ipcRenderer.send("app-close", true);
});

document.getElementById('app-maximize').addEventListener('click', () => {
    ipcRenderer.send("app-maximize", true);
});



const needle = document.querySelector(".track-position-needle");
const needle_wiper = document.querySelector(".track-position-needle-wiper");
const needle_scaler = document.querySelector(".track-position-needle-scaler");
const track_ellapsed_part = document.querySelector(".track-position-ellapsed");



needle_wiper.addEventListener("mousedown", (event) => {
    document.addEventListener("mousemove", moveNeedle, false);
    document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", moveNeedle, false);
    }, false);
});

function moveNeedle(e) {
    range = needle_scaler.getBoundingClientRect().right - needle_scaler.getBoundingClientRect().left;
    pos = e.clientX - needle_scaler.getBoundingClientRect().left;
    percentage = ((pos - 3) / range) * 100;
    cappedPercentage = Math.max(0, Math.min(percentage, 100));
    needle.style.setProperty('margin-left', cappedPercentage + '%');
    track_ellapsed_part.style.setProperty('width', cappedPercentage + '%');
}
