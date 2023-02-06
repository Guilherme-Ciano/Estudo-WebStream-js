const API_URL = "http://localhost:3000/";

async function consumeAPI(signal) {
  const response = await fetch(API_URL, {
    signal
  });

  const reader = response.body
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(parseNDJSON())
    // .pipeTo(
    //   new WritableStream({
    //     write(chunk) {
    //       console.log("chunk", chunk);
    //     }
    //   })
    // );

  return reader;
}

function appendToHTML(element) {
    return new WritableStream({
      write({ title, description, url_anime }) {
         const card = `
         <div class="card">
             <div class="title">${title}</div>
             <div class="content">${description.slice(0, 100)}</div>
             <a href="${url_anime}" target="_blank" class="saibaMais">Link do Anime</a>
         </div>
         `
        element.innerHTML += card;
      },
      abort(reason) {
        console.log('aborted**', reason)
      }
    });
  }
  

// certifica a conversão correta em caso de
// dois chunks cheguem na mesma transmissão
function parseNDJSON() {
  let ndjsonBuffer = "";
  return new TransformStream({
    transform(chunk, controller) {
      ndjsonBuffer += chunk;
      const items = ndjsonBuffer.split("\n");
      items
        .slice(0, -1)
        .forEach((item) => controller.enqueue(JSON.parse(item)));

      ndjsonBuffer = items[items.length - 1];
    },

    flush(controller) {
      if (!ndjsonBuffer) return;
      controller.enqueue(JSON.parse(ndjsonBuffer));
    }
  });
}

const [start, stop, cardWrapper] = ["start", "stop", "cardWrapper"].map((item) => document.getElementById(item));

// abortController.signal.abort() = Cancela todos os requests
let abortController = new AbortController();

start.addEventListener('click', async () => {
    const readable = await consumeAPI(abortController.signal)
    readable.pipeTo(appendToHTML(cardWrapper));
})

stop.addEventListener('click', () => {
    abortController.abort()
    abortController = new AbortController()
})