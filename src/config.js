export const BASE_URL =
  process.env.NODE_ENV == "production"
    ? "https://moodme-challenge-server.herokuapp.com/"
    : "http://localhost:4321";
