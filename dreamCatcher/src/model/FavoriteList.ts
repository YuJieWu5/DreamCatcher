import { Scene } from './Scene';

export interface FavoriteList {
    name: string;
    description: string;
    scenes: Scene[];
    showMenu?: boolean;
  }