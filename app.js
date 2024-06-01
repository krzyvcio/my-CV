const puppeteer = require('puppeteer');
const path = require('path');



(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Ustawianie rozmiaru strony na A4
    await page.setViewport({
        width: 595,
        height: 842,
        deviceScaleFactor: 1,
    });

    try {
        await page.goto('file://' + path.join(__dirname, 'src', 'index.html'), { waitUntil: 'networkidle2' });
    } catch (error) {
        console.error('Error navigating to URL:', error);
        process.exit(1);
    }

    // Przerób stronę na plik PDF
    const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
    });

    // Zapisz plik PDF
    require('fs').writeFileSync('MichalRusin_CV_2024_May.pdf', pdf);

    await browser.close();
})();