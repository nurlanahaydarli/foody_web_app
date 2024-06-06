const path = require('path');

module.exports = {
    i18n: {
        defaultLocale: 'az',
        locales: ['en', 'az', 'fr'],
    },
    localePath: path.resolve('./public/locales'),
}