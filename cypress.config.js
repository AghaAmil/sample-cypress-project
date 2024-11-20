const {defineConfig} = require("cypress");

module.exports = defineConfig({
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    e2e: {
        baseUrl: 'https://bookcart.azurewebsites.net/',
        defaultCommandTimeout: 10000,
        supportFile: false,
        excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'],
        specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}'
    },
});