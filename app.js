const puppeteer = require('puppeteer');
const path = require('path');



(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the page size to A4
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

    // Process the page into a PDF
    const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
    });

    try {
        // Save the PDF file
        require('fs').writeFileSync('MichalRusin_CV_2024_May.pdf', pdf);
        console.log('CV PDF file saved successfully.');
    } catch (error) {
        console.error('Error saving PDF file:', error);
        process.exit(1);
    }

    await browser.close();
})();
