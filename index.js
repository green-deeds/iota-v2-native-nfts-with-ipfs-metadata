require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const {mint, create_metadata} = require('./src/nft')


const PORT = process.env.PORT || 5000

const main = async function() {
    // console.log("running...")
    // const path = await create_metadata()
    // console.log("path:", path)


    // let response = await mint(path)
    // console.log("response:", response)
    // console.log("Done!")

    app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`)
        // Schedule tasks to be run on the server.
    })

} 

main()