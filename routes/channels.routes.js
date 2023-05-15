const { Router } = require('express')
const {saveChannel, subscribe} = require('../model/channels.model')
const router = Router()

router.post('/create', async (request, response) => {
        try {
        const { user_id, channel_name } = request.body;
        const result = await saveChannel(user_id, channel_name);
        response.json(result);
    } catch (error) {
        console.log('Error:', error);
        response.status(500).json({ success: false, message: error.message });
    }

})

router.post('/subscribe', async (request, response) => {
    try {
    const { user_id, channel_name } = request.body;
    const result = await subscribe(user_id, channel_name);
    response.json(result);
} catch (error) {
    console.log('Error:', error);
    response.status(500).json({ success: false, message: error.message });
}

})
router.get('/', (request, response) => {


})

module.exports = router