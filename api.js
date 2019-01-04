const axios = require('axios');
const ContentApi = require('@tryghost/content-api');
const qs = require('qs');

const printError = (...args) => console.error('\n', ...args); // eslint-disable-line no-console

module.exports.fetchAllPosts = (options) => {
    if (!options.clientId || !options.clientSecret || !options.apiUrl) {
        printError('Plugin Configuration Missing: gatsby-source-ghost requires your apiUrl, clientId and clientSecret');
        process.exit(1);
    }

    if (options.apiUrl.substring(0, 4) !== 'http') {
        printError('Ghost apiUrl requires a protocol, E.g. https://<yourdomain>.ghost.io');
        process.exit(1);
    }

    if (options.apiUrl.substring(0, 8) !== 'https://') {
        printError('Ghost apiUrl should be served over HTTPS, are you sure you want:', options.apiUrl, '?');
    }

    const api = ContentApi.create({
        host: `${options.apiUrl}/ghost`,
        version: 'v2',
        key: options.contentApiKey
    });

    const browseOptions = {
        include: 'authors,tags',
        formats: 'plaintext,html',
        limit: 'all'
    };

    return Promise.all([api.posts.browse(browseOptions), api.pages.browse(browseOptions)]).catch((err) => {
        printError('Error:', err);
        printError('Unable to fetch data from your Ghost API. Perhaps your credentials or apiUrl are incorrect?');
        process.exit(1);
    });
};
