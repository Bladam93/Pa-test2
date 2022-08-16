
require("util").inspect.defaultOptions.depth = null;
jest.setTimeout(1200);
const baseURL = process.env.TEST_BASE_URL;

// Show the version of the browser used by Puppeteer if desired
//page.browser().version().then(version => console.log(version));

// Show logs from the page
const onPageConsole = msg => {
  Promise.all(msg.args().map(e => e.jsonValue()))
    .then(args =>
      console.log(`<LOG::page console ${msg.type()}>`, ...args)
    )
  ;
};
beforeAll(() => {
  page.setDefaultTimeout(1000);
});
beforeEach(() => {
  if (!page.listeners("console").includes(onPageConsole)) {
    page.on("console", onPageConsole);
  }
  
  // Reset mock function's states before each test.
  jest.clearAllMocks();
});

describe("ProgBasics PA", () => {
  beforeEach(async () => {
    await page.goto(baseURL, {waitUntil: "load"});
  });

  const type = async (symbol) => {
    await page.click(`#\\${symbol.charCodeAt(0).toString(16)} `);
  }
  
  const getDisplay = async () => {
    const result = await page.$eval('.display', el => el.innerText);;
    return result;
  }
  
  const getDisplayColor = async () => {
    const result = await page.$eval('.display', el => el.style.color);;
    return result;
  }
  
  it("Typing '1' followed by '+' followed by '1' followed by '=' should display '2'", async () => {
    await type('1');
    await type('+');
    await type('1');
    await type('=');
    const result = await getDisplay();
    await expect(result).toBe('2');
  });
  
  it("Typing '1' followed by '*' followed by '2' followed by '=' should display '2'", async () => {
    await type('1');
    await type('*');
    await type('2');
    await type('=');
    const result = await getDisplay();
    await expect(result).toBe('2');
  });
  
  it("Typing '3' followed by '/' followed by '2' followed by '=' should display '1'", async () => {
    await type('3');
    await type('/');
    await type('2');
    await type('=');
    const result = await getDisplay();
    await expect(result).toBe('1');
  });
  
  it("Typing '3' followed by '/' followed by '2' followed by '=' should display the result in color '#FF5733'", async () => {
    await type('3');
    await type('/');
    await type('2');
    await type('=');
    const result = await getDisplayColor();
    await expect(result).toBe("rgb(255, 87, 51)");
  });
  
  it("Typing '4' followed by '/' followed by '2' followed by '=' should display the result in color '#12796E'", async () => {
    await type('4');
    await type('/');
    await type('2');
    await type('=');
    const result = await getDisplayColor();
    await expect(result).toBe('rgb(18, 121, 110)');
  });
  
  
  it("Typing '4' followed by '/' followed by '/' followed by '=' should display the result '0'", async () => {
    await type('4');
    await type('/');
    await type('/');
    await type('=');
    const result = await getDisplay();
    await expect(result).toBe('0');
  });
  
  it("Typing '4' followed by '+' followed by '/' followed by '=' should display the result '0'", async () => {
    await type('4');
    await type('+');
    await type('/');
    await type('=');
    const result = await getDisplay();
    await expect(result).toBe('0');
  });
  
  it("Typing '/' followed by '4' followed by '=' should display the result '0'", async () => {
    await type('/');
    await type('4');
    await type('=');
    const result = await getDisplay();
    await expect(result).toBe('0');
  });
  
  it("Typing '*' followed by '4' followed by '=' should display the result '0'", async () => {
    await type('*');
    await type('4');
    await type('=');
    const result = await getDisplay();
    await expect(result).toBe('0');
  });
  
  it("Typing '+' followed by '4' followed by '=' should display the result '0'", async () => {
    await type('+');
    await type('4');
    await type('=');
    const result = await getDisplay();
    await expect(result).toBe('0');
  });
  
  it("Typing '4' followed by '/' followed by '/' should display the result '4/'", async () => {
    await type('4');
    await type('/');
    await type('/');
    const result = await getDisplay();
    await expect(result).toBe('4/');
  });
  
  it("Typing '4' followed by '/' followed by '+' should display the result '4/'", async () => {
    await type('4');
    await type('/');
    await type('+');
    const result = await getDisplay();
    await expect(result).toBe('4/');
  });
  
  it("Typing '4' followed by '/' followed by '*' should display the result '4/'", async () => {
    await type('4');
    await type('/');
    await type('*');
    const result = await getDisplay();
    await expect(result).toBe('4/');
  });
});
