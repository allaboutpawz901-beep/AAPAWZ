import {chromium} from "/workspace/professor/unleashed/node_modules/playwright-core/index.mjs";
const b=await chromium.launch({headless:true,executablePath:"/usr/bin/google-chrome-stable",args:["--no-sandbox"]});
const c=await b.newContext({viewport:{width:1440,height:900},extraHTTPHeaders:{"x-promptql-visitor-token":process.env.PROMPTQL_USER_JWT}});
const p=await c.newPage();const errors=[];
p.on("pageerror",e=>errors.push(e.message));
p.on("console",m=>{if(m.type()==="error")errors.push(m.text())});
await p.goto("http://127.0.0.1:8082",{waitUntil:"networkidle"});
await p.waitForSelector('select[aria-label="Active course"] option[value="4"]',{state:"attached"});
console.log((await p.locator("body").innerText()).slice(0,2800));
await p.screenshot({path:"/workspace/fresh-desktop.png",fullPage:true});
for(const size of [{width:1366,height:768},{width:1024,height:768},{width:390,height:844}]){
 await p.setViewportSize(size);await p.waitForTimeout(300);await p.screenshot({path:`/workspace/fresh-${size.width}.png`,fullPage:true});
 console.log(size,await p.evaluate(()=>({width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight,professor:document.querySelector('[data-testid="professor"]').getBoundingClientRect().toJSON(),work:document.querySelector('[data-testid="work-surface"]').getBoundingClientRect().toJSON(),nav:document.querySelector('[data-testid="bottom-rail"]').getBoundingClientRect().toJSON()})));
}
console.log({errors});await b.close();