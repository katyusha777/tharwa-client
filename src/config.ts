const config = {

  env: {
  },

  api: {
    url: 'https://tharwa.katyusha.app/api',
  },

  exchange_rate: {
    usd_gems: 1.7,
  },

  provablyFair: {
    codepenUrl: 'https://codepen.io/blue_gem/pen/JoYGMJN',
  },

  sentry: {
    dsn: 'https://1afb9e97d359637a1ec0bd8131ef5741@o4509691654045696.ingest.de.sentry.io/4509691816640592',
  },

  facebook: {
    pixelId: import.meta.env.VITE_FACEBOOK_PIXEL_ID,
  },

  cdn: {
    cloudflare: {
      url: 'https://cf-cdn.bluegem.gg',
    },
  },

  roulette: {
    spinDuration: 7000,
  },

  dice: {
    spinDuration: 5000,
    spinDurationFast: 2250,
    resetDuration: 500,
  },

  boxes: {
    spinDuration: 3500,
    spinDurationFast: 2250,
    betweenRoundsDuration: 1500,
    jackpotWheelDuration: 9000,
    tieBreaking: {
      spinDuration: 3250,
    },
  },

  window: {
    minBaseSize: 1200,
  },
}

export default config
