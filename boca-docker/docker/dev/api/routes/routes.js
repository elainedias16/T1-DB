const express = require('express')
const router = express.Router()



//comecei aqui:

/**
 * @swagger
 * /api/contest/{id_c}/tag:
 *   post:
 *     summary: Create a new tag associated to the competion.
 *     description: Create a new tag associated to the competion specified by id_c.
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id_c
 *         required: true
 *         description: Competition ID to which the tag will be associated.
 *         schema:
 *           type: integer
 *       - in: body
 *         name: tag
 *         required: true
 *         description: Tag data to be registered.
 *         schema:
 *           type: object
 *           properties:
 *             chave:
 *               type: string
 *               description: Tag Key.
 *             valor:
 *               type: string
 *               description: Tag value (opcional).
 *     responses:
 *       '201':
 *         description: Tag registered successfully.
 *       '400':
 *         description: Invalid parameters.
 *       '500':
 *         description: Internal Server Error.
 */
router.post('/api/contest/:id_c/tag', (req, res) => {
    try{
        const id_c = req.params.id_c;  //ID competion
        const { name, value } = req.body; // Tags Data

        const newTag = {
            name,
            value,
        };

        ///////Add logic to add tag here ///////////////////
        // tagsService.cadastrarTag(idCompeticao, chave, valor); cretae a service or folder to queries

        res.status(201).json({ message: 'New tag registered successfully', tag: newTag });

    }catch (error) {
        console.error('Error creating tag:', error);
        res.status(500).json({ error: 'Error creating tag' });
    }

});


/**
 * @swagger
 * /api/contest/{id_c}/tag/{id_t}:
 *   get:
 *     summary: Get a specific tag associated with a competition.
 *     description: Get information about a specific tag associated with the competition specified by `id_c`.
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id_c
 *         required: true
 *         description: ID of the competition.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_t
 *         required: true
 *         description: ID of the tag.
 *         schema:
 *           type: integer
 *     responses:
 *       '201':
 *         description: Tag received successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: Tag received successfully
 *               tag:
 *                 id: 1
 *                 name: "example"
 *                 value: "sample"
 *       '400':
 *         description: Invalid parameters.
 *       '500':
 *         description: Internal server error.
 */
router.get('/api/contest/:id_c/tag/:id_t', (req, res) => {
    try{
        const id_c = req.params.id_c;  //ID competion
        const id_t = req.params.id_t;  //ID tag

      
        ///////Add logic  ///////////////////
        // tagsService.getTag(idCompeticao, idTag); cretae a service or folder to queries

        res.status(201).json({ message: 'Tag received successfully', tag: newTag });

    }catch (error) {
        console.error('Error getting tag:', error);
        res.status(500).json({ error: 'Error getting tag' });
    }

});






  

module.exports = router