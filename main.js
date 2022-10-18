import { app, BrowserWindow } from 'electron';
import path from 'path';

const IS_DEV = process.env.IS_IN_DEVELOPMENT || false;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  })
  if (IS_DEV) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools()
  } else {
    win.loadURL(`file://${path.join(__dirname,'..','dist','index.html')}`)
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})