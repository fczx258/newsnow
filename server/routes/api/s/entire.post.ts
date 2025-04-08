import { defineEventHandler, readBody } from 'h3';
import { db } from '../../db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { sources } = body;
  const dbInstance = db(event.context.cloudflare.env); // 获取 D1 数据库实例
  const placeholders = sources.map(() => '?').join(',');
  const stmt = await dbInstance.prepare(`SELECT * FROM news WHERE source IN (${placeholders})`);
  const results = await stmt.bind(...sources).all();
  return { status: 'success', data: results.results };
});
