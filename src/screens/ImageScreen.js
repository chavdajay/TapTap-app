import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import ImageZoom from 'react-native-image-pan-zoom';

// Screen dimensions for responsive positioning
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Define all chinha with dimentions
const symbols = [
  // right leg
  { name: 'swastika', x: 110, y: 10, width: 50, height: 50, soundFile: require('../../assets/s.mp3') },
  { name: 'asthkon', x: 105, y: 70, width: 50, height: 50, soundFile: require('../../assets/s.mp3') },
  { name: 'ankush', x: 60, y: 130, width: 50, height: 80, soundFile: require('../../assets/s.mp3') },
  { name: 'kamal', x: 45, y: 220, width: 40, height: 70, soundFile: require('../../assets/s.mp3') },
  { name: 'dhavj', x: 80, y: 220, width: 30, height: 85, soundFile: require('../../assets/s.mp3') },
  { name: 'udhavrekha', x: 110, y: 230, width: 30, height: 100, soundFile: require('../../assets/s.mp3') },
  { name: 'vajjr', x: 135, y: 250, width: 30, height: 80, soundFile: require('../../assets/s.mp3') },
  { name: 'jambu', x: 165, y: 255, width: 30, height: 50, soundFile: require('../../assets/s.mp3') },
  { name: 'jav', x: 153, y: 350, width: 40, height: 40, soundFile: require('../../assets/s.mp3') },
  // left leg
  { name: 'kalas', x: 210, y: 255, width: 50, height: 70, soundFile: require('../../assets/s.mp3') },
  { name: 'ardhchandard', x: 280, y: 270, width: 50, height: 50, soundFile: require('../../assets/s.mp3') },
  { name: 'vayom', x: 315, y: 230, width: 40, height: 50, soundFile: require('../../assets/s.mp3') },
  { name: 'gopad', x: 300, y: 160, width: 40, height: 40, soundFile: require('../../assets/s.mp3') },
  { name: 'dhanush', x: 285, y: 135, width: 30, height: 110, soundFile: require('../../assets/s.mp3') },
  { name: 'triikon', x: 245, y: 65, width: 60, height: 65, soundFile: require('../../assets/s.mp3') },
  { name: 'matsay', x: 230, y: 10, width: 70, height: 60, soundFile: require('../../assets/s.mp3') },
];

const ImageScreen = () => {
  const [highlightedSymbol, setHighlightedSymbol] = useState(null);

  // Function to play sound for each symbol
  const playSound = async (soundFile) => {
    try {
      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  // Handle symbol tap, highlight symbol, and play sound
  const handleSymbolClick = (symbol) => {
    setHighlightedSymbol(symbol.name);
    playSound(symbol.soundFile);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>સ્વામિનારાયણ ના ચરનાવિંદ ના ચિન્હો નુ ધ્યાન કરવા તેના ઉપર ક્લિક કરો</Text>
      <ImageZoom
        cropWidth={screenWidth}
        cropHeight={screenHeight - 250} // Adjust for title bar if necessary
        imageWidth={400} // Original image width
        imageHeight={400} // Original image height
        minScale={1}
        maxScale={5}
      >
        <Image
          source={require('../../assets/charnavind.jpg')}
          style={styles.image}
          resizeMode="contain"
        />
        
        {/* Overlay with TouchableOpacity components for each symbol */}
        <View style={styles.overlay}>
          {symbols.map((symbol) => (
            <TouchableOpacity
              key={symbol.name}
              style={[
                styles.symbolOverlay(symbol.x, symbol.y, symbol.width, symbol.height),
                highlightedSymbol === symbol.name && styles.highlightedSymbol
              ]}
              onPress={() => handleSymbolClick(symbol)}
            />
          ))}
        </View>
      </ImageZoom>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    color: '#e22a7f',
    padding:20,
    fontWeight: 'bold',
    marginTop:50,
    textAlign:"center",
    
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  symbolOverlay: (x, y, width, height) => ({
    position: 'absolute',
    top: y,
    left: x,
    width: width,
    height: height,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Adjust transparency to highlight symbol areas
    borderRadius: 5,
  }),
  highlightedSymbol: {
    backgroundColor: 'rgba(255, 0, 0, 0.5)', // Highlight color when symbol is active
  },
});

export default ImageScreen;
