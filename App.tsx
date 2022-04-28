import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

import { API_KEY } from './utils/AccuWeatherAPIKey';

import Forecast from './components/Forecast';

const locationService =
  'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getForecast(latitude, longitude);
      },
      (error) => {
        console.error(error);
      }
    );
  });

  const getForecast = (lat: any, lon: any) => {
    fetch(`${locationService}?q=${lat},${lon}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Fetching The Weather</Text>
      ) : (
        <View>
          <Text>Pollen Forecast App</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
