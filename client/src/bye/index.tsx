import { RouteComponentProps } from 'react-router-dom';

import { setSession } from 'src/api/session-storage';


export default (props: RouteComponentProps) => {
  setSession({ jwt: undefined, refresh: undefined });
  props.history.push('/signin');

  return null;
}
