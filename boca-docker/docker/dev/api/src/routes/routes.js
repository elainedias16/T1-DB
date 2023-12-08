const pool = require('../database/db_connection')
const express = require('express')
const router = express.Router()
const TagController = require('../controller/TagController');
const tagControllerInstance = new TagController();


/* Creating a new tag */
router.post('/api/contest/:id_c/tag', (req, res) => {
    try{
        const result =  tagControllerInstance.createTag(req, res)
    }catch (error) {
        res.status(500).json({'Error creating tag' :  error.message });
    }

});


/* Deleting a tag */
router.delete('/api/contest/:id_c/tag/:id_t', (req, res) => { 
    try{
        const result =  tagControllerInstance.deleteTag(req, res)
    }catch (error) {
        res.status(500).json({'Error deletiong tag: ' : error.message });

    }

});


/* Getting one tag */
router.get('/api/contest/:id_c/tag/:id_t', (req, res) => {
    try{
        const result  = tagControllerInstance.readTag(req, res)
    }catch (error) {
        res.status(500).json({'Error getting tag' : error.message });
    }

});


/* Getting all tags for a given competition */
router.get('/api/contest/:id_c/tag', (req, res) => {
    try {
        const result = tagControllerInstance.readAllTags(req, res);
    } catch (error) {
        res.status(500).json({'Error getting all tags on routes' : error.message});
    }
});


/* Updating a tag */
router.put('/api/contest/:id_c/tag/:id_t', (req, res) => {
    try{
        const result =  tagControllerInstance.updateTag(req, res)
    } catch (error) {
        res.status(500).json({ 'Error updating tags on routes' : error.message});
    }
});



  

module.exports = router