
const withTM = require('next-transpile-modules')([
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/timegrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
]);

const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, './src/assets')],
  }
});
