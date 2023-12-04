const whitelist = [
  "http://localhost:3500",
  "http://127.0.0.1:3500",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:49999",
  "http://127.0.0.1:49999",
  "https://lustrous-mochi-5b629c.netlify.app",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Please call from the inside of the house..."));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
