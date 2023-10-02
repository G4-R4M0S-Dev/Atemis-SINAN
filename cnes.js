const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const baseUrl = 'https://apidadosabertos.saude.gov.br';
  const endpoint = req.url.replace(/^\/api/, '');

  try {
    const apiResponse = await fetch(baseUrl + endpoint, {
      method: req.method,
      headers: req.headers
    });

    const data = await apiResponse.json();

    // Adicionando headers para resolver problemas de CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.status(apiResponse.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
