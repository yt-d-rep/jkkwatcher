import { notify } from './notify';
import { search } from './scrape';

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
  await exec();
})();
