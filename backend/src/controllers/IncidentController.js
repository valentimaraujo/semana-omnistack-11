const conn = require('../database/connection');

module.exports = {
  async index (req, res) {
    const { page = 1 } = req.query;

    const [count] = await conn('incidents').count();

    const incidents = await conn('incidents as i')
      .join('ongs as o', 'o.id', '=', 'i.ong_id')
      .limit(5)
      .offset(( page - 1 ) * 5)
      .select(['i.*', 'o.name', 'o.email', 'o.whatsapp', 'o.name', 'o.city', 'o.uf']);

    res.header('X-Total-Count', count['count(*)']);
    return res.json(incidents);
  },

  async create (req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [ id ] = await conn('incidents').insert({
      title, description, value, ong_id
    });

    return res.json({ id });
  },

  async delete (req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const del = await conn('incidents').where({ id, ong_id }).first();

    if (del) {
      await conn('incidents').where({ id, ong_id }).delete();
      return res.status('204').send();
    }

    return res.status('401').json({ error: 'Operation not permitted.' });
  }
};
