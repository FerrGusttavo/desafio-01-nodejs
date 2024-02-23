import fs from "fs";
import { parse } from "csv-parse";

// Nome do arquivo CSV externo
const arquivoCSV = new URL("./tasks.csv", import.meta.url);

async function run() {
  // Lê o arquivo CSV
  const csvParse = fs.createReadStream(arquivoCSV).pipe(
    parse({
      delimiter: ",",
      skipEmptyLines: true,
      // Pula o Header do arquivo .csv
      fromLine: 2,
    })
  );
  // Percorre cada linha do CSV
  for await (const line of csvParse) {
    const [title, description] = line;

    // Faz a requisição a cada linha do CSV para o end-point /tasks
    await fetch("http://localhost:3333/tasks", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
  }
}

run();
