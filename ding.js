const puppeteer = require('puppeteer');

const studentId = "xxxxxxxxx";
const password="xxxxxxxxxx";
const url = "https://bdmobile.zjou.edu.cn/webroot/decision/view/form?op=h5&viewlet=%25E6%258A%25A5%25E5%25B9%25B3%25E5%25AE%2589%25E5%25AE%259A%25E4%25BD%258D%25E7%2589%2588.frm#/form";
async function punch(){
    const browser = await puppeteer.launch({
        headless : true,
        defaultViewport: {
            width: 1960,
            height: 2000,
          }
    });
    const page = await browser.newPage();
    try{
        await page.goto(url)
    }catch(e){
        console("网页打开失败了,请重试");
        await browser.close();
    }
    //填写学号
    try {
        // 找到密码的标签元素
        let write_studentId = await page.$x('//input[@id="username"]', {
          waitForTimeout: 3000
        });
        await write_studentId[0].type(studentId)
      } catch (e) {
        console.log("学号输入失败！");
      }

    await page.waitForTimeout(2000);

    //填写密码
    try {
      // 找到密码的标签元素
      let write_password = await page.$x('//input[@id="password"]', {
        waitForTimeout: 3000
      });
      await write_password[0].type(password)
    } catch (e) {
      console.log("密码输入失败！");
    }
    //提交登录信息
    
    let login = await page.$('.loginMouth > button:nth-child(6)');
    await Promise.all([login.click(), page.waitForNavigation()]);
    //点击温度
    let btn = await page.waitForSelector('#TW1 > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(1) > div > div.css-901oao.css-cens5h',
        { timeout: 5000 }
    );
    await btn.click();
    //是否在校
    await page.click('#JRSFZX > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)');
    //获取位置
    await page.click('#HQDW > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)');
    let determine_btn = await page.waitForSelector('.r-1niwhzg > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)',
        { timeout: 10000 }
    );
    await determine_btn.click();
    //提交表单
    await page.click('#BT_CLICK > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)');
}
punch()