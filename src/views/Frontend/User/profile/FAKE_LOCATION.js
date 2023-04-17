const FAKE_LOCATION = [
  { latitude: 36.7704, longitude: 10.2294 },
  { latitude: 35.6183, longitude: 10.7565 },
  { latitude: 36.4239, longitude: 9.3992 },
  { latitude: 34.1209, longitude: 8.5122 },
  { latitude: 35.4751, longitude: 11.0408 },
  { latitude: 34.9253, longitude: 8.8229 },
  { latitude: 36.8948, longitude: 10.1862 },
  { latitude: 34.733, longitude: 11.2182 },
  { latitude: 35.5755, longitude: 9.7153 },
];

export const getFakeLocation = () => {
  const randomIndex = Math.floor(Math.random() * FAKE_LOCATION.length);
  return { coords: FAKE_LOCATION[randomIndex] };
};
