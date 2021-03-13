const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

// module.exports = {
//   env: {
//     mongodb_database: "devdoctore",
//   },
// };

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_database: "devdoctore-dev",
      },
    };
  }
  return {
    env: {
      mongodb_database: "devdoctore-prod",
    },
  };
};
