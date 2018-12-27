import { CompileSchema } from 'async-app';
import { ParseOptions, parseSchema, Type } from 'mural-schema';

import customTypes from './custom-types';
const options: ParseOptions = { customTypes };

const compileSchemaFn: CompileSchema<Type> = (schema, ctx) => {
  try {
    return parseSchema(schema, options);
  } catch (e) {
    throw new Error(`Invalid schema ${ctx}: ${e.message}`);
  }
};

export default compileSchemaFn;
