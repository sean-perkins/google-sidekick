import { app, BrowserWindow, ipcMain } from 'electron';
import { client } from 'electron-connect';
import * as path from 'path';

let applicationRef: Electron.BrowserWindow = null;

const debugMode = false;

const mainWindowSettings: Electron.BrowserWindowConstructorOptions = {
    frame: true,
    titleBarStyle: 'hidden',
    resizable: false,
    movable: true,
    center: true,
    width: 1200,
    height: 800,
    show: false,
    icon: path.join(__dirname, 'assets/electron.png')
};

let initialLoad = false;

let childWindow: Electron.BrowserWindow = null;

const windows = {
    gmail: 'https://gmail.google.com',
    calendar: 'https://calendar.google.com',
    drive: 'https://drive.google.com'
};

function initMainListener() {
    ipcMain.on('ELECTRON_BRIDGE_HOST', (event, msg) => {
        console.log('msg received', msg);
        switch (msg) {
            case 'gmail':
            case 'drive':
            case 'calendar':
                childWindow.loadURL(windows[msg]);
                break;
        }
        // if (msg === 'ping') {
        //     event.sender.send('ELECTRON_BRIDGE_CLIENT', 'pong');
        // }
    });
}

function createWindow() {
    console.log('icon: ' + mainWindowSettings.icon);
    applicationRef = new BrowserWindow(mainWindowSettings);
    applicationRef.loadURL(`file:///${__dirname}/index.html`);
    if (debugMode) {
        // Open the DevTools.
        applicationRef.webContents.openDevTools();
    }
    applicationRef.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        applicationRef = null;
    });

    childWindow = new BrowserWindow({
        width: applicationRef.getBounds().width - 80,
        height: applicationRef.getBounds().height - 40,
        x: applicationRef.getBounds().x + 80,
        y: applicationRef.getBounds().y + 40,
        parent: applicationRef,
        modal: false,
        frame: false,
        minimizable: false,
        resizable: false,
        movable: false,
        // alwaysOnTop: true,
        transparent: true,
        hasShadow: false,
        thickFrame: false
    });
    childWindow.loadURL(`https://www.gmail.com`);

    initMainListener();

    client.create(applicationRef);

    applicationRef.on('ready-to-show', () => {
        if (!initialLoad) {
            applicationRef.show();
            initialLoad = true;
        }
    });

    applicationRef.on('hide', () => {
        childWindow.hide();
    });

    applicationRef.on('show', () => {
        childWindow.show();
    });
}


app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        // TODO perhaps hook this and wait for message bus before quitting?
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (applicationRef === null) {
        createWindow();
    }
});
