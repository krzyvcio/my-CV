const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Ustawianie rozmiaru strony na A4
    await page.setViewport({
        width: 595,
        height: 842,
        deviceScaleFactor: 1,
    });

    // Wczytywanie pliku HTML i CSS
    await page.goto('./src/index.html', { waitUntil: 'networkidle2' });

    // Przerób stronę na plik PDF
    const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
    });

    // Zapisz plik PDF
    require('fs').writeFileSync('output.pdf', pdf);

    await browser.close();
})();