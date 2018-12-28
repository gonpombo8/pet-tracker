import React from 'react';

import { User } from 'src/api/user';
import { getPets, Pet } from 'src/api/pet';
import withCache from 'src/helpers/with-cache';
import PetCard from './pet-card';
import AddPet from './add-pet';

import './styles.sass';

interface PropTypes {
  user: User;
}

interface StateTypes {
  pets: Pet[];
}

class Dashboard extends React.PureComponent<PropTypes, StateTypes> {
  state: StateTypes = { pets: [] };

  async componentDidMount() {
    const pets = await getPets();
    this.setState({ pets });
  }

  handleChange = withCache(username => (changes: Partial<Pet>) => {
    const pets = this.state.pets.map(pet =>
      pet.username === username
        ? { ...pet, ...changes }
        : pet,
    );
    this.setState({ pets });
  });

  handleAddPet = (newPet: Pet) => {
    const { pets } = this.state;
    this.setState({ pets: [...pets, newPet] });
  }

  render() {
    const { user } = this.props;
    const { pets } = this.state;
    return <div className="dashboard">
      <AddPet
        onAddPet={this.handleAddPet}
      />
      <div className="cards">
        {pets.map(pet =>
          <PetCard
            onChange={this.handleChange(pet.username)}
            value={pet}
            user={user}
            key={pet.username}
          />,
        )}
      </div>
    </div>;
  }
};

export default Dashboard;
