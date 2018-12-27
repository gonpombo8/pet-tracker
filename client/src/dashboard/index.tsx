import React from 'react';

import { User } from 'src/api/user';

interface PropTypes {
  user: User;
}

export default (props: PropTypes) => {
  return <div>Dashboard {props.user.name}</div>;
}
