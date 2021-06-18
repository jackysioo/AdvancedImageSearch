const { createWorker } = require('js/tesseract.min.js');

const worker = createWorker();

(async () => {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize('C:\Users\Jacky Sio\OneDrive\Documents\GitHub\AdvancedImageSearch\js\171024180054-keep-calm-full-169.jpg');
  console.log(text);
  await worker.terminate();
})();