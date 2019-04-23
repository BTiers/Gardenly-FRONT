module.exports = {
  client: {
    name: 'graphql-vscode-client-test',
    service: {
      url: 'http://localhost:3001/graphql'
    },
    includes: ['src/**/*.{ts,tsx,js,jsx,graphql}']
  }
};
