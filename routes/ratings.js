const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.json({
        msg: 'get api'                
    })
})

router.put('/', (req, res) => {
    res.json({
        msg: 'put api'                
    })
})

router.post('/', (req, res) => {
    res.json({
        msg: 'post api'                
    })
})

router.delete('/', (req, res) => {
    res.json({
        msg: 'delete api'                
    })
})

module.exports = router;