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
        lat: 0,
        lng: 0,
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
        lat: 0,
        lng: 0,
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
        lat: 0,
        lng: 0,
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
        lat: 0,
        lng: 0,
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
        lat: 0,
        lng: 0,
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
        mediaName: "",
        url: "",
        lat: 0,
        lng: 0,
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
          lat: 0,
          lng: 0,
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
        lat: 0,
        lng: 0,
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
        lat: 0,
        lng: 0,
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
          lat: 0,
          lng: 0,
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
          lat: 0,
          lng: 0,
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
          lat: 0,
          lng: 0,
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
            scenes: ["911eba29-ee15-4e48-a726-fd806df8c87a", "94eea855-e787-40d4-92a0-afa63f7a0986"]
        },{
            favListId: "880d4f4a-a959-4229-b5d6-b3df107839fb",
            listName: "list2",
            scenes: ["42b7c6bb-e74d-4523-85d5-5f09a264ec57"]
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
            scenes: ["667afdf9-ef9e-42bd-88ed-4a8aa03fb030"]
        }]
    }
)