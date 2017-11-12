const {app, BrowserWindow,dialog} = require('electron')
const path = require('path')
const url = require('url')
const sensor = require('./sensor')(onData)
const conf = require('./conf')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
var contador = 0
var ultimo = 0;
function onData(data){
    if(!data && contador==3){
      win.webContents.send('noMano',data)
    }else if(!data){
      contador++
      win.webContents.send('ping',ultimo)
    }else{
      win.webContents.send('ping',data)
      ultimo = data
      contador = 0
    }
}

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: conf.width, height: conf.height})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  sensor.start()

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    sensor.stop()
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

app.on('browser-window-created',function(e,window) {
    window.setMenu(null);
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
