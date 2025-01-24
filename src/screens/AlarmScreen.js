import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, TextInput } from 'react-native';
import { Audio } from 'expo-av';

const AlarmScreen = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [duration, setDuration] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  useEffect(() => {
    loadSound();
    return () => sound && sound.unloadAsync(); // Unload the sound when component unmounts
  }, []);

  const loadSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/s.mp3')
      );
      setSound(sound);
    } catch (error) {
      console.log('Failed to load sound:', error);
    }
  };

  const startAlarm = async () => {
    if (!sound) {
      Alert.alert("Error", "Sound is not loaded");
      return;
    }

    const totalDurationInMillis =
      (duration.hours * 60 * 60 * 1000) +
      (duration.minutes * 60 * 1000) +
      (duration.seconds * 1000);

    if (totalDurationInMillis === 0) {
      Alert.alert("Invalid Duration", "Please enter a valid duration.");
      return;
    }

    setIsPlaying(true);
    try {
      await sound.setIsLoopingAsync(true); // Enable looping
      await sound.playAsync();

      // Stop the sound after the specified duration
      setTimeout(async () => {
        await stopAlarm();
        Alert.alert("Time's up!", "The alarm has stopped.");
      }, totalDurationInMillis);
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const stopAlarm = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.setIsLoopingAsync(false); // Disable looping
    }
    setIsPlaying(false);
  };

  const handleDurationChange = (value, type) => {
    setDuration((prev) => ({
      ...prev,
      [type]: parseInt(value, 10) || 0,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>અખંડ સ્વામિનારાયણ સ્વામિનારાયણ વગાડવા માટે એલાર્મ ટાઇમર સેટ કરો</Text>

      <View style={styles.durationContainer}>
        <TextInput
          style={styles.input}
          placeholder={duration.hours === 0 ? "HOURS" : ""}
          keyboardType="numeric"
          value={duration.hours === 0 ? "" : String(duration.hours)}
          onChangeText={(text) => handleDurationChange(text, 'hours')}
        />
        <TextInput
          style={styles.input}
          placeholder={duration.minutes === 0 ? "MINUTES" : ""}
          keyboardType="numeric"
          value={duration.minutes === 0 ? "" : String(duration.minutes)}
          onChangeText={(text) => handleDurationChange(text, 'minutes')}
        />
        <TextInput
          style={styles.input}
          placeholder={duration.seconds === 0 ? "SECONDS" : ""}
          keyboardType="numeric"
          value={duration.seconds === 0 ? "" : String(duration.seconds)}
          onChangeText={(text) => handleDurationChange(text, 'seconds')}
        />
      </View>

      <Button
        title={isPlaying ? "Stop Dhun" : "Start Dhun"}
        onPress={isPlaying ? stopAlarm : startAlarm}
        color="#e22a7f"
        disabled={!sound}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#e22a7f',
    textAlign:"center"
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 5,
    width: '30%',
    textAlign: 'center',
    borderRadius:80,
  },
});

export default AlarmScreen;
