const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function gerarImagem(tipo, cor1, cor2, percent, texto) {
  const url = `file://${path.resolve('index.html')}?percent=${percent}&cor1=${cor1}&cor2=${cor2}&texto=${encodeURIComponent(texto)}`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 700, height: 28 });

  await page.goto(url);
  await page.waitForTimeout(2000); // Espera a animação acontecer

  const nome = `${tipo}-${cor1.replace('#', '')}-${percent}.png`;
  const caminho = path.resolve('output', nome);
  await page.screenshot({ path: caminho });

  await browser.close();
}

(async () => {
  const dados = JSON.parse(fs.readFileSync('input/dados.json', 'utf8'));
  for (const item of dados) {
    await gerarImagem(item.tipo, item.cor1, item.cor2, item.percent, item.texto);
  }
})();
