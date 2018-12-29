import React from 'react';

import getPosition from 'src/helpers/get-position';

interface StateTypes {
  position?: Position;
  error?: string;
}

interface PropTypes {
}

class Qrcode extends React.Component<PropTypes, StateTypes> {
  state: StateTypes = {};

  async componentDidMount() {
    const { error, position } = await getPosition();
    console.log({ pos: position });
    this.setState({ error, position });
  }

  render() {
    return <div>
      QRCODE
      {this.state.error && alert(this.state.error)}
    </div>
  }
}

export default Qrcode;
