const puppeteer = require('puppeteer');

const urlAlvo = 'https://protestosp.com.br/consulta-de-protesto';
const cpf = '308.609.640-35';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    slowMo: 250
  });
  const page = await browser.newPage();

  await page.goto(urlAlvo);

  //ACEITANDO COOKIES
  await page.waitForSelector('#cookiefirst-root > div > div > div.cfAdwL.cf7ddU > div.cf2L3T.cfysV4.cf3l36 > div.cf3Tgk.cf2pAE.cf1IKf > div:nth-child(2) > button > span');
  await page.click('#cookiefirst-root > div > div > div.cfAdwL.cf7ddU > div.cf2L3T.cfysV4.cf3l36 > div.cf3Tgk.cf2pAE.cf1IKf > div:nth-child(2) > button > span');

  //ESCOLHE A CONSULTA NACIONAL
  await page.waitForSelector('#AbrangenciaNacional');
  await page.click('#AbrangenciaNacional');

  //ESCOLHER CPF 
  await page.waitForSelector('#TipoDocumento');
  await page.select('select#TipoDocumento', '1');

  //ADICIONANDO CPF
  await page.waitForSelector('#Documento');
  await page.type('#Documento', cpf);

  //CLICAR BTN CONSULTAR
  await page.waitForSelector('.btn-padrao.blue.borderEffect2.mt-3.hoverEffect.wider3');
  await page.click('.btn-padrao.blue.borderEffect2.mt-3.hoverEffect.wider3');

  await page.waitForSelector('.labelTotalOutros');

  await page.screenshot({ path: `./Pesquisa-${cpf}.png`, fullPage: true })

  await browser.close();
})();