const {mint, create_metadata} = require('./src/nft')

const run = async function() {
    console.log("running...")
    const path = await create_metadata()
    console.log("path:", path)
    return
    let response = await mint(path)
    console.log("response:", response)
    console.log("Done!")
} 

run()