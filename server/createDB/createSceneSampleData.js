db = db.getSiblingDB('DreamCatcher')
db.createCollection('scenes')
scenesCollection = db.getCollection("scenes")
scenesCollection.remove({})
scenesCollection.insert(
{
    sceneId: "667afdf9-ef9e-42bd-88ed-4a8aa03fb030",
    sceneName: "Game of Thrones - Kirkjufell Mountain ",
    street: "Snæfellsnesvegur",
    city: "Grundarfjörður",
    state: "Western Region",
    postalCode: "350",
    country: "Iceland",
    mediaName: "",
    type: "Film",
    description: "Featured as 'Arrowhead Mountain' in Seasons 6 and 7, notably in the episode 'Beyond the Wall.'",
    review: []
}
)
scenesCollection.insert(
{
    sceneId: "94eea855-e787-40d4-92a0-afa63f7a0986",
    sceneName: "Game of Thrones - Grjótagjá Cave",
    street: "Grjótagjá",
    city: "Mývatn",
    state: "Northeastern Region",
    postalCode: "",
    country: "Iceland",
    mediaName: "660",
    type: "Film",
    description: "The setting for Jon Snow and Ygritte's intimate scene in Season 3, Episode 5, 'Kissed by Fire.'",
    review: []
}
)
scenesCollection.insert(
{
    sceneId: "42b7c6bb-e74d-4523-85d5-5f09a264ec57",
    sceneName: "Game of Thrones - Dimmuborgir Lava Field",
    street: "Dimmuborgir",
    city: "Mývatn",
    state: "Northeastern Region",
    postalCode: "",
    country: "Iceland",
    mediaName: "660",
    type: "Film",
    description: "Served as Mance Rayder's Wildling camp in Season 3, Episode 1, 'Valar Dohaeris.'",
    review: []
}
)
scenesCollection.insert(
{
    sceneId: "911eba29-ee15-4e48-a726-fd806df8c87a",
    sceneName: "Game of Thrones - Þingvellir National Park",
    street: "Þingvellir",
    city: "Þingvellir",
    state: "Southwestern Region",
    postalCode: "801",
    country: "Iceland",
    mediaName: "",
    type: "Film",
    description: "Featured in multiple scenes, including the fight between Brienne of Tarth and the Hound in Season 4, Episode 10, 'The Children.'",
    review: []
}
)