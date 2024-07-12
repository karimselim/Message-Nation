module.exports = {
  purge: ["./src/**/*.{html,js,jsx}"],
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        main: "#0a2647",
        second: "#144272",
        third: "#DDF2FD",
        hover: "#9BBEC8",
        side: "#205295",
        prime: "#03e9f4",
      },
      backgroundImage: {
        landing:
          "url('/src/assests/pawel-czerwinski-bX9B9c-YasY-unsplash.jpg')",
      },
    },
  },
  plugins: [],
};
