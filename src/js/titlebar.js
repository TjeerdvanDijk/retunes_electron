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


// VOLUME ACCENT

const volume_control = document.querySelector("#volume-slider");
const volume_control_accent = document.querySelector(".volume-slider-accent-end");

volume_control.addEventListener("mousedown", (event) => {
    moveVolume(event);
    document.addEventListener("mousemove", moveVolume, false);
    document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", moveVolume, false);
    }, false);
});

function moveVolume(e) {
    range = volume_control.getBoundingClientRect().right - volume_control.getBoundingClientRect().left;
    pos = e.clientX - volume_control.getBoundingClientRect().left;
    percentage = ((pos - 3) / range) * 100;
    cappedPercentage = Math.max(0, Math.min(percentage, 100));
    volume_control_accent.style.setProperty('margin-left', cappedPercentage + '%');
    volume_control_accent.style.setProperty('width', (100 - cappedPercentage) + '%');
}


// TRACK