import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import 'react-native-gesture-handler';
// Mocking AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
