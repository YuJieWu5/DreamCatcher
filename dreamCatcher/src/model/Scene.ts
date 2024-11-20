export interface Scene {
    sceneId: string;
    sceneName: string;
    address: string;
    mediaName: string;
    url: string;
    lat: number;
    lng: number;
    type: string;
    description: string;
    review: string[];
    markerColor: string | undefined;
}

export interface GetScenesResponse {
    success: boolean;
    message: string;
    data: Scene[];
}