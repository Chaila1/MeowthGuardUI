import {Builder, By, until} from 'selenium-webdriver';

async function runMewothGuard() {
    let driver = await new Builder().forBrowser('chrome').build();

    try{
        console.log("Running the Application...");
        await driver.get('http://localhost:5173/login')

        await driver.findElement(By.css('input[placeholder*="Please enter your username or email"]')).sendKeys('mattyb')
        await driver.findElement(By.css('input[type*="password"]')).sendKeys('password')
        await driver.findElement(By.css('.activeScanBtn')).click();

        await driver.wait(until.urlContains('/dashboard'), 5000);

        console.log("Waiting for the Dashboard...");
        let scanButton = await driver.wait(
            until.elementLocated(By.xpath("//button[contains(text(), 'Card Authenticator')]")),
            5000
        );
        await scanButton.click()
        console.log("Accessed the Scanner");

        await driver.wait(until.elementLocated(By.linkText("Card Library")), 5000);
        await driver.findElement(By.linkText("Card Library")).click();
        console.log("Accessed the Library");

        await driver.findElement(By.className("navLogout")).click();
        await driver.wait(until.urlContains('/login'), 5000);
        console.log("Testing suite has been succcessfully executed");

    } catch (e) {
        console.error("Testing suite has failed", e.message);
    } finally {
        await driver.quit();
    }
}

runMewothGuard();