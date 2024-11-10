import { Scene } from '../model/Scene';
import { FavoriteList } from '../model/FavoriteList';

export const mockSceneList1: Scene[] = [
    {
      title: 'Þingvellir National Park',
      description: 'A UNESCO World Heritage Site known for its stunning landscapes and historical significance.',
      position: { lat: 64.2559, lng: -21.1295 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Geysir',
      description: 'Famous for its geothermal activity and the origin of the word "geyser."',
      position: { lat: 64.3136, lng: -20.2995 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Gullfoss Waterfall',
      description: 'A breathtaking waterfall located in the canyon of the Hvítá river.',
      position: { lat: 64.3275, lng: -20.1218 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Reykjavik',
      description: 'The vibrant capital city of Iceland, known for its culture and nightlife.',
      position: { lat: 64.1466, lng: -21.9426 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Blue Lagoon',
      description: 'A famous geothermal spa with milky-blue waters, located in a lava field.',
      position: { lat: 63.8804, lng: -22.4495 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Jökulsárlón Glacier Lagoon',
      description: 'A large glacial lake known for its floating icebergs and stunning views.',
      position: { lat: 64.0485, lng: -16.1785 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Skógafoss Waterfall',
      description: 'A majestic waterfall with a drop of 60 meters, offering a picturesque view.',
      position: { lat: 63.5321, lng: -19.5119 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Vatnajökull National Park',
      description: 'Home to Europe’s largest glacier and a variety of natural wonders.',
      position: { lat: 64.4000, lng: -16.5000 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Akureyri',
      description: 'A charming town in northern Iceland, known for its botanical gardens and cultural sites.',
      position: { lat: 65.6885, lng: -18.1262 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Skaftafell',
      description: 'A nature reserve in Vatnajökull National Park, known for its hiking trails and waterfalls.',
      position: { lat: 64.0173, lng: -16.9750 },
      image: 'https://via.placeholder.com/100x100'
    }
];

export const mockSceneList2: Scene[] = [
    {
      title: 'Vik',
      description: 'A village known for its black sand beaches and dramatic cliffs.',
      position: { lat: 63.4189, lng: -19.0063 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Dettifoss',
      description: 'Europe’s most powerful waterfall, located in Vatnajökull National Park.',
      position: { lat: 65.8143, lng: -16.3841 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Húsavík',
      description: 'A town known for whale watching and its charming harbor.',
      position: { lat: 66.0449, lng: -17.3389 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Landmannalaugar',
      description: 'A region known for its colorful rhyolite mountains and hot springs.',
      position: { lat: 63.9905, lng: -19.0614 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Reynisfjara Beach',
      description: 'A black sand beach famous for its basalt columns and sea stacks.',
      position: { lat: 63.4044, lng: -19.0455 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Seljalandsfoss',
      description: 'A unique waterfall that you can walk behind for a different perspective.',
      position: { lat: 63.6156, lng: -19.9924 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Hofn',
      description: 'A fishing town known for its lobster and stunning views of the Vatnajökull glacier.',
      position: { lat: 64.2539, lng: -15.2089 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Myvatn',
      description: 'A volcanic lake surrounded by unique geological formations and birdlife.',
      position: { lat: 65.6049, lng: -17.0009 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Kirkjufell',
      description: 'A picturesque mountain often considered the most photographed in Iceland.',
      position: { lat: 64.9270, lng: -23.3117 },
      image: 'https://via.placeholder.com/100x100'
    },
    {
      title: 'Hraunfossar',
      description: 'A series of waterfalls streaming over a lava field into the Hvítá river.',
      position: { lat: 64.7028, lng: -20.9788 },
      image: 'https://via.placeholder.com/100x100'
    }
  ];  
  

export const mockFavoriteList: FavoriteList[] = [
    {
      name: 'My Travel Spots',
      description: 'Places I want to visit',
      scenes: mockSceneList1,
    },
    {
      name: 'Historical Sites',
      description: 'Famous historical locations',
      scenes: mockSceneList2,
    },
];