const user = require('../Models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }

        let User = new user({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        })
        User.save()

            .then(User => {
                res.json({
                    message: "user added Successfully"
                })
            })
            .catch(User => {
                res.json({
                    message: "Errorrrrrr"
                })
            })
    })


}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    user.findOne({$or : [{email:username},{phone:username}]})
    .then(User => {
        if(User){
            bcrypt.compare(password, User.password, function(err, result){
                if(err) {
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token =jwt.sign({name : User.name}, 'versecretvalue', {expiresIn : '1h'})
                    res.json({
                        message : "Login Successful",
                        token
                    })
                }else{
                    res.json({
                        message : "Password Incorrect"
                    })
                }
            })
        }else{
            res.json({
                message: "no user Founddd"
            })

        }
    })
}
   module.exports = {register, login} 