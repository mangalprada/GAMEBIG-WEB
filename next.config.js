const { withSentryConfig } = require('@sentry/nextjs');
const path = require('path');
const withPWA = require('next-pwa');

const withTM = require('next-transpile-modules')([
  '@pusher/push-notifications-web',
]);

moduleExports = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    maximumFileSizeToCacheInBytes: 5000000,
  },
  outputFileTracing: false,
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'play-lh.googleusercontent.com',
      'graph.facebook.com',
      'firebasestorage.googleapis.com',
      'images.unsplash.com',
    ],
  },
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    FIREBASE_MESSAGING_VAPID_KEY: process.env.FIREBASE_MESSAGING_VAPID_KEY,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    ALGOLIA_APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID,
    ALGOLIA_SEARCH_ONLY_API_KEY: process.env.ALGOLIA_SEARCH_ONLY_API_KEY,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    MIXPANEL_TOKEN: process.env.MIXPANEL_TOKEN,
    BASE_URL: process.env.BASE_URL,
    MONGODB_URI: process.env.MONGODB_URI,
    DB_NAME: process.env.DB_NAME,
    PUSHER_BEAM_INSTANCE_ID: process.env.PUSHER_BEAM_INSTANCE_ID,
    PUSHER_BEAM_SECRET_KEY: process.env.PUSHER_BEAM_SECRET_KEY,
    THE_OG: process.env.THE_OG,
  },
});

moduleExportsTM = withTM(moduleExports);

const sentryWebpackPluginOptions = {
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true,
};

module.exports = withSentryConfig(moduleExportsTM, sentryWebpackPluginOptions);
