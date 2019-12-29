const db = require('./db')
const utils = require('./utils')
const express = require('express')
const cryptoJs = require('crypto-js')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Admin`
    connection.query(statement, (error, data) => {
        connection.end()
        console.log(error)
        console.log(data)
        const user = []
        for (let index = 0; index < data.length; index++) {
            const admin= data[index]
                user.push({
                admin_id: admin['Admin_id'],
                admin_firstname: admin['Admin_firstname'],
                admin_email: admin['Admin_email']
            })
        }
        response.send(utils.createResult(error, user))
    })
})

router.post('/login', (request, response) => {
    const {Admin_email, Admin_password} = request.body
   // const encrypteduser_Password = '' + cryptoJs.MD5(password)
    const connection = db.connect()
    const statement = `select * from Admin where Admin_email = '${Admin_email}' and Admin_password = '${Admin_password}'`
    connection.query(statement, (error, admins) => {
        connection.end()
        
        if (admins.length == 0) {
            response.send(utils.createResult('admin does not exist'))
        } else {
            const admin = admins[0]
            const info = {
                adminname: admin['Admin_firstname'],
                email: admin['Admin_email']
            }
            response.send(utils.createResult(null, info))
        }
    })
})

router.post('/register', (request, response) => {
    const {Admin_firstname, Admin_lastname,Admin_email, Admin_password,Admin_locality,Admin_street,Admin_houseno,Admin_image} = request.body
    //const encrypteduser_Password = '' + cryptoJs.MD5(password)
    const connection = db.connect()

    const statement1 = `select * from Admin where Admin_email = '${Admin_email}'`  
    connection.query(statement1, (error, admin) => {

        if (admin.length == 0) {
            // user with the required email does not exist

            // insert a new record
            const statement = `insert into Admin (Admin_firstname , Admin_lastname , Admin_email , Admin_password , Admin_locality , Admin_street , Admin_houseno , Admin_image ) values ('${Admin_firstname}' , '${Admin_lastname}' , '${Admin_email}' , '${Admin_password}' , '${Admin_locality}' , '${Admin_street}' , '${Admin_houseno}' ,'${Admin_image}')`
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