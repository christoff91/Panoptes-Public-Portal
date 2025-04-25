
export default {
  basePath: '/Panoptes-Public-Portal',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
