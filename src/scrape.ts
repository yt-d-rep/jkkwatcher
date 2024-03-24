import puppeteer from 'puppeteer';
import { getFloorPlansFromEnv, getWardsFromEnv } from './env';
import { SearchResult } from './types/search';

/**
 * 空き家検索を実行し、検索結果が存在した場合はスクリーンショットを取得する
 * @returns 検索結果
 */
export const search = async (): Promise<SearchResult | null> => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // 検索画面
  const page = await browser.newPage();
  await page.goto(
    'https://jhomes.to-kousya.or.jp/search/jkknet/service/akiyaJyoukenStartInit',
    { waitUntil: 'networkidle0' }
  );

  // 'こちら'のaタグをクリックするために対象の要素を取得する
  const aTagAll = await page.$$('a');
  let tagText = [];
  let indicator = 0;
  for (let i = 0; i < aTagAll.length; i++) {
    tagText.push(
      await (await aTagAll[i].getProperty('textContent')).jsonValue()
    );
    if (tagText[i]?.match(/こちら/)) {
      indicator = i;
      break;
    }
  }

  // 'こちら'をクリックするとwindow.open()が実行されるため、新しいページを取得する
  const [newPage] = await Promise.all([
    browser
      .waitForTarget((t) => t.opener() === page.target())
      .then((t) => t.page()),
    aTagAll[indicator].click(),
  ]);

  // 区部を選択するチェックボックスのレンダリングを待つ
  await newPage?.waitForSelector('#chk_ku_all', { visible: true });

  // 対象となる区を選択する
  const wards = await getWardsFromEnv();
  for (const ward of wards) {
    const input = await newPage?.$(`input[value="${ward}"]`);
    await input?.click();
  }

  // 間取りを選択する
  const floorPlans = await getFloorPlansFromEnv();
  for (const floorPlan of floorPlans) {
    const input = await newPage?.$(`input[value="${floorPlan}"]`);
    await input?.click();
  }

  // 検索を実行する
  const searchButton = await newPage?.$('img[alt="検索する"');
  await searchButton?.click();
  await newPage?.waitForNavigation({ waitUntil: 'networkidle0' });

  // 検索結果が存在すればスクリーンショットを取得する
  // 右記ののようなタグの存在を確認する: <strong>2件が該当しました。</strong>
  const existsResult = await newPage?.$('strong');
  if (!existsResult) {
    await browser.close();
    return null;
  }

  const ssPath = 'example.png';
  await newPage?.screenshot({ path: ssPath });

  await browser.close();
  return { houses: [], screenshotPath: ssPath };
};
