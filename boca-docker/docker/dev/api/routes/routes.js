const express = require('express')
const router = express.Router()
/**
 * @swagger
 * /api/exemplo:
 *   get:
 *     summary: example.
 *     responses:
 *       200:
 *         description:exemplo.
 */
app.get('/api/exemplo', (req, res) => {
    res.json({ message: 'Exemplo' });
});

module.exports = router