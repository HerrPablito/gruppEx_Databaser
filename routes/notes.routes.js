const { Router } = require('express')

const router = Router()


//spara antekningar
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
//Hämta anteckningar
router.get('/notes', (request, response) => {


})

//Sök anteckning
router.get('/search/:date', (request, response) => {

})

module.exports = router