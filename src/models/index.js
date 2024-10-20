import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema.js';

const { Recipe, Project } = initSchema(schema);

export {
  Recipe,
};