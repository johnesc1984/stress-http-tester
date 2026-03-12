const axios = require("axios");
const cliProgress = require('cli-progress');
const {
  reemplazarRandomEnObjeto,
  cumpleExpectedBody
} = require("./utils");
console.clear()
console.log(`**************************************************`)
console.log(`   _____ _______ _____  ______ _____ _____       `)
console.log(`  / ____|__   __|  __ \\|  ____/ ____/ ____|      `)
console.log(` | (___    | |  | |__) | |__ | (___| (___        `)
console.log(`  \\___ \\   | |  |  _  /|  __| \\___ \\\\___ \\       `)
console.log(`  ____) |  | |  | | \\ \\| |____ ____)|___) |     `)
console.log(` |_____/   |_|  |_|  \\_\\______|_____/_____/      `)
console.log(`                                                `)
console.log(`           STRESS HTTP TESTER TOOL               `)
console.log(`             BY JOHN CASTIBLANCO                 `)
console.log(`**************************************************`)

const bar = new cliProgress.SingleBar({
  format: 'Progreso |{bar}| {percentage}% || {value}/{total} Requests',
  barCompleteChar: '█',
  barIncompleteChar: '░',
  hideCursor: true
});

async function stressTest(config) {

  const {
    url,
    method = "GET",
    requests = 100,
    concurrency = 10,
    headers = { "Content-Type": "application/json" },
    payload = {},
    expectedStatus = 200,
    expectedBody = null
  } = config;

  if (!url) {
    throw new Error('Missing parameter "url"');
  }

  const METHOD = method.toUpperCase();
  const TOTAL_REQUESTS = parseInt(requests);
  const CONCURRENCY = parseInt(concurrency);

  let completed = 0;
  let failed = 0;
  let totalTime = 0;
  const requestLogs = [];

  async function makeRequest(index) {

    const start = Date.now();

    let logEntry = {
      numero: index + 1,
      status: null,
      tiempo_ms: null,
      exito: false,
      motivo: null
    };

    try {

      const numeroAleatorio = Math.floor(Math.random() * 100000000);

      const payloadConRandom = reemplazarRandomEnObjeto(payload, numeroAleatorio);

      const expectedBodyConRandom = expectedBody
        ? reemplazarRandomEnObjeto(expectedBody, numeroAleatorio)
        : null;

      const response = await axios({
        method: METHOD,
        url,
        data: payloadConRandom,
        headers
      });

      const duration = Date.now() - start;
      totalTime += duration;

      logEntry.status = response.status;
      logEntry.tiempo_ms = duration;

      const statusOk = response.status === expectedStatus;
      const bodyOk = cumpleExpectedBody(expectedBodyConRandom, response.data);

      if (statusOk && bodyOk) {
        logEntry.exito = true;
      } else {
        failed++;
        logEntry.motivo = "expectedBody dont Match";
      }

    } catch (err) {

      failed++;

      logEntry.status = err.response?.status || null;
      logEntry.tiempo_ms = Date.now() - start;
      logEntry.motivo = err.message;

    } finally {

      requestLogs.push(logEntry);
      completed++;

    }

  }


  async function runTest() {



    const batchCount = Math.ceil(TOTAL_REQUESTS / CONCURRENCY);
    let requestIndex = 0;



    bar.start(batchCount, 0);
    for (let i = 0; i < batchCount; i++) {



      bar.update(i+1);

      const batchSize = Math.min(CONCURRENCY, TOTAL_REQUESTS - completed);

      const batch = Array.from(
        { length: batchSize },
        () => makeRequest(requestIndex++)
      );

      await Promise.all(batch);

    }
    bar.stop();

    const avgTime = totalTime / (TOTAL_REQUESTS - failed || 1);

    return {
      exitosas: TOTAL_REQUESTS - failed,
      fallidas: failed,
      tiempo_promedio_ms: Number(avgTime.toFixed(2)),
      criterio_exito: {
        status_esperado: expectedStatus,
        body_esperado_base: expectedBody
      },
      resumen_peticiones: requestLogs
    };

  }

  return runTest();
}

module.exports = stressTest;