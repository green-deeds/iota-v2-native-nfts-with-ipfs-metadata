require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { mint, create_metadata } = require('./src/nft')

const PORT = process.env.PORT || 5000

let nfts = []

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ nfts: [] })
    .write()

// get nfts
nfts = db.get('nfts')
    .value()

app.get('/nfts', (req, res) => {
    res.json(nfts)
})

app.post('/create_nft', async (req, res) => {
    console.log("running...")
    const ipfs_path = await create_metadata()
    console.log("ipfs_path:", ipfs_path)

    var fs = require('fs');
    const callbackFunction = function(err, resp) {
        if (err) { console.log("err", err); return }
        
        console.log("success", resp)
    }
    let temp_file_path = "./nfts/" + Date.now() + ".json"

    // metadata stored to the ledger 
    let nft_metadate = {
        "title": "Asset Metadata",
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "description": "MyFirstNFT"
            },
            "description": {
                "type": "string",
                "description": "My very first NFT that has this metadata with an IPFS file attached to it."
            },
            "ipfs": {
                "type": "string",
                "description": ipfs_path
            }
        }
    }

    fs.writeFile(temp_file_path, JSON.stringify(nft_metadate), callbackFunction)

    let response = await mint(temp_file_path)
    console.log("response:", response)
    console.log("Done!")
    nfts.push(response)

    db.set('nfts', nfts)
        .write()
    res.json(nfts)
})

const main = async function () {

    app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`)
        console.log("nfts", nfts)  
    })
}

main()