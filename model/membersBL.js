const movie = require('./moviesSchema')
const subscriptions = require('./subscriptionSchema')
const member = require('./membersSchema')

const getMembersWithData = async () => {
    let sub = await subscriptions.find({})
    let movies = await movie.find({})
    let members = await member.find({})
    const membersWithData = []
    members.forEach(mem => {
        const result = sub.filter(x => x.MemberID == mem._id)
        const memberWithData = {
            _id: mem._id,
            Email: mem.Email,
            City: mem.City,
            Name: mem.Name,
            Movies: []
        }
        movies.forEach(mov => {
            result.forEach(res => {
                if (res.MovieID == mov._id) {
                    memberWithData.Movies.push({
                        _id: mov._id,
                        Name: mov.Name,
                        Date: res.Date
                    })
                }
            })
        })
        membersWithData.push(memberWithData)
    })


    return membersWithData
}


const getMemberById = (id) => {
    let m = member.findById(id)
    return m
}


const creatMember = async (obj) => {
    let m = new member(obj)
    m.save()
    return m._id
}


const updateMember = async (id, obj) => {
    await member.findByIdAndUpdate(id, obj)
}

const deleteMember = async (id) => {
    await subscriptions.deleteMany({ MemberID: id })
    await member.findByIdAndDelete(id)
}

module.exports = { getMembersWithData, getMemberById, creatMember, updateMember, deleteMember }