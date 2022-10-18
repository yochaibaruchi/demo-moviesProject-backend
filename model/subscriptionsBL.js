const sub = require('./subscriptionSchema')

const creatSub = async (obj) => {
    let s = new sub(obj)
    s.save()
    return s._id
}


const deleteSub = async (id) => {
    await sub.findByIdAndDelete(id)
}





module.exports = { creatSub, deleteSub }