import FlowerBed from './FlowerBed';
import Wall from './Wall';

export default function ItemFactory(type) {
  switch (type) {
    case 'FlowerBed':
      return FlowerBed;
    case 'WallHandler':
      return Wall;
    default:
      return null;
  }
}
