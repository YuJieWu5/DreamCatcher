import { Scene } from './Scene';

export interface FavoriteList {
    favListId: string;
    listName: string;
    scenes: Scene[];
}

export interface FavoriteListSummary {
    favListId: string;
    listName: string;
    scenes: string[];
    showMenu?: boolean;
}

export interface FavoriteListSummaryResponse {
    success: boolean;
    favoriteList: FavoriteListSummary[];
    auth: string;
}