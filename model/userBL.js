const user = require('./usersShema')
const bcrypt = require('bcrypt')



const getUsers = () => {
    let users = user.find({})
    return users
}

const creatUser = async (obj) => {
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(obj.Password, salt)
    const checkUserName = await user.findOne({ UserName: obj.UserName })
    if (checkUserName != null || checkUserName != undefined) {
        return false
    } else {
        let u = new user({
            FullName: obj.FullName,
            UserName: obj.UserName,
            Password: hashPassword
        })
        await u.save()
        return true
    }
}





module.exports = { creatUser, getUsers }