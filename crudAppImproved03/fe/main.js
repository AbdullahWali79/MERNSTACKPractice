import { app, BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isDev = process.env.NODE_ENV === 'development'

// Backend URL - Always use local server
const BACKEND_URL = 'http://localhost:5000'

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false // Allow cross-origin requests
    }
  })

  // Load your React app
  if (isDev) {
    win.loadURL('http://localhost:3000')
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'))
  }

  // Inject backend URL into the window
  win.webContents.on('did-finish-load', () => {
    win.webContents.executeJavaScript(`
      window.BACKEND_URL = "${BACKEND_URL}";
    `)
  })
}

// Start the backend server when the app starts
import { spawn } from 'child_process'
import { join } from 'path'

const startBackend = () => {
  const backendPath = join(__dirname, '../be/server.js')
  const backend = spawn('node', [backendPath], {
    stdio: 'inherit'
  })

  backend.on('error', (err) => {
    console.error('Failed to start backend:', err)
  })
}

app.whenReady().then(() => {
  startBackend()
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}) 