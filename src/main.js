const { createDir, BaseDirectory,existsSync,writeTextFile,exists,readTextFile } = window.__TAURI__.fs;
const { desktopDir } = window.__TAURI__.path;
const { appWindow } =window.__TAURI__.window;

// Create the `$APPDATA/users` directory
    //createDir('abcd', { dir: BaseDirectory.Desktop, recursive: true });
 
    async function check(){
      const desktopPath =   await desktopDir();

      console.log(desktopPath)

      let already = await exists(desktopPath+"mini_data.txt")
       
      let contents=`
Hi 👋,
Thanks For choosing mini
Its a simple and lightweight note taking app
Made for you.
You dont need to save the text
mini does this automatically for you!
  
Start Writing 🤗
      
      
      `
      if(!already)
      writeTextFile("mini_data.txt",contents,{ dir: BaseDirectory.Desktop })
      else{
         contents = await readTextFile('mini_data.txt', { dir: BaseDirectory.Desktop });
       
        //

      }

      document.getElementById("textinput").value=contents;
       
    }
    check();

//sav
var title=document.title;
document.getElementById("textinput").addEventListener("keyup",function(){

    let text=document.getElementById("textinput").value;
    console.log(text)
 
    appWindow.setTitle("Saving..")
    setTimeout(function(){
       
    appWindow.setTitle(title)
    },500)


    writeTextFile("mini_data.txt",text,{ dir: BaseDirectory.Desktop })
      
  })

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
