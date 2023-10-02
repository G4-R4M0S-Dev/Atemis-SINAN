const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const baseUrl = 'https://apidadosabertos.saude.gov.br';
    const endpoint = req.url.replace(/^\/api/, '');

    try {
        const apiUrl = baseUrl + endpoint;
        console.log("Redirecting to:", apiUrl);  // Log para depuração

        const apiResponse = await fetch(apiUrl);

        const data = await apiResponse.json();

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(apiResponse.status).json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
