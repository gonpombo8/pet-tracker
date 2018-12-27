import { Entities } from '../../../core/async-app';

const pet = {
  view: ({ claims, pet }: Entities) => pet.userId === claims.username,
};

export default pet;
