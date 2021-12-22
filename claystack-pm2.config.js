module.exports = {
  apps: [
    {
      name: "test",
      script: "/claystack/src/log.js",
      autorestart: false,
      log_date_format: "DD-MM HH:mm:ss Z",
    },
    {
      name: "claim",
      script: "/claystack/src/claimer.js",
      autorestart: false,
      log_date_format: "DD-MM HH:mm:ss Z",
    },
    {
      name: "fund",
      script: "/claystack/src/fund.js",
      autorestart: false,
      log_date_format: "DD-MM HH:mm:ss Z",
    },
    {
      name: "faucet",
      script: "/claystack/src/faucet.js",
      autorestart: false,
      log_date_format: "DD-MM HH:mm:ss Z",
    },
    {
      name: "stake",
      script: "/claystack/src/staking.js",
      autorestart: false,
      log_date_format: "DD-MM HH:mm:ss Z",
    },
  ],
};
