import { app, BrowserWindow } from 'electron';
import path from 'path';

app.on('ready', () => {
  const windowOptions = {
    width: 500,
    height: 600,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  };

  const window = new BrowserWindow(windowOptions);

  if (__PROD__) {
    window.loadURL(path.resolve(__dirname, '../renderer/index.html'));
  } else {
    window.loadURL(path.resolve(process.cwd(), './src/renderer/index.html'));
  }

  window.webContents.openDevTools();

});
