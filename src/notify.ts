import { WebClient } from '@slack/web-api';
import { getNotifyToken, getChannel } from './env';
import { NotifyRequest } from './types/search';
import fs from 'fs';

export const notify = async (req: NotifyRequest) => {
  const token = await getNotifyToken();
  const client = new WebClient(token);
  const channel = await getChannel();

  const file = await client.files.upload({
    channels: channel,
    file: fs.createReadStream(req.filePath),
    title: '空き家検索結果',
  });

  if (!file || !file.ok) {
    throw new Error('Failed to upload a file');
  }
};
