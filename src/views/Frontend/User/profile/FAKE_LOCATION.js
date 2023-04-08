const FAKE_LOCATION = [
    { latitude: 37.7749, longitude: -122.4194 },
    { latitude: 40.7128, longitude: -74.0060 },
    { latitude: 51.5074, longitude: -0.1278 },
    { latitude: 48.8566, longitude: 2.3522 },
    { latitude: 35.6895, longitude: 139.6917 },
    { latitude: 22.3193, longitude: 114.1694 },
    { latitude: 52.5200, longitude: 13.4050 },
    { latitude: 43.6532, longitude: -79.3832 },
    { latitude: -33.8679, longitude: 151.2073 },
  ];
  
  export const getFakeLocation = () => {
    const randomIndex = Math.floor(Math.random() * FAKE_LOCATION.length);
    return { coords: FAKE_LOCATION[randomIndex] };
  };