const server = require('../../server');
const TagRepository = require('../repository/TagRepository');

//Define types of responses:
const success_create = 201 
const success_read = 202
const success_delete = 203
const success_updated = 200
const bad_request = 400
const not_found = 404


class TagController {
    constructor() {
        this.tagRepository = new TagRepository(); 
    }

 
    async  createTag(req, res) {
        try {
            const id_c = req.params.id_c;  
            const { entityTag } = req.body
           
            /* Check if the required data exists */
            if (!entityTag || !entityTag.tag || !entityTag.tag.name || !entityTag.tag.value || !entityTag.entityType) {
                return res.status(400).json({error: 'Missing data for creating tag on controller' });
            }
              
            /* Calling the repository to create the tag  */
            const newTag = await this.tagRepository.createTag(id_c , entityTag);
            
            return res.status(success_create).json({
                message: 'Tag created successfully',
                tagId: newTag,
            });

        } catch (error) {
            return res.status(not_found).json({'Error creating tag on controller': error.message});

        }
    }



    async  deleteTag(req, res) {
        try {
            const id_c = req.params.id_c;  
            const id_t = req.params.id_t;

            /* Check if the required data exists  */
            if (!id_c || !id_t) {
              return res.status(bad_request).json({ error: 'Missing data for deleting tag on controller' });
            }

            /* Calling the repository to delete the tag */
            await this.tagRepository.deleteTag(id_c , id_t);

            return res.status(success_delete).send({ message: 'Tag deleted successfully' });


        } catch (error) {
            console.error('Error deleting tag:', error);
            return res.status(not_found).json({'Error deleting tag on controller': error.message});

        }
    }

   
    async  readTag(req, res) {
        try {

            const id_c = req.params.id_c;  
            const id_t = req.params.id_t;

           /* Check if the required data exists  */
            if (!id_c || !id_t) {
              return res.status(bad_request).json({ error: 'Missing data for reading tag on controller' });
            }

            const response = await this.tagRepository.readTag(id_c , id_t);
            return res.status(success_read).json(response);

        } catch (error) {
            return res.status(not_found).json({'Error reading one tag on controller': error.message});

        }
    }


    async readAllTags(req, res) {
        try {
            const id_c = req.params.id_c;  /* ID competition  */
            
            /* Check if the required data exists */
            if (!id_c) {
                return res.status(bad_request).json({ error: 'Missing data for reading all tags on controller' });
            }
    
            const response = await this.tagRepository.readAllTags(id_c);
            return res.status(success_read).json(response);

        } catch (error) {
            console.error('Error reading all tags on controller:', error);
            return res.status(not_found).json({'Error reading all tags on controller': error.message});

        }
    }

    
    async updateTag(req, res) {
        const id_c = req.params.id_c;  // ID competition
        const id_t = req.params.id_t;  // ID tag
        const tag_name = req.body.name; 
        const tag_value = req.body.value;

        try{
            /* Check if the required data exists */
            if (!id_c || !id_t || (!tag_name && !tag_value) ) {
                return res.status(bad_request).json({ error: 'Missing data for tag updating on controller' });
            }

            await this.tagRepository.updateTag(id_c , id_t , tag_name, tag_value);
            return res.status(success_updated).send({ message: 'Tag updated successfully' });


        }catch (error) {
            console.error('Error creating tag:', error);
            return res.status(not_found).json({'Error updating on controller': error.message });
        }



    }





}
  
module.exports = TagController;