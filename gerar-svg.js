const fs = require("fs");
const path = require("path");

const inputDir = "input";
const outputDir = "output";
const templatePath = "template.svg";

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
if (!fs.existsSync(templatePath)) {
  console.error("❌ template.svg não encontrado.");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf8");

const files = fs.readdirSync(inputDir).filter(f => f.endsWith(".json"));

files.forEach(file => {
  const data = JSON.parse(fs.readFileSync(path.join(inputDir, file), "utf8"));

  const { tipo, cor1, cor2, percent, texto } = data;
  const width = (percent / 100) * 700;

  let svg = template
    .replace(/{{COR1}}/g, cor1)
    .replace(/{{COR2}}/g, cor2)
    .replace(/{{WIDTH}}/g, width)
    .replace(/{{TEXTO}}/g, texto);

  const fileName = `${tipo}-${cor1.replace("#", "")}-${percent}.svg`;
  fs.writeFileSync(path.join(outputDir, fileName), svg);
  console.log(`✅ Gerado: ${fileName}`);
});
