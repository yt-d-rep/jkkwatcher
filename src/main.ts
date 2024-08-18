import cron from 'node-cron';
import { notify } from './adapter/notify';
import { search } from './adapter/scrape';

const exec = async () => {
  // 検索
  const result = await search();
  if (!result) {
    return;
  }
  // 通知
  await notify({ filePath: result.screenshotPath });
};

(async () => {
  console.log('Runnnig cron job...');
  cron.schedule('0 3 * * * ', async () => {
    await exec();
  });
})();
