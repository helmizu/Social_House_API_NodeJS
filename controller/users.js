const mongo = require('arkademy-mongo');
const config = require('../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

const users = {};

mongo.Connect(config.Mongo, (err, db, dbo) => {
    if (err) throw err;
    console.log('MongoDB Connect');
});

users.signup = (req, res) => {
    var data = req.body
    
    if(!data.email || (typeof data.email === undefined) || data.email === "") {
        return res.status(400).json({msg : "email required"}) 
    } else { 
        data.email = data.email.trim()
        data.email = data.email.toLowerCase() 
    }
    if(!data.username || (typeof data.username === undefined) || data.username === "") {
        return res.status(400).json({msg : "username required"}) 
    } else { 
        data.username = data.username.trim()
        data.username = data.username.toLowerCase() 
    }
    if(!data.password || (typeof data.password === undefined) || data.password === "") { 
        return res.status(400).json({msg : "password required"}) 
    } else {
        data.password = data.password.trim()
    }

    if(!data.confirm || (typeof data.confirm === undefined) || data.confirm === "") { 
        return res.status(400).json({msg : "confirm password required"}) 
    } else {
        if(data.confirm !== data.password) {
            return res.status(400).json({msg : "password and confirm password doesn't matches"}) 
        } else {
            data.confirm = ''
        }
    }
    
    mongo.GetDBObject().collection('auth').find({email : data.email}).toArray((err, result) => {
        if (err) return res.status(500).json(err)
        if (result.length > 0) {
            res.status(400).json({msg : "email telah terdaftar"})      
        } else {
            mongo.GetDBObject().collection('auth').find({email : data.email}).toArray((erro, result) => {
                if (erro) return res.status(500).json(erro)
                if (result.length > 0) {
                    res.status(400).json({msg : "username telah digunakan"})      
                } else {
                    bcrypt.genSalt(10, (err, salt) => {
                        if(err) return res.status(500).json({err : "hash error"})
                        bcrypt.hash(data.password, salt, (err, hash) => {
                            if(err) return res.status(500).json({err : "hash error"})
                            data.password = hash
                            mongo.GetDBObject().collection('auth').insertOne(data, (error, result) => {
                                if (error) return res.status(500).json(error);
                                res.status(201).json({msg : "data inserted"})
                            })
                        })
                    })   
                }
            })
        }
    })
}

users.login = (req, res) => {
    var data = req.body
    
    if(!data.email || (typeof data.email === undefined) || data.email === "") {
        return res.status(400).json({msg : "email required"}) 
    } else { 
        data.email = data.email.trim()
        data.email = data.email.toLowerCase() 
    }
    if(!data.password || (typeof data.password === undefined) || data.password === "") { 
        return res.status(400).json({msg : "password required"}) 
    } else {
        data.password = data.password.trim()
    }
    
    mongo.GetDBObject().collection('auth').find({email : data.email}).toArray((err, user) => {
        if (err) return res.status(400).json({msg : "email tidak terdaftar"})
        if (user.length > 0) {
            bcrypt.compare(data.password, user[0].password, function (err, isMatch) {
                if (err) return res.status(500).json({err : "compare error"})
                if (isMatch) {
                    jwt.sign(user[0], keys.secretOrKey, {expiresIn: 60*60}, (err, token) => {
                        if (err) return res.status(500).json({err : "generate token error"})
                        return res.status(200).json({
                            success : true,
                            token: 'Bearer ' + token
                        })
                    })
                } else {
                    return res.status(400).json({err : "password salah"})
                }
            })
        } else {
            mongo.GetDBObject().collection('auth').find({username : data.email}).toArray((err, user) => {
                if (err) return res.status(400).json({msg : "email tidak terdaftar"})
                if (user.length > 0) {
                    bcrypt.compare(data.password, user[0].password, function (err, isMatch) {
                        if (err) return res.status(500).json({err : "compare error"})
                        if (isMatch) {
                            jwt.sign(user[0], keys.secretOrKey, {expiresIn: 60*60}, (err, token) => {
                                if (err) return res.status(500).json({err : "generate token error"})
                                return res.status(200).json({
                                    success : true,
                                    token: 'Bearer ' + token
                                })
                            })
                        } else {
                            return res.status(400).json({err : "password salah"})
                        }
                    })
                } else {
                    return res.status(404).json({err : "User belum terdaftar"})
                }
            })
        }
    })
}

module.exports = users