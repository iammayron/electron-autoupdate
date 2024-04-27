const { app, Notification, BrowserWindow } = require('electron/main');
const path = require('path');
const url = require('url');
const { autoUpdater, AppUpdater } = require('electron-updater');

// Updater Flags
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

let win;

function createWindow() {
    win = new BrowserWindow();
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    // win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });
}

function createNotification(title, body) {
    new Notification({ title, body }).show();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (win === null) {
            createWindow();
        }
    });
}).then(() => {
    autoUpdater.checkForUpdates();
    createNotification('Hello World', 'Checking for updates...');
});

autoUpdater.on('update-available', (info) => {
    createNotification('Hello World', 'Update available!');
    let update = autoUpdater.downloadUpdate();
});

autoUpdater.on('update-not-available', (info) => {
    createNotification('Hello World', 'No update available :(');
});

autoUpdater.on('update-downloaded', (info) => {
    createNotification('Hello World', 'Update downloaded.');
});

autoUpdater.on('error', (info) => {
    createNotification('Hello World', info);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
