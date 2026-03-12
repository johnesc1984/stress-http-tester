#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const stressTest = require("./src/stressTest");


async function run() {



  const file = process.argv[2];

  if (!file) {
    console.log("\nUso:");
    console.log("stress-http-tester test.json\n");
    process.exit(1);
  }

  const filePath = path.resolve(process.cwd(), file);

  if (!fs.existsSync(filePath)) {
    console.error("Archivo no encontrado:", file);
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(filePath));




  console.log("\nIniciando prueba de estrés...\n");

  const start = Date.now();

  try {

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
   
    config.progressBar = true
    const result = await stressTest(config);


    const totalTime = Date.now() - start;

    const rps = (config.requests / (totalTime / 1000)).toFixed(2);



    console.log("\nRESULTADOS\n");

    console.log("Total requests:", config.requests);
    console.log("Exitosas:", result.exitosas);
    console.log("Fallidas:", result.fallidas);
    console.log("Tiempo promedio:", result.tiempo_promedio_ms, "ms");
    console.log("Requests por segundo (RPS):", rps);

    console.log("\nDetalle:");
    console.log(JSON.stringify(result, null, 2));

  } catch (err) {

    console.error("Error:", err.message);

  }

}

run();