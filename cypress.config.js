const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    specPattern: 'tests/e2e/specs/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false
  }
})