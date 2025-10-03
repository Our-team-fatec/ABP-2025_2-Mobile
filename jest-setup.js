// Mock expo-router
jest.mock('expo-router', () => ({
  Link: ({ children, href, ...props }) => children,
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  usePathname: () => '/',
}));

// Mock de todos os ícones do @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');

  const createMockComponent = (name) => {
    return ({ testID, children, ...props }) => {
      return React.createElement(Text, {
        testID: testID || `${name}-mock`,
        ...props
      }, children || name);
    };
  };

  return {
    MaterialIcons: createMockComponent('MaterialIcons'),
    FontAwesome: createMockComponent('FontAwesome'),
    Ionicons: createMockComponent('Ionicons'),
    AntDesign: createMockComponent('AntDesign'),
    Entypo: createMockComponent('Entypo'),
    EvilIcons: createMockComponent('EvilIcons'),
    Feather: createMockComponent('Feather'),
    Foundation: createMockComponent('Foundation'),
    MaterialCommunityIcons: createMockComponent('MaterialCommunityIcons'),
    Octicons: createMockComponent('Octicons'),
    SimpleLineIcons: createMockComponent('SimpleLineIcons'),
    Zocial: createMockComponent('Zocial'),
  };
});

// Mock do AsyncStorage
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Mock do Alert global
global.alert = jest.fn();