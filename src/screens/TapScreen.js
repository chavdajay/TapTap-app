import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Image, PanResponder } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const filePath = `${FileSystem.documentDirectory}tapCount.json`; // Path to save the tap count

const TapScreen = () => {
  const [tapCount, setTapCount] = useState(0);
  const [scale] = useState(new Animated.Value(1)); // Scale animation for pulsing effect
  const [singleTapSound, setSingleTapSound] = useState(null);
  const [doubleTapSound, setDoubleTapSound] = useState(null);
  const [tripleTapSound, setTripleTapSound] = useState(null);

  // Load sounds on component mount
  useEffect(() => {
    const loadSounds = async () => {
      const single = await Audio.Sound.createAsync(require('../../assets/s.mp3'));
      const double = await Audio.Sound.createAsync(require('../../assets/M.mp3'));
      const triple = await Audio.Sound.createAsync(require('../../assets/K.mp3'));

      setSingleTapSound(single.sound);
      setDoubleTapSound(double.sound);
      setTripleTapSound(triple.sound);
    };

    loadSounds();

    // Unload sounds when component unmounts
    return () => {
      singleTapSound && singleTapSound.unloadAsync();
      doubleTapSound && doubleTapSound.unloadAsync();
      tripleTapSound && tripleTapSound.unloadAsync();
    };
  }, []);

  // Load the saved tap count when the app starts
  useEffect(() => {
    const loadTapCount = async () => {
      try {
        const fileData = await FileSystem.readAsStringAsync(filePath);
        const { count } = JSON.parse(fileData);
        setTapCount(count || 0);
      } catch (error) {
        console.log('No saved tap count found, starting fresh:', error);
      }
    };

    loadTapCount();
  }, []);

  // Save the tap count to the file system
  const saveTapCount = async (count) => {
    try {
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify({ count }));
    } catch (error) {
      console.error('Error saving tap count:', error);
    }
  };

  // Stop any currently playing sounds
  const stopAllSounds = async () => {
    if (singleTapSound) await singleTapSound.stopAsync();
    if (doubleTapSound) await doubleTapSound.stopAsync();
    if (tripleTapSound) await tripleTapSound.stopAsync();
  };

  // Play the appropriate sound based on the number of fingers tapped
  const playSound = async (tapType) => {
    await stopAllSounds(); // Ensure no overlapping sounds

    try {
      if (tapType === 1 && singleTapSound) {
        await singleTapSound.playFromPositionAsync(0); // Reset sound to start
      } else if (tapType === 2 && doubleTapSound) {
        await doubleTapSound.playFromPositionAsync(0);
      } else if (tapType === 3 && tripleTapSound) {
        await tripleTapSound.playFromPositionAsync(0);
      }
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  // Handle tap with pulsing animation
  const handleTap = async (tapType) => {
    playSound(tapType);

    // Update tap count only for single-finger taps
    if (tapType === 1) {
      const newCount = tapCount + 1;
      setTapCount(newCount);
      saveTapCount(newCount); // Save the new tap count
    }

    // Pulse animation
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // PanResponder to detect the number of fingers on tap
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => {
      const fingerCount = event.nativeEvent.touches.length;
      handleTap(fingerCount); // Call handleTap with the number of fingers detected
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>જય સ્વામિનારાયણ</Text>
      <Text style={styles.subText}>ધામ ભાવે અખંડ સ્મરણ વર્ષ 2081 અંતર્ગત ગુરુજી ની પ્રેરણા થી આપને ભેટ</Text>
      <View style={styles.groupimage}>
        <Image
          source={require('../../assets/hari.jpg')} // Change the image path accordingly
          style={styles.image}
        />
        <Image
          source={require('../../assets/guruji.jpg')} // Change the image path accordingly
          style={styles.image}
        />
      </View>

      <Animated.View
        {...panResponder.panHandlers} // Attach PanResponder to detect multi-touch taps
        style={[styles.circle, { transform: [{ scale }] }]}
      >
        <View style={styles.innerCircle}>
          <Text style={styles.tapText}>Total Jap: {tapCount}</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#e22a7f',
    marginTop: -200,
  },
  subText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 30,
    margin:30,
  },
  groupimage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 50,
    resizeMode: 'contain',
    borderRadius: 100,
    marginTop: 0,
    marginLeft: 10,
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 5,
    borderColor: '#e22a7f',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
  },
  innerCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#e22a7f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TapScreen;
