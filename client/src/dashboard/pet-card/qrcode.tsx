import React from 'react';
import QRCode from 'qrcode';

import { getEndpoints } from 'src/api/config'
import { User } from 'src/api/user'
import { Pet } from 'src/api/pet'
import Modal from 'src/ui/modal';


interface PropTypes {
  onHide: () => void;
  user: User;
  pet: Pet;
}

class Qrcode extends React.Component<PropTypes> {
  state = { url: '' };

  async componentDidMount() {
    const { user, pet } = this.props;
    const { api } = getEndpoints();
    const url = `${api}/qrcode/${user.username}/${pet.qrcode}`;
    const qrcodeSrc = await QRCode.toDataURL(url);

    this.setState({ url: qrcodeSrc });
  }

  render() {
    const { url } = this.state;
    const { onHide, pet } = this.props;
    return <Modal open={true} onClose={onHide}>
      <div>
        <div className="align-center">
          <h2>QR CODE - {pet.name}</h2>
        </div>
        <div className="align-center">
          {url && <img src={url} alt="QR Code"/>}
        </div>
        <div className="align-center">
          Print this image and add it to your pet collar
        </div>
      </div>
    </Modal>;
  }
}

export default Qrcode;