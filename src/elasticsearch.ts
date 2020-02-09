import * as elasticsearch from 'elasticsearch';
import { debugBase } from './debuggers';

export const client = new elasticsearch.Client({
  hosts: ['http://localhost:9200/'],
});

export const fetchElk = async (action, index: string, body: any) => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'test') {
    return action === 'search' ? { total: { value: 0 }, hits: { hits: [] } } : 0;
  }

  try {
    const response = await client[action]({
      index,
      body,
    });

    return response;
  } catch (e) {
    debugBase(`Error during elk query ${e}`);
    throw new Error(e);
  }
};
