import { defineEventHandler } from 'h3';
import { db } from '../../db';

export default defineEventHandler(async (event) => {
  const dbInstance = db(event.context.cloudflare.env);
  const results = await dbInstance.prepare('SELECT * FROM news LIMIT 1').all();
  return { status: 'success', data: results.results };
});
