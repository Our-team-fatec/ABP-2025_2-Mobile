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
