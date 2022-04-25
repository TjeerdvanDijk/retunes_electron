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

