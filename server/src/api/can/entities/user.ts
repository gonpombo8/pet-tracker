import { Entities } from '../../../core/async-app';

const user = {
  edit: ({ claims, user }: Entities) => user.username === claims.username,
};

export default user;
