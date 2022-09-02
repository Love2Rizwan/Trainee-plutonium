let axios = require("axios")

const getAllMemes = async function(req,res){
    try {
        const options = {
            "method" : "get",
            "url" : "https://api.imgflip.com/get_memes"
        }
    
        const result = await axios(options)
        res.status(200).send({msg : result.data})
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }

}

const captionImage = async function(req,res){
    try {
        const {template_id, text0, text1, username, password} = req.query
        const options = {
            "method" : "get",
            "url" : `https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`
        }
    
        const result = await axios(options)
        res.status(200).send({msg : result.data})
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }

}

module.exports.getAllMemes = getAllMemes
module.exports.captionImage = captionImage