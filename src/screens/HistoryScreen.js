import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('daily');

  // Temporary history data, this would normally be stored in a database or AsyncStorage
  const sessionHistory = [
    { date: '2024-11-09', count: 10 },
    { date: '2024-11-08', count: 5 },
    { date: '2024-11-07', count: 20 },
  ];

  const fetchTapHistory = () => {
    const filteredHistory = sessionHistory
      .filter(item => {
        if (filter === 'daily') return dayjs().isSame(item.date, 'day');
        if (filter === 'monthly') return dayjs().isSame(item.date, 'month');
        if (filter === 'yearly') return dayjs().isSame(item.date, 'year');
      });
    setHistory(filteredHistory);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { setFilter('daily'); fetchTapHistory(); }}
        >
          <Text style={styles.buttonText}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { setFilter('monthly'); fetchTapHistory(); }}
        >
          <Text style={styles.buttonText}>Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { setFilter('yearly'); fetchTapHistory(); }}
        >
          <Text style={styles.buttonText}>Yearly</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.headerText}>Tap History ({filter})</Text>

      {history.length > 0 ? (
        history.map((item, index) => (
          <Text key={index} style={styles.historyItem}>
            {item.date}: {item.count} taps
          </Text>
        ))
      ) : (
        <Text style={styles.noHistoryText}>No data for this period</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: "#e22a7f",
  },
  historyItem: {
    fontSize: 18,
    marginBottom: 10,
  },
  noHistoryText: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop:-400,
  },
  button: {
    backgroundColor: "#e22a7f",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    width: '30%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HistoryScreen;
