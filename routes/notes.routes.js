const { Router } = require('express');
const { postNotes, getNotes, getNotesByDateOldest, getNotesByDateNewest } = require('../model/notes.model');

const router = Router()


//spara antekningar
router.post('/', async (request, response) => {

    
    try {
        const { channel_name, note_title, note_content, user_id } = request.body;
        const result = await postNotes(channel_name, note_title, note_content, user_id);
        response.json(result);
    } catch (error) {
        console.log('Error:', error);
        if (error === 'User is not a subscriber') {
            response.status(403).json({ success: false, message: error });
        } else {
            response.status(500).json({ success: false, message: error.message });
        }
    }
})
//Hämta anteckningar
router.get('/:user_id', async (request, response) => {
    try {
        const { user_id } = request.params;
        const result = await getNotes(user_id);
        response.json(result);
    } catch (error) {
        console.log('Error:', error);
        response.status(500).json({ success: false, message: error.message });
    }

})

router.get('/:user_id/oldest', async (request, response) => {
    try {
        const { user_id } = request.params;
        const result = await getNotesByDateOldest(user_id);
        response.json(result);
    } catch (error) {
        console.log('Error:', error);
        response.status(500).json({ success: false, message: error.message });
    }

})
router.get('/:user_id/newest', async (request, response) => {
    try {
        const { user_id } = request.params;
        const result = await getNotesByDateNewest(user_id);
        response.json(result);
    } catch (error) {
        console.log('Error:', error);
        response.status(500).json({ success: false, message: error.message });
    }

})




module.exports = router