const { ipcMain, app, BrowserWindow } = require('electron')
const path = require('path') // include the Node.js 'path' module at the top of your file

// Enable live reload for all the files inside your project directory
require('electron-reload')(__dirname + '/src');

app.whenReady().then(() => {
    createWindow()
})

// modify your existing createWindow() function
const createWindow = () => {
    const win = new BrowserWindow({
        minWidth: 840,
        minHeight: 320,
        width: 800,
        height: 600,
        show: false,
        frame: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('src/index.html')
    
    win.webContents.once('did-finish-load', function () {
        win.show();
        // loadingWindow.close();
    });

    ipcMain.on('app-minimize', () => {
        win.minimize();
    });
    
    ipcMain.on('app-maximize', () => {
        if(win.isMaximized()) {
            win.unmaximize();
        } else {
            win.maximize();
        }
    });
    
    ipcMain.on('app-close', () => {
        app.quit();
    });
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
