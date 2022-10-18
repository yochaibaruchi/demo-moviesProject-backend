const subBL = require('../model/subscriptionsBL')
const express = require('express');
const router = express.Router();


router.post('/', async function (req, resp) {
    let obj = req.body
    let newID = await subBL.creatSub(obj)
    return resp.json(newID)
})


router.delete('/:id', async function (req, resp) {
    let id = req.params.id
    await subBL.deleteSub(id)
    return resp.json('deleted')
})

module.exports = router;