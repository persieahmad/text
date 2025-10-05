import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context'

export default function App() {
  const [text, setText] = useState('');
  const colorScheme = useColorScheme();

  useEffect(() => {
    const loadText = async () => {
      const storedText = await AsyncStorage.getItem('editorText');
      if (storedText) {
        setText(storedText);
      }
    };
    loadText();
  }, []);

  const handleTextChange = async (newText: string) => {
    setText(newText);
    await AsyncStorage.setItem('editorText', newText);
  };

  const isDarkMode = colorScheme === 'dark';

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000' : '#fff' },
      ]}
    >
      <TextInput
        style={[
          styles.textInput,
          {
            backgroundColor: isDarkMode ? '#333' : '#f9f9f9',
            color: isDarkMode ? '#fff' : '#000',
          },
        ]}
        value={text}
        onChangeText={handleTextChange}
        placeholder="Start typing..."
        placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
        multiline
      />
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  textInput: {
    flex: 1,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
  },
});
