const movie = require('./moviesSchema')
const subscriptions = require('./subscriptionSchema')
const member = require('./membersSchema')

const getWithMembers = async () => {
    const moviesWithData = []
    let movies = await movie.find({})
    let sub = await subscriptions.find({})
    let members = await member.find({})

    for (const movie of movies) {
        let result = sub.filter(x => x.MovieID == movie._id)
        let newMovieObj = {
            _id: movie._id,
            Name: movie.Name,
            premiered: movie.premiered,
            Genres: movie.Genres,
            Img: movie.Img,
            members: []
        }
        members.forEach(m => {

            result.forEach(res => {
                if (res.MemberID == m._id) {
                    let obj = {
                        _id: m._id,
                        Name: m.Name,
                        Date: res.Date
                    }
                    newMovieObj.members.push(obj)
                }
            })
        })
        moviesWithData.push(newMovieObj)
    }
    return moviesWithData
}


const getMovies = () => {
    let movies = movie.find({})
    return movies
}

const getMovieById = async (id) => {
    let u = movie.findById({ _id: id })
    return u
}




const creatMovie = async (obj) => {
    const m = new movie({
        Name: obj.Name,
        premiered: obj.premiered,
        Genres: obj.Genres,
        Img: obj.Img
    })
    await m.save()
    return m._id
}


const updateMovie = async (id, obj) => {
    await movie.findByIdAndUpdate(id, {
        Name: obj.Name,
        premiered: obj.premiered,
        Genres: obj.Genres,
        Img: obj.Img
    })
}

const deleteMovie = async (id) => {
    await movie.findByIdAndDelete(id)
    await subscriptions.deleteMany({ MovieID: id })
}


module.exports = { getWithMembers, getMovieById, creatMovie, updateMovie, deleteMovie, getMovies }