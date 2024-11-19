export interface Scene {
    sceneId: string;
    sceneName: string;
    address: string;
    mediaName: string;
    url: string;
    lat: number;
    ing: number;
    type: string;
    description: string;
    review: string[];
}

export interface GetScenesResponse {
    message: string;
    data: Scene[];
}