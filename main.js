const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1400, height: 900, minWidth: 1100, minHeight: 700,
    title: 'Ҳакам — барномаи олимпиада',
    icon: path.join(__dirname, 'icon.png'),
    autoHideMenuBar: true,
    backgroundColor: '#F5F6FA',
    webPreferences: { contextIsolation: true, spellcheck: false }
  });
  win.maximize();
  win.loadFile(path.join(__dirname, 'app', 'index.html'));
  // Пайвандҳои беруна дар браузер кушода шаванд
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
}

app.whenReady().then(() => { Menu.setApplicationMenu(null); createWindow(); });
app.on('window-all-closed', () => app.quit());
