const { Router } = require('express')
const router = Router()
const { saveUser } = require('../model/user.model')
const { showSubscriptedNotes, showSubscriptedNotesByDateNewest, showSubscriptedNotesByDateOldest } = require('../model/user.model')

router.post('/signup', async (request, response) => {
    try {
        const { user_name, password } = request.body;
        const result = await saveUser(user_name, password);
        response.json(result);
    } catch (error) {
        console.log('Error:', error);
        response.status(500).json({ success: false, message: error.message });
    }
})

router.get('/subscriptions/:user_id', async (request, response) => {
    try {
        const { user_id } = request.params;
        const result = await showSubscriptedNotes(user_id);
        response.json(result);
    } catch (error) {
        console.log('Error:', error);
        response.status(500).json({ success: false, message: error.message });
    }

})


router.get('/subscriptions/:user_id/oldest', async (request, response) => {
    try {
        const { user_id } = request.params;
        const result = await showSubscriptedNotesByDateOldest(user_id);
        response.json(result);
    } catch (error) {
        console.log('Error:', error);
        response.status(500).json({ success: false, message: error.message });
    }

})

router.get('/subscriptions/:user_id/newest', async (request, response) => {
    try {
        const { user_id } = request.params;
        const result = await showSubscriptedNotesByDateNewest(user_id);
        response.json(result);
    } catch (error) {
        console.log('Error:', error);
        response.status(500).json({ success: false, message: error.message });
    }

})



module.exports = router;