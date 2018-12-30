import { Pet } from 'src/api/pet';

export default (avatar: Pet['avatar'], type: Pet['type']) =>
  avatar || `/${type}-placeholder.jpg`;
