import { createWorker } from "tesseract.js";

import express from "express";
const app = express();


app.get("/test-ocr/:language", async function (req, res) {
  const worker = createWorker({
    logger: (m) => console.log(m),
  });
  const language = req.params.language
  let url = '';
  switch(language){
    case 'japan': 
      url = 'https://okuchy.s3.ap-southeast-1.amazonaws.com/japan.png';
      break;
    case 'france': 
      url = 'https://okuchy.s3.ap-southeast-1.amazonaws.com/paris.png';
      break;
    case 'thailand': 
      url = 'https://okuchy.s3.ap-southeast-1.amazonaws.com/thailand.png';
      break;
    case 'vietnam': 
      url = 'https://okuchy.s3.ap-southeast-1.amazonaws.com/vietnamese.png';
      break;
    case 'english':
      url = 'https://okuchy.s3.ap-southeast-1.amazonaws.com/english-2.png';
      break;
    default :
      url = 'https://tesseract.projectnaptha.com/img/eng_bw.png';
      break;
  }
  (async () => {
    await worker.load();
    await worker.loadLanguage("jpn");
    await worker.initialize("jpn");
    const {
      data: { text },
    } = await worker.recognize(
      url
    );
    console.log(text);
    await worker.terminate();
    res.send({
      img : url,
      text
    });
  })();
});

app.listen(3333);


