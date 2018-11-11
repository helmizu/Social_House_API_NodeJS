const mongo = require('arkademy-mongo');
const config = require('../config')
const ObjectId = require('mongodb').ObjectId
const thread = {}

thread.posting = (req, res) => {
    const data = {
        uid : req.user._id,
        post : req.body.post,
        time : new Date().toLocaleString()
    }
    mongo.GetDBObject().collection("thread").insertOne(data, (err, result) => {
        if (err) return res.status(500).json(config.internal_error)
        res.status(201).json({msg : "data inserted"})
    })
}

// child from thread in thread doc
/* thread.comment = (req, res) => {
    var comment = []
    const uid = req.user._id.toString()
    const data = {
        uid : uid,
        tid : new ObjectId(req.body.tid),
        comment : req.body.comment,
        time : new Date().toLocaleString()
    }

    mongo.GetDBObject().collection("thread").find({_id : new ObjectId(req.params.tid)}).toArray((err, post) => {
        if (err) return res.status(500).json(config.internal_error)
        if (post[0].comment) {
            comment = post[0].comment
            comment.push(data)
        } else {
            comment.push(data)
        }
        mongo.GetDBObject().collection("thread").updateOne({_id : new ObjectId(req.params.tid)}, {$set: {comment: comment}}, {upsert: true}, (err, result) => {
            if (err) return res.status(500).json(config.internal_error)
            res.status(200).json(result)
        });
    })   
} */

// new documents for comment
thread.comment = (req, res) => {
    const data = {
        uid : req.user._id,
        tid : new ObjectId(req.params.tid),
        comment : req.body.comment,
        time : new Date().toLocaleString()
    }
    
    mongo.GetDBObject().collection("comment").insertOne(data, (err, result) => {
        if (err) return res.status(500).json(config.internal_error)
        res.status(201).json({msg : "data inserted"})
    })
}

thread.like = (req, res) => {
    var like = []
    const uid = req.user._id.toString()
    mongo.GetDBObject().collection("thread").find({_id : new ObjectId(req.params.tid)}).toArray((err, post) => {
        if (err) return res.status(500).json(config.internal_error)
        if (post[0].like) {
            like = post[0].like
            const index = like.indexOf(uid)
            if (index >= 0) {
                like.splice(index, 1)
            } else {
                like.push(uid)
            }
        } else {
            like.push(uid)
        }
        mongo.GetDBObject().collection("thread").updateOne({_id : new ObjectId(req.params.tid)}, {$set: {like: like}}, {upsert: true}, (err, result) => {
            if (err) return res.status(500).json(config.internal_error)
            res.status(200).json(result)
        });
    })
}

module.exports = thread