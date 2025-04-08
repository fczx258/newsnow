import { defineEventHandler } from 'h3';
import { db } from '../../db';

export default defineEventHandler(async (event) => {
  try {
    // 检查 env 是否存在
    if (!event.context.cloudflare || !event.context.cloudflare.env) {
      return { status: 'error', message: 'Cloudflare env not found' };
    }

    // 获取 D1 数据库实例
    const dbInstance = db(event.context.cloudflare.env);
    if (!dbInstance) {
      return { status: 'error', message: 'D1 database not found in env' };
    }

    // 执行查询
    const results = await dbInstance.prepare('SELECT * FROM news LIMIT 1').all();
    if (!results.success) {
      return { status: 'error', message: 'Query failed', error: results.error };
    }

    // 检查返回结果
    if (!results.results || results.results.length === 0) {
      return { status: 'error', message: 'No data found in news table' };
    }

    return { status: 'success', data: results.results };
  } catch (error) {
    return { status: 'error', message: 'Server error', error: error.message };
  }
});
