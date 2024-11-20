import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbInfo = process.env.DB_INFO;
const mongoDBConnection = `mongodb://${dbUser}:${encodeURIComponent(dbPassword)}${dbInfo}`;

// Replace with your Google Geocoding API key
const googleApiKey = process.env.GOOGLE_MAPS_API_KEY;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateScenesWithCoordinates() {
  try {
    await mongoose.connect(mongoDBConnection, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const sceneSchema = new mongoose.Schema({
      address: String,
      lat: Number,
      lng: Number
    });

    const Scene = mongoose.model('Scene', sceneSchema, 'scenes');

    const scenes = await Scene.find();

    for (const scene of scenes) {
      if (!scene.address) continue;

      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(scene.address)}&key=${googleApiKey}`;
      console.log(geocodeUrl)
      try {
        const response = await axios.get(geocodeUrl);
        const data = response.data;

        if (data.status === 'OK') {
          const location = data.results[0].geometry.location;
          const { lat, lng } = location;

          await Scene.updateOne(
            { _id: scene._id },
            { $set: { lat: lat, lng: lng } }
          );

          console.log(`Updated scene ${scene._id} with lat: ${lat}, lng: ${lng}`);
        } else {
          console.error(`Geocoding failed for scene ${scene._id}: ${data.status}`);
        }
      } catch (error) {
        console.error(`Error fetching geocode for scene ${scene._id}:`, error);
      }
      await sleep(1000);
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  }
}

updateScenesWithCoordinates().catch(console.error);
