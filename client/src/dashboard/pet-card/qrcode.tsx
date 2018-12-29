import React from 'react';
import QRCode from 'qrcode';

import { getEndpoints } from 'src/api/config'
import { Pet } from 'src/api/pet'
import Modal from 'src/ui/modal';


interface PropTypes {
  onHide: () => void;
  pet: Pet;
}

class Qrcode extends React.Component<PropTypes> {
  state = { url: '' };

  async componentDidMount() {
    const { pet } = this.props;
    const { api } = getEndpoints();
    const url = `${api}/qrcode/${pet.username}/${pet.qrcode}`;
    const qrcodeSrc = await QRCode.toDataURL(url);

    this.setState({ url: qrcodeSrc });
  }

  render() {
    const { url } = this.state;
    const { onHide, pet } = this.props;
    return <Modal open={true} onClose={onHide}>
      <div>
        <div className="align-center column">
          <h2>QR CODE - {pet.name}</h2>
          {url && <img src={url} alt="QR Code"/>}
          Print this image and add it to your pet collar
          <a href={url} download>
            Download Image
          </a>
        </div>
      </div>
    </Modal>;
  }
}

export default Qrcode;
