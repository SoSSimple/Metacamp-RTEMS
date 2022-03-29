module.exports = {
  head: {
    title: 'MetaCamp',
  },
  modules: [
    '@nuxtjs/axios',
  ],
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  vuetify: {},
  axios: {
    browserBaseURL: 'http://localhost:8080',
    baseURL: 'http://localhost:8080',
    https: false,
  },
  server: {
    port: 3000,
  },
};
