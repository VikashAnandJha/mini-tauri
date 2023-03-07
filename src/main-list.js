const { createDir, BaseDirectory,existsSync,writeTextFile,exists,readTextFile } = window.__TAURI__.fs;
const { desktopDir } = window.__TAURI__.path;
const { appWindow,WebviewWindow  } =window.__TAURI__.window;
 

// appWindow.setDecorations(false)
  document
  .getElementById('titlebar-minimize')
  .addEventListener('click', () => appWindow.minimize())
document
  .getElementById('titlebar-maximize')
  .addEventListener('click', () => appWindow.toggleMaximize())
document
  .getElementById('titlebar-close')
  .addEventListener('click', () => appWindow.close())



  const openWindow=(url,label)=>{
    const webview = new WebviewWindow(label, {
      url: url,
      center:true,
      "height": 500,
       "width": 300, "decorations": true, "alwaysOnTop": true
    })
  
  }

 
   $('.note-list').click(function(){
    var url=$(this).attr("href");
    var name=$(this).attr("name");
    openWindow(url,name) 
   })







