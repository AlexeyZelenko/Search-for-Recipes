import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema.js';

const { Recipe } = initSchema(schema);

export {
  Recipe,
};