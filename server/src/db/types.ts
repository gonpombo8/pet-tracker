import mongodb from 'mongodb';

// A criteria is a partial T where the values can be either an instance of the
// actual type or an operator of that type.
interface Operator<T> {
  $in?: T|T[];
  $ne?: T;
}

export type Criteria<T> = {
  [P in keyof T]?: T[P] | Operator<T[P]>;
};

// A positive projection of { a: string, b: number } is { a: 1 }
export type PositiveProjection<T> = { [P in keyof T]?: 1; };
// A negative projection of { a: string, b: number } is { b: 0 }
export type NegativeProjection<T> = { [P in keyof T]?: 0; };

// A projection is either an all-positive or all-negative projection
// (or a node callback to keep the compiler happy)
export type Projection<T> =
  PositiveProjection<T>
  | NegativeProjection<T>
  | { only: (keyof T)[] }
  | mongodb.MongoCallback<any>;

export interface MongoCollection<T> extends mongodb.Collection<T> {
  findOne(
    criteria: Criteria<T>,
    projection?: Projection<T> | mongodb.FindOneOptions,
  ): Promise<T|null>;

  find(
    criteria: Criteria<T>,
    projection?: Projection<T> | mongodb.FindOneOptions,
  ): mongodb.Cursor<T>;
}

export interface Changes<T = { [key: string]: any }> {
  $set?: T;
  $unset?: T;
  $push?: T;
  $pull?: T;
}
