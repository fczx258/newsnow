import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  return { status: 'success', message: 'Hello from dbtest route' };
});
