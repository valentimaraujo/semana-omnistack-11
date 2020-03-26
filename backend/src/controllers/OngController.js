const crypto = require('crypto');
const conn = require('../database/connection');

module.exports = {
  async index (req, res) {
    let ongs = await conn('ongs').select('*');
    return res.json(ongs);
  },

  async create (req, res) {
    const { nome, email, whatsapp, city, uf } = req.body;
    const id = crypto.randomBytes(4).toString('HEX').toUpperCase();

    await conn('ongs').insert({
      id, nome, email, whatsapp, city, uf
    });

    return res.json({id});
  },
};
