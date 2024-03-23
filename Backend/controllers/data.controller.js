const axios = require('axios');
const Data = require('../models/data.model');

exports.fetchFromAPI = async (req, res) => {
    try {
        const apiUrl = 'https://api.dexscreener.com/latest/dex/tokens/inj19dtllzcquads0hu3ykda9m58llupksqwekkfnw';
        const response = await axios.get(apiUrl);

        if (response.status === 200) {
            const responseData = response.data;

            const pairs = responseData.pairs;

            for (const pair of pairs) {
                const { priceNative, priceUsd, volume, priceChange } = pair;

                await Data.create({
                    priceNative,
                    priceUsd,
                    priceChange,
                    volume
                });
            }

            res.json({ message: 'Data inserted successfully.' });
        } else {
            res.status(500).json({ error: 'Failed to fetch data.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch and store data.', details: error.message });
    }
};
