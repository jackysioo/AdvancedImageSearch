
const worker = Tesseract.createWorker({
  workerPath: 'https://unpkg.com/tesseract.js@v2.0.0/dist/worker.min.js',
  langPath: 'https://tessdata.projectnaptha.com/4.0.0',
  corePath: 'https://unpkg.com/tesseract.js-core@v2.0.0/tesseract-core.wasm.js',
});

var contextMenus = {};
contextMenus.convertImageToText = chrome.contextMenus.create(
  {"title": "ConvertImageToText",
"contexts": ["image"]},
  function(){
    if(chrome.runtime.lastError){
      console.error(chrome.runtime.lastError.message);
    }
  }
);

chrome.contextMenus.onClicked.addListener(contextMenuHandler);

function contextMenuHandler(info, tab){
  if(info.menuItemId===contextMenus.convertImageToText){
    (async () => {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize('https://pngimg.com/uploads/keep_calm/keep_calm_PNG10.png');
      console.log(text);
      await worker.terminate();
    })();
  }
};
