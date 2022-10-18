const userBL = require('../model/userBL')
const users = require('../model/usersShema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

router.get('/', async function (req, resp) {
    let users = await userBL.getUsers()
    return resp.json(users)
})

// auth for pages with no get req..

router.get('/Auth', async function (req, resp) {

    //auth with no real secret key...
    const RSA_PRIVATE_KEY = 'ivinkjsdoishjdio'
    let token = req.headers['x-access-token']
    if (!token)
        return resp.json(false)

    jwt.verify(token, RSA_PRIVATE_KEY, async function (err, decoded) {
        if (err) {
            return resp.json(false)
        } else {
            return resp.json(true)
        }
    })

})


router.post('/', async function (req, resp) {
    let obj = req.body;
    let anser = await userBL.creatUser(obj)
    if (anser == true) {
        return resp.json(true)
    } else {
        return resp.json(false)
    }
})

router.post('/login', async function (req, resp) {
    const u = await users.findOne({ UserName: req.body.UserName })
    if (u == null) {
        return resp.json({ enter: false })
    } else {
        if (await bcrypt.compare(req.body.Password, u.Password)) {
            //user id
            const userID = u._id
            // private key 
            const RSA_PRIVATE_KEY = 'ivinkjsdoishjdio'
            let tokenData = jwt.sign({ id: userID },
                RSA_PRIVATE_KEY,
                { expiresIn: 7200 }
            )
            return resp.status(200).json({ enter: true, userFullName: u.FullName, token: tokenData })
        } else {
            return resp.json({ enter: false })
        }
    }
})


module.exports = router