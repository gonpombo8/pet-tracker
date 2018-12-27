import React from 'react';

import { User } from 'src/api/user';
import PetCard from './pet-card';
import AddPet from './add-pet';

import './styles.sass';

interface PropTypes {
  user: User;
}

export default ({ user }: PropTypes) => {
  console.log(user.name);
  return <div className="dashboard">
    <AddPet />
    <div className="cards">
      <PetCard />
      <PetCard />
      <PetCard />
      <PetCard />
      <PetCard />
      <PetCard />
    </div>
  </div>;
};
