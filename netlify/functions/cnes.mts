import axios from 'axios';

interface Event {
  queryStringParameters: {
    codigo_municipio: string;
    codigo_tipo_unidade: string;
    offset: string;
  };
}

exports.handler = async function(event: Event) {
  const { codigo_municipio, codigo_tipo_unidade, offset } = event.queryStringParameters;

  const url = `https://apidadosabertos.saude.gov.br/cnes/estabelecimentos?status=1&codigo_municipio=${codigo_municipio}&codigo_tipo_unidade=${codigo_tipo_unidade}&limit=20&offset=${offset}`;

  try {
    const response = await axios.get(url);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' })
    };
  }
};
