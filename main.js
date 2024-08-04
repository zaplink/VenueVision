// Packages
const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

// Only include electron-reload in development mode
if (process.env.NODE_ENV === 'development') {
  require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
  });
}

function createWindow() {
  // Get the primary display size
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  const win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false // Needed for using Electron's require in the renderer process
    }
  });

  // Load the index.html file.
  win.loadFile('./src/index.html');
}

// This method will be called when Electron has finished initialization.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS, recreate a window in the app when the dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
