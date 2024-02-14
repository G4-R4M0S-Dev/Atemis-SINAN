import { Context } from "@netlify/functions";
import axios from 'axios';

export default async (req: Request, context: Context) => {
  const params = new URL(req.url).searchParams;
  const codigo_municipio = params.get('codigo_municipio');
  const codigo_tipo_unidade = params.get('codigo_tipo_unidade');
  const limit = params.get('limit');
  const offset = params.get('offset');

  const url = `https://apidadosabertos.saude.gov.br/api/v1/cnes/estabelecimentos?status=1&codigo_municipio=${codigo_municipio}&codigo_tipo_unidade=${codigo_tipo_unidade}&limit=${limit}&offset=${offset}`;

  try {
    const response = await axios.get(url);
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
  }
};
