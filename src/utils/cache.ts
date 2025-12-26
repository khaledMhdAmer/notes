import Redis from 'ioredis';
import { config } from '../config/environment';

const redis = new Redis(config.cache.redisUrl);

redis.on('error', error => {
  console.error('[Redis] connection error:', error.message);
});

const DEFAULT_TTL = Math.max(config.cache.ttlSeconds, 1);

export const cacheClient = redis;

export const getCachedJson = async <T = unknown>(key: string): Promise<T | null> => {
  try {
    const cached = await redis.get(key);
    return cached ? (JSON.parse(cached) as T) : null;
  } catch (error) {
    console.warn(`[Redis] failed to read key ${key}:`, error);
    return null;
  }
};

export const setCachedJson = async <T = unknown>(key: string, value: T, ttlSeconds = DEFAULT_TTL) => {
  try {
    await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
  } catch (error) {
    console.warn(`[Redis] failed to set key ${key}:`, error);
  }
};

export const invalidateCacheKeys = async (keys: string[]) => {
  if (!keys.length) return;

  try {
    await redis.del(keys);
  } catch (error) {
    console.warn('[Redis] failed to delete keys:', keys, error);
  }
};
