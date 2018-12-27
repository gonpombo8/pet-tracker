import { Record, Model } from './types';
import parseModel from './parse-model';

export type Pet = Model;
export type PetRecord = Record;

export default (record: Record): Pet => {
  const props = parseModel(record);

  return {
    ...props,
  };
};
