const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'classes')],
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'play-lh.googleusercontent.com'],
  },
};
