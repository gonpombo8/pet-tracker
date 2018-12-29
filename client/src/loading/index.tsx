import React from 'react';
import { CircularProgress } from '@material-ui/core';

import './styles.sass'

export default () => <div className="loading">
  <CircularProgress disableShrink size={50} />;
</div>
