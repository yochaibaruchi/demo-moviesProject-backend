const membersBL = require('../model/membersBL')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.get('/', async function (req, resp) {
    //auth with no real secret key...
    const RSA_PRIVATE_KEY = 'ivinkjsdoishjdio'
    let token = req.headers['x-access-token']
    if (!token)
        return resp.json({ auth: false })

    jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
        if (err) {
            return resp.json({ auth: false })
        } else {

            let members = await membersBL.getMembersWithData()
            return resp.json({ myData: members, auth: true })
        }
    })

})

router.get('/:id', async function (req, resp) {


    //auth with no real secret key...
    const RSA_PRIVATE_KEY = 'ivinkjsdoishjdio'
    let token = req.headers['x-access-token']
    if (!token)
        return resp.json({ auth: false })

    jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
        if (err) {
            return resp.json({ auth: false })
        } else {
            let id = req.params.id
            let member = await membersBL.getMemberById(id)
            return resp.json({ myData: member, auth: true })
        }
    })
})


router.get('/unWatched/:id', async function (req, resp) {

    //auth with no real secret key...
    const RSA_PRIVATE_KEY = 'ivinkjsdoishjdio'
    let token = req.headers['x-access-token']
    if (!token)
        return resp.json({ auth: false })

    jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
        if (err) {
            return resp.json({ auth: false })
        } else {
            let id = req.params.id
            let unWatchedMovies = await membersBL.getUnWatchedMoviesByMemberId(id)
            return resp.json({ myData: unWatchedMovies, auth: true })
        }
    })


})

router.post('/', async function (req, resp) {
    let obj = req.body
    try {
        let id = await membersBL.creatMember(obj)
        return resp.json(id)
    } catch (error) {
        return resp.json(`error was found :${error} `)
    }
})

router.put('/:id', async function (req, resp) {
    let obj = req.body
    let id = req.params.id
    try {
        await membersBL.updateMember(id, obj)
        return resp.json('updated')
    } catch (error) {
        return resp.json(`error was found :${error} `)
    }
})

router.delete('/:id', async function (req, resp) {
    let id = req.params.id
    try {
        await membersBL.deleteMember(id)
        return resp.json("deleted")
    } catch (error) {
        return resp.json(`error was found :${error} `)
    }
})

module.exports = router