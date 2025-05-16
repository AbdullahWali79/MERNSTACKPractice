const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./main/db');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'main/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    autoHideMenuBar: true,
  });

  win.setMenuBarVisibility(false);

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, 'dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handlers for invoices
ipcMain.handle('invoices:list', () => db.getAllInvoices());
ipcMain.handle('invoices:add', (event, invoice) => db.addInvoice(invoice));
ipcMain.handle('invoices:update', (event, invoice) => db.updateInvoice(invoice));
ipcMain.handle('invoices:delete', (event, id) => db.deleteInvoice(id)); 