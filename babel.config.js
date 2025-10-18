module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: (() => {
      const base = [
        [
          "module:react-native-dotenv",
          {
            moduleName: "@env",
            path: ".env",
            blacklist: null,
            whitelist: null,
            safe: false,
            allowUndefined: true,
          },
        ],
      ];

      // Durante testes (Jest) o plugin de reanimated pode não estar disponível.
      // Evita erro de 'Cannot find module "react-native-reanimated/plugin"'.
      if (process.env.NODE_ENV !== "test" && !process.env.JEST_WORKER_ID) {
        base.push("react-native-reanimated/plugin");
      }

      return base;
    })(),
  };
};
