const db = require('./db')
const utils = require('./utils')
const express = require('express')
const cryptoJs = require('crypto-js')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from user`
    connection.query(statement, (error, data) => {
        connection.end()
        console.log(error)
        console.log(data)
        const users = []
        for (let index = 0; index < data.length; index++) {
            const user = data[index]
            users.push({
                id: user['user_id'],
                username: user['user_firstname'],
                email: user['user_email']
            })
        }
        response.send(utils.createResult(error, users))
    })
})

router.post('/login', (request, response) => {
    const {user_email, user_password} = request.body
   // const encrypteduser_Password = '' + cryptoJs.MD5(password)
    const connection = db.connect()
    const statement = `select * from user where user_email = '${user_email}' and user_password = '${user_password}'`
    connection.query(statement, (error, users) => {
        connection.end()
        
        if (users.length == 0) {
            response.send(utils.createResult('user does not exist'))
        } else {
            const user = users[0]
            const info = {
                username: user['user_firstname'],
                email: user['user_email']
            }
            response.send(utils.createResult(null, info))
        }
    })
})

router.post('/register', (request, response) => {
    const {user_firstname, user_lastname,user_email, user_password,user_locality,user_street,user_houseno,user_image} = request.body
    //const encrypteduser_Password = '' + cryptoJs.MD5(password)
    const connection = db.connect()

    const statement1 = `select * from user where user_email = '${user_email}'`  
    connection.query(statement1, (error, users) => {

        if (users.length == 0) {
            // user with the required email does not exist

            // insert a new record
            const statement = `insert into user (user_firstname , user_lastname , user_email , user_password , user_locality , user_street , user_houseno , user_image ) values ('${user_firstname}' , '${user_lastname}' , '${user_email}' , '${user_password}' , '${user_locality}' , '${user_street}' , '${user_houseno}' ,'${user_image}')`
            connection.query(statement, (error, data) => {
                connection.end()
                response.send(utils.createResult(error, data))
            })
        } else {
            // user with email already exists
            connection.end()
            response.send(utils.createResult('email exists. please use another email.'))
        }


    })

    
})

module.exports = router 