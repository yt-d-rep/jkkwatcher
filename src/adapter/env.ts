/**
 * 検索対象となる区のリストを取得する
 * @returns 区のリスト
 */
export const getWardsFromEnv = async (): Promise<string[]> => {
  const wards = process.env.WARDS;
  if (!wards || wards === '') {
    return ['14', '15'];
  }
  return wards.split(',');
};

/**
 * 検索対象となる間取りのリストを取得する
 * @returns 間取りのリスト
 */
export const getFloorPlansFromEnv = async (): Promise<string[]> => {
  const floorPlans = process.env.FLOOR_PLANS;
  if (!floorPlans || floorPlans === '') {
    return ['2', '3'];
  }
  return floorPlans.split(',');
};

/**
 * 通知先のトークンを取得する
 * @returns トークン
 */
export const getNotifyToken = async (): Promise<string> => {
  const token = process.env.NOTIFY_TOKEN;
  if (!token || token === '') {
    throw new Error('NOTIFY_TOKEN is not defined');
  }
  return token;
};

/**
 * 通知先のチャンネルを取得する
 * @returns チャンネル
 */
export const getChannel = async (): Promise<string> => {
  const channel = process.env.CHANNEL;
  if (!channel || channel === '') {
    return '#app-jkk';
  }
  return channel;
};
