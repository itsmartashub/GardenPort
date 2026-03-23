import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],

  // Override default chrome browser to Brave
	runner: {
    // Manually point to my Brave exe
    binaries: {
      chrome: "C:/Program Files/BraveSoftware/Brave-Browser-Beta/Application/brave.exe", // Change path for Mac/Linux
    },
  },
});
