import Redis from 'ioredis';

import { colors } from '../../src/constants/colors';

if (typeof process.env.REDIS_URL !== 'string') {
  throw new Error('Missing REDIS_URL');
}

const client = new Redis(process.env.REDIS_URL);

function mapVotes(colorVotes: Record<string, string>) {
  return colors.map((color) => ({
    ...color,
    count: (colorVotes[color.id] ? Number(colorVotes[color.id]) : 0) + 1,
  }));
}

export async function getColors() {
  const colorVotes = await client.hgetall('colorVotes');
  return mapVotes(colorVotes);
}

export async function vote(colorId: string) {
  await client.hincrby('colorVotes', colorId, 1);
  return true;
}
