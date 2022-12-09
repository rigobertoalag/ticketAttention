const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

let mainWindow = {}

function createWindow (){
    mainWindow = new BrowserWindow({
        width:320,
        height: 800,
        webPreferences:{
            preload: path.join(__dirname,'preload.js'),
            nodeIntegration: true
        }
    })

    if(isDev){
        mainWindow.loadURL('http://localhost:3000')
    }else{
        mainWindow.loadFile(`${path.join(__dirname, '../build/index.html')}`)
    }

    // mainWindow.loadFile('public/index.html')
}

app.whenReady().then(() => {
    createWindow()

    // app.on('activate', () => {
    //     if(BrowserWindow.getAllWindows().length === 0) createWindow()
    // })
})