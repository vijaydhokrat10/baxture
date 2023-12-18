// dataStore.js
let sharedData = [];

module.exports = {
  getData: () => sharedData,
  setData: (data) => {
    sharedData = data;
  },
};