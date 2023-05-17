const { Router } = require('express');
const { postNotes, getNotes } = require('../model/notes.model');

const router = Router()


//spara antekningar
router.post('/', async (request, response) => {

    try {
        let result = [];
        const { channel_name, note_title, note_content, user_id } = await request.body;
        for (let index = 0; index < channel_name.length; index++) {
            
            let resp = await postNotes(channel_name[index], note_title, note_content, user_id);
            result.push(resp);

            
        }

        // const result = await postNotes(channel_name, note_title, note_content, user_id);
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

//Sök anteckning
router.get('/search/:date', (request, response) => {

})

module.exports = router