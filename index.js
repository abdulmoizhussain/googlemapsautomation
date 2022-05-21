//sources: 
// https://www.youtube.com/watch?v=BQ-9e13kJ58
// https://www.npmjs.com/package/chromedriver

require('chromedriver');
const { Builder, By, Key } = require("selenium-webdriver");

async function index() {

  const chrome = await new Builder().forBrowser("chrome").build();

  await waitFor(1500);
  await chrome.get("https://www.google.com/maps");

  const input = await chrome.findElement(By.css("input#searchboxinput"));
  await waitFor(1500);

  // direct directions URL:
  // "https://www.google.com/maps/dir///@44.9763834,-93.2797639,11.97z/data=!4m2!4m1!3e0?hl=en"
  
  input.sendKeys("starting_point");
  // input.sendKeys("destination");

  await waitFor(1500);
  await input.sendKeys(Key.RETURN);
}

index();


function waitFor(milliseconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, milliseconds);
  });
}