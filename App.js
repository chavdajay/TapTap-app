import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TapScreen from './src/screens/TapScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ImageScreen from './src/screens/ImageScreen';
import AlarmScreen from './src/screens/AlarmScreen';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('Tap');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Tap':
        return <TapScreen />;
      // case 'History':
      //   return <HistoryScreen />;
      case 'Image':
        return <ImageScreen />;
      case 'Alarm':
        return <AlarmScreen />;
      default:
        return <TapScreen />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>{renderScreen()}</View>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => setActiveScreen('Tap')} style={styles.navButton}>
          <View style={styles.iconContainer}>
            <Ionicons 
              name="home" 
              size={30} 
              color={activeScreen === 'Tap' ? '#e22a7f' : 'black'} 
            />
            <Text style={[styles.iconLabel, { color: activeScreen === 'Tap' ? '#e22a7f' : 'black' }]}>Jap Jap</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveScreen('Alarm')} style={styles.navButton}>
          <View style={styles.iconContainer}>
            <Ionicons 
              name="alarm" 
              size={30} 
              color={activeScreen === 'Alarm' ? '#e22a7f' : 'black'} 
            />
            <Text style={[styles.iconLabel, { color: activeScreen === 'Alarm' ? '#e22a7f' : 'black' }]}>Akhand Dhun</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveScreen('Image')} style={styles.navButton}>
          <View style={styles.iconContainer}>
            <Ionicons 
              name="image" 
              size={30} 
              color={activeScreen === 'Image' ? '#e22a7f' : 'black'} 
            />
            <Text style={[styles.iconLabel, { color: activeScreen === 'Image' ? '#e22a7f' : 'black' }]}>Charnavind</Text>
          </View>
        </TouchableOpacity>
        
        {/* <TouchableOpacity onPress={() => setActiveScreen('History')} style={styles.navButton}>
          <View style={styles.iconContainer}>
            <Ionicons 
              name="time" 
              size={30} 
              color={activeScreen === 'History' ? '#e22a7f' : 'black'} 
            />
            <Text style={[styles.iconLabel, { color: activeScreen === 'History' ? '#e22a7f' : 'black' }]}>History</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 3,
    backgroundColor: '#f1f1f1',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 3,
    borderColor: '#e22a7f',
    shadowColor: '#f1f1f1',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 0,
  },
});
