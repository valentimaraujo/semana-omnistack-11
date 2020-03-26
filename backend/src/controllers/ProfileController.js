const conn = require('../database/connection');

module.exports = {
  async index (req, res) {
    const ong_id = req.headers.authorization;
    let incidents = await conn('incidents').where({ong_id}).select('*');
    return res.json(incidents);
  },
};
