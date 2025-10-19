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

// Mock do AsyncStorage (inline) - evita depender do pacote durante testes
const mockAsyncStorage = (() => {
  let store = {};
  return {
    setItem: jest.fn((key, value) => {
      return new Promise((resolve) => {
        store[key] = value;
        resolve(null);
      });
    }),
    getItem: jest.fn((key) => {
      return new Promise((resolve) => {
        resolve(store[key] ?? null);
      });
    }),
    removeItem: jest.fn((key) => {
      return new Promise((resolve) => {
        delete store[key];
        resolve(null);
      });
    }),
    clear: jest.fn(() => {
      return new Promise((resolve) => {
        store = {};
        resolve(null);
      });
    }),
    getAllKeys: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(Object.keys(store));
      });
    }),
  };
})();

// Usa mock virtual para não depender do pacote estar instalado
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage, { virtual: true });

// Mock do Alert global
global.alert = jest.fn();

// Mock de react-hook-form (virtual) para permitir renderizar componentes em testes
jest.mock('react-hook-form', () => {
  const forms = new Map();
  let idCounter = 0;

  function createForm() {
    const id = `form_${++idCounter}`;
    forms.set(id, { values: {}, errors: {} });
    return id;
  }

  const useForm = () => {
    const formId = createForm();
    const control = { _formId: formId };

    const handleSubmit = (onValid, onInvalid) => async () => {
      const state = forms.get(formId) || { values: {}, errors: {} };
      const values = state.values || {};
      const missing = Object.keys(values).filter((k) => !values[k]);

      if (missing.length > 0) {
        const errs = {};
        missing.forEach((k) => (errs[k] = { message: "Por favor, preencher todos os campos" }));
        if (onInvalid) onInvalid(errs);
        return;
      }

      if (onValid) return await onValid(values);
    };

    const register = (name) => {
      return {
        name,
      };
    };

    return {
      control,
      handleSubmit,
      formState: { errors: {}, isSubmitting: false },
      register,
    };
  };

  const Controller = ({ control, name, render }) => {
    const formId = control?._formId;
    if (!formId) {
      return render({ field: { onChange: () => {}, onBlur: () => {}, value: '' } });
    }

    const onChange = (value) => {
      const state = forms.get(formId) || { values: {}, errors: {} };
      state.values = state.values || {};
      state.values[name] = value;
      forms.set(formId, state);
    };

    const onBlur = () => {};

    // Inicializa o campo como string vazia caso ainda não tenha sido registrado/alterado
    const state = forms.get(formId) || { values: {}, errors: {} };
    state.values = state.values || {};
    if (state.values[name] === undefined) {
      state.values[name] = "";
      forms.set(formId, state);
    }

    const value = state.values[name] ?? '';

    return render({ field: { onChange, onBlur, value } });
  };

  return { useForm, Controller };
}, { virtual: true });

// Mock do resolver zod (usado como zodResolver) para testes
jest.mock(
  '@hookform/resolvers/zod',
  () => ({
    zodResolver: () => {
      return (data) => ({ values: data, errors: {} });
    },
  }),
  { virtual: true }
);