//sources: 
// https://www.youtube.com/watch?v=BQ-9e13kJ58
// https://www.npmjs.com/package/chromedriver
// https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs

require('dotenv').config();
require('chromedriver');
const { Builder, By, Key } = require("selenium-webdriver");

const startingPoint = process.env["starting_point"];
const destination = process.env["destination"];

index();

async function index() {
  const driver = await new Builder().forBrowser("chrome").build();

  await waitFor(1500);
  // await chrome.get("https://www.google.com/maps");
  await driver.get("https://www.google.com/maps/dir///@44.9763834,-93.2797639,11.97z/data=!4m2!4m1!3e0?hl=en");

  // const input = await chrome.findElement(By.css("input#searchboxinput"));
  const startingPointWebElement = await driver.findElement(By.css('input[aria-label="Choose starting point, or click on the map..."]'));
  const destinationWebElement = await driver.findElement(By.css('input[aria-label="Choose destination..."]'));
  await waitFor(1500);

  await startingPointWebElement.sendKeys(startingPoint);
  await waitFor(1500);
  await destinationWebElement.sendKeys(destination);

  await waitFor(1000);

  // EITHER THIS:
  await destinationWebElement.sendKeys(Key.ENTER);
  // OR THIS:
  // const searchButtonWebElement = await driver.findElement(By.css('div#directions-searchbox-1 button[aria-label="Search"]'));
  // await searchButtonWebElement.click();

  const optionsButtonWebElement = await driver.findElement(By.css('button[jstcache="47"]'));
  await optionsButtonWebElement.click();

  await waitFor(1000);
  const highwayOptionWebElement = await driver.findElement(By.css("label[for='pane.directions-options-avoid-highways']"));
  await highwayOptionWebElement.click();
  await waitFor(500);
  const tollsOptionWebElement = await driver.findElement(By.css("label[for='pane.directions-options-avoid-tolls']"));
  await tollsOptionWebElement.click();

  // await waitFor(1500);
}

function waitFor(milliseconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, milliseconds);
  });
}