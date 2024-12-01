db = db.getSiblingDB('DreamCatcher')
db.createCollection('scenes')
scenesCollection = db.getCollection("scenes")
scenesCollection.remove({})
scenesCollection.insert(
{
        sceneId: "32ab8a17-e92a-4b0d-a42f-ca5e5537db65",
        sceneName: "Game of Thrones - Skógafoss Waterfall",
        address: "Skógafoss, Gönguleið um Fimmvörðuháls, 861, Iceland",
        mediaName: "Game of Thrones",
        url: "https://res.cloudinary.com/itb-database/image/upload/s--wgdrTVeV--/c_fill,dpr_auto,f_auto,q_auto:eco,w_1280/v1/Places/lw6x02miu34wxdd7vwpj",
        lat: 63.5320209,
        lng: -19.5112825,
        type: "Episodes",
        description: "Featured in Game of Thrones Season 8, Episode 1, where Jon Snow rides a dragon for the first time. The location was enhanced with CGI to add another waterfall.",
        review: []
      }
      );
      
    scenesCollection.insert(
    {
        sceneId: "4a0dea22-f38d-4bbf-b5ec-5f28615f3e87",
        sceneName: "Game of Thrones - Reynisfjara Black Sand Beach",
        address: "Reynisfjara Beach, Vik, South Iceland",
        mediaName: "Game of Thrones",
        url: "https://res.cloudinary.com/icelandtours/g_auto,f_auto,c_fill,w_1200,q_auto:good/reynisfjara_sunset_855c6afc97.jpg",
        lat: 63.40574040000001,
        lng: -19.0716192,
        type: "Episodes",
        description: "Appeared in Game of Thrones Season 7, Episode 5, where Jon Snow and others boarded a ship to return from Dragonstone. Known for its dramatic black sand and basalt columns.",
        review: []
        }
      );
      
    scenesCollection.insert(
    {
        sceneId: "6dc652f2-4667-4379-bc58-14d3fd5ee30d",
        sceneName: "Game of Thrones - Kirkjufell Mountain",
        address: "Kirkjufell Mountain, 351, Iceland",
        mediaName: "Game of Thrones",
        url: "https://adventures.com/media/16569/kirkjufell-mountain-kirkjufellsfoss-waterfall-green-summer-view.jpg?center=0.1111111111111111,0.52777777777777779&mode=crop&width=970&height=645&rnd=133583399610000000&format=webp&quality=80",
        lat: 64.9398701,
        lng: -23.3064651,
        type: "Episodes",
        description: "Known as 'Arrowhead Mountain' in Game of Thrones Seasons 6 and 7, this mountain was a significant location for scenes beyond the wall, featuring White Walkers.",
        review: []
      }
      );
      
      scenesCollection.insert(
      {
        sceneId: "d5a2b6d7-ea25-4d3f-8093-5d2c9f76a23b",
        sceneName: "Game of Thrones - Snæfellsnes Peninsula",
        address: "Snæfellsnes, 342, Iceland",
        mediaName: "Game of Thrones",
        url: "https://gti.images.tshiftcdn.com/1247071/x/0/snaefellsnes-1.jpg?ixlib=php-3.3.0&w=883ellsnes",
        lat: 64.8443266,
        lng: -22.6532697,
        type: "Episodes",
        description: "Featured in Game of Thrones Season 3 as a flashback scene to the Stark children's memories of their home. Snæfellsnes Peninsula is also popular for day tours featuring iconic locations like the Red House, Stone Bridge, and seals on the shore.",
        review: []
      }
      );
      
      scenesCollection.insert(
      {
        sceneId: "a92fd88f-6d97-4d52-b5df-2b3f9bdbf34d",
        sceneName: "Game of Thrones - Þingvellir National Park",
        address: "Þingvellir, 801 Selfoss, Iceland",
        mediaName: "Game of Thrones",
        url: "https://static.wixstatic.com/media/df9fb8_b38148a17ee440c4a2b7ca178a725eea~mv2.jpg/v1/fill/w_1200,h_675,al_c,q_85,enc_auto/df9fb8_b38148a17ee440c4a2b7ca178a725eea~mv2.jpgthingvellir",
        lat: 63.9318322,
        lng: -20.9996925,
        type: "Episodes",
        description: "Featured in Game of Thrones Season 4, Episode 8, as the location where Arya and the Hound traveled. This national park is also significant for Icelandic history and geological formations.",
        review: []
      }
      );
      
      scenesCollection.insert(
      {
        sceneId: "94eea855-e787-40d4-92a0-afa63f7a0986",
        sceneName: "Game of Thrones - Grjótagjá Cave",
        address: "Grjótagjá, 660 Reykjahlíð, Iceland",
        mediaName: "Game of Thrones",
        url: "https://www.campervaniceland.com/assets/img/blog/494/grjotagja-iceland.jpg",
        lat: 65.6262263,
        lng: -16.8830406,
        type: "Film",
        description: "The setting for Jon Snow and Ygritte's intimate scene in Season 3, Episode 5, 'Kissed by Fire.'",
        review: []
      }
      )  
      scenesCollection.insert(
        {
          sceneId: "e5f96d42-bb78-4c3f-8d2f-d8fa2bcf4871",
          sceneName: "Game of Thrones - Geysir",
          address: "Geysir, 806, Iceland",
          mediaName: "Game of Thrones",
          url: "https://www.icelandtravel.is/_next/image/?url=https%3A%2F%2Fcontent.icelandtravel.is%2Fwp-content%2Fuploads%2F2019%2F08%2FGeysir_winter_eruption.jpg&w=3840&q=75",
          lat: 64.31037189999999,
          lng: -20.3023605,
          type: "Film",
          description: "Part of Þingvellir National Park, this area features the path to the Eyrie and the location of the Bloody Gate. The park also hosted the fight between Brienne of Tarth and the Hound in Season 4, Episode 10.",
          review: []
        }
        );

    scenesCollection.insert(
        {
        sceneId: "f6b07a83-4b3d-498f-8e41-f2c14eec3d9a",
        sceneName: "Game of Thrones - Gullfoss Waterfall",
        address: "Gullfoss, 846, Iceland",
        mediaName: "Game of Thrones",
        url: "https://gti.images.tshiftcdn.com/331988/x/0/gullfoss-waterfall-1?ixlib=php-3.3.0&w=883",
        lat: 64.3270716,
        lng: -20.1199478,
        type: "Film",
        description: "Located near Þingvellir National Park, Gullfoss waterfall is part of the region that featured the path to the Eyrie and the Bloody Gate, as well as Brienne of Tarth and the Hound's fight in Season 4, Episode 10.",
        review: []
        }
        );
                
      
      scenesCollection.insert(
      {
        sceneId: "d3f42b96-9e3b-4e69-9374-8f2a3e5f3c51",
        sceneName: "Interstellar - Svínafellsjökull Glacier",
        address: "2429+JGW, 785 Svínafell, Iceland",
        mediaName: "Interstellar",
        url: "https://gti.images.tshiftcdn.com/415702/x/0/svinafellsjokull-2.jpg?ixlib=php-3.3.0&w=883",
        lat: 64.0016125,
        lng: -16.8811719,
        type: "Film",
        description: "Featured in the movie Interstellar as the icy planet Mann's world. The glacier served as the breathtaking backdrop for the scenes on the alien ice planet.",
        review: []
      }
      );
      scenesCollection.insert(
        {
          sceneId: "a1f42c3b-3a47-4f7b-8149-cf34e1c8c7d6",
          sceneName: "The Secret Life of Walter Mitty - Seyðisfjörður",
          address: "Seyðisfjörður, Iceland",
          mediaName: "The Secret Life of Walter Mitty",
          url: "https://adventures.is/media/226638/seydisfjordur-church-rainbow-street.jpg?anchor=center&mode=crop&width=970&height=645&rnd=132369322190000000&format=webp&quality=80",
          lat: 65.2602307,
          lng: -14.0095466,
          type: "Film",
          description: "Featured as a picturesque Icelandic village in Walter Mitty's journey. Known for its colorful houses and surrounded by stunning fjords.",
          review: []
        }
        );
    

        scenesCollection.insert(
        {
          sceneId: "c3e79b56-7fd8-47e3-8413-e2dace2c91d2",
          sceneName: "The Secret Life of Walter Mitty - Höfn",
          address: "Höfn, Hornafjörður, Iceland",
          mediaName: "The Secret Life of Walter Mitty",
          url: "https://www.campervaniceland.com/assets/img/blog/538.png",
          lat: 64.255149,
          lng: -15.208796,
          type: "Film",
          description: "Höfn serves as a key filming location in Walter Mitty's travels, showcasing Iceland's stunning southeastern landscapes.",
          review: []
        }
        );       

        scenesCollection.insert(
        {
          sceneId: "d4e8cb97-1bda-4a6e-9854-a8f3ef2fa648",
          sceneName: "The Secret Life of Walter Mitty - Fjallsárlón Lake",
          address: "Fjallsárlón, 785, Iceland",
          mediaName: "The Secret Life of Walter Mitty",
          url: "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/562409958.jpg?k=c3820d8ecb712454de9b0bfad999589f0bfe1733bc7bf2fbae93ac5144ec09fb&o=&s=1024x",
          lat: 64.01861099999999,
          lng: -16.385,
          type: "Film",
          description: "The glacial lagoon Fjallsárlón provides a breathtaking setting for scenes in Walter Mitty's adventure.",
          review: []
        }
        );


db.createCollection('users')
usersCollection = db.getCollection("users")
usersCollection.remove({})
usersCollection.insert(
    {
        userId: "a81f83a2-243f-451f-bc4a-fab6538c103d",
        userName: "Vivian",
        phone: 2067711111,
        email: "ywu4@seattleu.edu",
        password: "123",
        authorization: "prime",
        favoriteList: [{
            favListId: "2b8ecb29-d911-4387-9c6d-95fd1ec795b2",
            listName: "list1",
            scenes: ["32ab8a17-e92a-4b0d-a42f-ca5e5537db65", "4a0dea22-f38d-4bbf-b5ec-5f28615f3e87"]
        },{
            favListId: "880d4f4a-a959-4229-b5d6-b3df107839fb",
            listName: "list2",
            scenes: ["c3e79b56-7fd8-47e3-8413-e2dace2c91d2"]
        } ]
    }
)
usersCollection.insert(
    {
        userId: "bb4d1f89-53c8-4b3a-92f8-8a7dc2f9babe",
        userName: "Ivy",
        phone: 2067711111,
        email: "ivy@seattleu.edu",
        password: "123",
        authorization: "prime",
        favoriteList: [{
            favListId: "9049ae66-77c7-4863-90f1-add207c8d081",
            listName: "Default",
            scenes: []
        }]
    }
)
usersCollection.insert(
    {
        userId: "f5a013b7-0e83-4ec8-bfd2-8a8f3838bace",
        userName: "Test",
        phone: 2067712222,
        email: "test@seattleu.edu",
        password: "123",
        authorization: "general",
        favoriteList: [{
            favListId: "9049ae66-77c7-4863-90f1-add207c8d087",
            listName: "Default",
            scenes: ["d4e8cb97-1bda-4a6e-9854-a8f3ef2fa648"]
        }]
    }
)
db.createCollection('trips')
tripsCollection = db.getCollection("trips")
tripsCollection.remove({})
tripsCollection.insert(
{
  tripId: "ab0b358d-7b22-4631-93a0-b9d891ddd8f8",
  userId: "a81f83a2-243f-451f-bc4a-fab6538c103d",
  tripName: "trip1",
  scenes: ["d3f42b96-9e3b-4e69-9374-8f2a3e5f3c51", "a1f42c3b-3a47-4f7b-8149-cf34e1c8c7d6", "c3e79b56-7fd8-47e3-8413-e2dace2c91d2","a1f42c3b-3a47-4f7b-8149-cf34e1c8c7d6"],
  routes: []
})

tripsCollection.insert(
  {
    tripId: "7ddc4d5f-d84a-4930-85ba-45c06c",
    userId: "a81f83a2-243f-451f-bc4a-fab6538c103d",
    tripName: "trip2",
    scenes: ["c3e79b56-7fd8-47e3-8413-e2dace2c91d2", "d4e8cb97-1bda-4a6e-9854-a8f3ef2fa648"],
    routes: []
})


db.createCollection('reviews')
reviewsCollection = db.getCollection("reviews")
reviewsCollection.remove({})

reviewsCollection.insertMany([
  {
    sceneId: "32ab8a17-e92a-4b0d-a42f-ca5e5537db65",
    rating: 1,
    comment: "The place was disappointing; not as beautiful as advertised.",
    commentTime: new Date()
},
{
    sceneId: "32ab8a17-e92a-4b0d-a42f-ca5e5537db65",
    rating: 3,
    comment: "Nice, but there were too many tourists to enjoy the scenery.",
    commentTime: new Date()
},
{
    sceneId: "32ab8a17-e92a-4b0d-a42f-ca5e5537db65",
    rating: 5,
    comment: "Absolutely stunning! The best place I’ve visited this year.",
    commentTime: new Date()
},
{
    sceneId: "4a0dea22-f38d-4bbf-b5ec-5f28615f3e87",
    rating: 1,
    comment: "The wind made it almost impossible to enjoy the beach.",
    commentTime: new Date()
},
{
    sceneId: "4a0dea22-f38d-4bbf-b5ec-5f28615f3e87",
    rating: 3,
    comment: "Interesting black sand, but the area felt too isolated.",
    commentTime: new Date()
},
{
    sceneId: "4a0dea22-f38d-4bbf-b5ec-5f28615f3e87",
    rating: 5,
    comment: "A mesmerizing experience! The black sand is unforgettable.",
    commentTime: new Date()
},
{
    sceneId: "d3f42b96-9e3b-4e69-9374-8f2a3e5f3c51",
    rating: 1,
    comment: "Overrated; the glacier looked better in pictures.",
    commentTime: new Date()
},
{
    sceneId: "d3f42b96-9e3b-4e69-9374-8f2a3e5f3c51",
    rating: 3,
    comment: "Good spot, but access to the glacier is difficult.",
    commentTime: new Date()
},
{
    sceneId: "d3f42b96-9e3b-4e69-9374-8f2a3e5f3c51",
    rating: 5,
    comment: "Breathtaking views of the glacier. A must-visit for nature lovers!",
    commentTime: new Date()
},
{
    sceneId: "6dc652f2-4667-4379-bc58-14d3fd5ee30d",
    rating: 1,
    comment: "Nothing special about this mountain.",
    commentTime: new Date()
},
{
    sceneId: "6dc652f2-4667-4379-bc58-14d3fd5ee30d",
    rating: 3,
    comment: "Good views but quite difficult to reach.",
    commentTime: new Date()
},
{
    sceneId: "6dc652f2-4667-4379-bc58-14d3fd5ee30d",
    rating: 5,
    comment: "Arrowhead Mountain is truly iconic. Loved the hike!",
    commentTime: new Date()
},
{
    sceneId: "a92fd88f-6d97-4d52-b5df-2b3f9bdbf34d",
    rating: 1,
    comment: "Overcrowded and overpriced.",
    commentTime: new Date()
},
{
    sceneId: "a92fd88f-6d97-4d52-b5df-2b3f9bdbf34d",
    rating: 3,
    comment: "Interesting history, but not much else to see.",
    commentTime: new Date()
},
{
    sceneId: "a92fd88f-6d97-4d52-b5df-2b3f9bdbf34d",
    rating: 5,
    comment: "Stunning views and rich history. Worth every penny!",
    commentTime: new Date()
},
{
    sceneId: "d5a2b6d7-ea25-4d3f-8093-5d2c9f76a23b",
    rating: 1,
    comment: "Disappointing experience; the place was too crowded.",
    commentTime: new Date()
},
{
    sceneId: "d5a2b6d7-ea25-4d3f-8093-5d2c9f76a23b",
    rating: 3,
    comment: "Nice, but the facilities could be better maintained.",
    commentTime: new Date()
},
{
    sceneId: "d5a2b6d7-ea25-4d3f-8093-5d2c9f76a23b",
    rating: 5,
    comment: "A magical spot. The waterfall was simply breathtaking!",
    commentTime: new Date()
},
{
  sceneId: "d3f42b96-9e3b-4e69-9374-8f2a3e5f3c51",
  rating: 5,
  comment: "The waterfall here is absolutely stunning! The surrounding nature is magical.",
  commentTime: new Date()
},   

{
  sceneId: "d3f42b96-9e3b-4e69-9374-8f2a3e5f3c51",
  rating: 5,
  comment: "The waterfall here is absolutely stunning! The surrounding nature is magical.",
  commentTime: new Date()
}, 

{
  sceneId: "d3f42b96-9e3b-4e69-9374-8f2a3e5f3c51",
  rating: 5,
  comment: "The waterfall here is absolutely stunning! The surrounding nature is magical.",
  commentTime: new Date()
},    

{
  sceneId: "94eea855-e787-40d4-92a0-afa63f7a0986",
  rating: 1,
  comment: "The area was overcrowded and the waterfall wasn’t impressive.",
  commentTime: new Date()
},
{
  sceneId: "94eea855-e787-40d4-92a0-afa63f7a0986",
  rating: 3,
  comment: "The waterfall is nice, but the surroundings need maintenance.",
  commentTime: new Date()
},
{
  sceneId: "94eea855-e787-40d4-92a0-afa63f7a0986",
  rating: 5,
  comment: "A magical place with stunning waterfalls and serene nature.",
  commentTime: new Date()
},

// SceneId: e5f96d42-bb78-4c3f-8d2f-d8fa2bcf4871
{
  sceneId: "e5f96d42-bb78-4c3f-8d2f-d8fa2bcf4871",
  rating: 1,
  comment: "Overhyped, and the location is not well managed.",
  commentTime: new Date()
},
{
  sceneId: "e5f96d42-bb78-4c3f-8d2f-d8fa2bcf4871",
  rating: 3,
  comment: "The waterfall is decent, but there’s nothing extraordinary.",
  commentTime: new Date()
},
{
  sceneId: "e5f96d42-bb78-4c3f-8d2f-d8fa2bcf4871",
  rating: 5,
  comment: "Absolutely beautiful! The nature surrounding it is breathtaking.",
  commentTime: new Date()
},

// SceneId: f6b07a83-4b3d-498f-8e41-f2c14eec3d9a
{
  sceneId: "f6b07a83-4b3d-498f-8e41-f2c14eec3d9a",
  rating: 1,
  comment: "Not worth the trip; there are better places nearby.",
  commentTime: new Date()
},
{
  sceneId: "f6b07a83-4b3d-498f-8e41-f2c14eec3d9a",
  rating: 3,
  comment: "The waterfall is okay, but the infrastructure needs work.",
  commentTime: new Date()
},
{
  sceneId: "f6b07a83-4b3d-498f-8e41-f2c14eec3d9a",
  rating: 5,
  comment: "A stunning location! The waterfall is a true gem of nature.",
  commentTime: new Date()
},

// SceneId: a1f42c3b-3a47-4f7b-8149-cf34e1c8c7d6
{
  sceneId: "a1f42c3b-3a47-4f7b-8149-cf34e1c8c7d6",
  rating: 1,
  comment: "The location was difficult to find and underwhelming.",
  commentTime: new Date()
},
{
  sceneId: "a1f42c3b-3a47-4f7b-8149-cf34e1c8c7d6",
  rating: 3,
  comment: "Decent waterfall, but not worth a long trip.",
  commentTime: new Date()
},
{
  sceneId: "a1f42c3b-3a47-4f7b-8149-cf34e1c8c7d6",
  rating: 5,
  comment: "An amazing spot! The waterfall and surroundings are magical.",
  commentTime: new Date()
},

// SceneId: c3e79b56-7fd8-47e3-8413-e2dace2c91d2
{
  sceneId: "c3e79b56-7fd8-47e3-8413-e2dace2c91d2",
  rating: 1,
  comment: "The waterfall was underwhelming and hard to access.",
  commentTime: new Date()
},
{
  sceneId: "c3e79b56-7fd8-47e3-8413-e2dace2c91d2",
  rating: 3,
  comment: "A nice spot, but there’s not much else to do here.",
  commentTime: new Date()
},
{
  sceneId: "c3e79b56-7fd8-47e3-8413-e2dace2c91d2",
  rating: 5,
  comment: "A beautiful place with a serene waterfall. Highly recommend it!",
  commentTime: new Date()
},

// SceneId: d4e8cb97-1bda-4a6e-9854-a8f3ef2fa648
{
  sceneId: "d4e8cb97-1bda-4a6e-9854-a8f3ef2fa648",
  rating: 1,
  comment: "The waterfall lacked any unique features, very disappointing.",
  commentTime: new Date()
},
{
  sceneId: "d4e8cb97-1bda-4a6e-9854-a8f3ef2fa648",
  rating: 3,
  comment: "Good for a quick stop, but not worth a long visit.",
  commentTime: new Date()
},
{
  sceneId: "d4e8cb97-1bda-4a6e-9854-a8f3ef2fa648",
  rating: 5,
  comment: "One of the most beautiful waterfalls I've ever seen!",
  commentTime: new Date()
}
]);


    
