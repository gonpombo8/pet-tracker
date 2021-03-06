// Fields that are present in both the DB and the Model
export interface CommonProps {
  email: string;
  name: string;
  password?: string;
  surname?: string;
  username: string;
  type: 'member';
}

// Fields that are present in the DB but are NOT in the model
export interface DbUser extends CommonProps {
  phone?: string;
  address?: string;
  _id: string;
}

// Fields that are NOT present in the DB but are in the model
export interface User extends CommonProps {
  phone: string;
  address: string;
  _id: undefined;
}
