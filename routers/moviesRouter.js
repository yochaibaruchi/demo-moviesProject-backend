const movieBL = require('../model/moviesBL');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
router.get('/', async function (req, resp) {
    const RSA_PRIVATE_KEY = 'ivinkjsdoishjdio'
    let token = req.headers['x-access-token']
    if (!token)
        return resp.json({ auth: false })

    jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
        if (err) {
            return resp.json({ auth: false })
        } else {

            let movies = await movieBL.getWithMembers()
            return resp.json({ myData: movies, auth: true })

        }
    })
})


router.get('/:id', async function (req, resp) {

    const RSA_PRIVATE_KEY = 'ivinkjsdoishjdio'
    let token = req.headers['x-access-token']
    if (!token)
        return resp.json({ auth: false })

    jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
        if (err) {
            return resp.json({ auth: false })
        } else {

            let id = req.params.id
            let movie = await movieBL.getMovieById(id)
            return resp.json({ myData: movie, auth: true })

        }
    })

})

router.post('/', async function (req, resp) {
    let obj = req.body
    let newObjId = await movieBL.creatMovie(obj)
    return resp.json(newObjId)
})

router.put('/:id', async function (req, resp) {
    let id = req.params.id
    let obj = req.body
    try {
        await movieBL.updateMovie(id, obj)
        return resp.json('updated')
    } catch (error) {
        return resp.json(`error was found :${error} `)
    }
})

router.delete('/:id', async function (req, resp) {
    let id = req.params.id
    try {
        await movieBL.deleteMovie(id)
        return resp.json('deleted')
    } catch (error) {
        return resp.json(`error was found :${error}`)
    }
})

module.exports = router