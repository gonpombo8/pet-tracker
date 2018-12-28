// Fields that are present in both the DB and the Model
export interface CommonProps {
  avatar?: string;
  birthdate?: number;
  name: string;
  userId: string;
  type: 'dog' | 'cat';
  qr: string;
  username: string;
}

// Fields that are present in the DB but are NOT in the model
export interface Record extends CommonProps {
  _id?: string;
}

// Fields that are NOT present in the DB but are in the model
export interface Model extends CommonProps {
}
