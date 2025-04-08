const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

// Lê todos os arquivos JSON de input
const inputs = fs.readdirSync("input").filter(file => file.endsWith(".json"));

async function gerarImagem({ tipo, cor1, cor2, percent }) {
  const url = `https://samwns.github.io/Animated-color-progesse-bar/?percent=${percent}&cor1=${cor1}&cor2=${cor2}&texto=${percent}%25%20${tipo}`;

  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: { width: 700, height: 28 },
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto(url);

  // Aguarda a animação acontecer
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Nome do arquivo
  const nome = `${tipo}-${cor1.replace("#", "")}-${percent}.png`;
  const caminho = path.resolve("output", nome);

  await page.screenshot({ path: caminho });
  await browser.close();
}

(async () => {
  for (const inputFile of inputs) {
    const dados = JSON.parse(fs.readFileSync(path.join("input", inputFile), "utf-8"));
    await gerarImagem(dados);
  }
})();
