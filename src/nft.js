const { exec } = require("child_process");
const { NFTStorage, File } = require('nft.storage')

const apiKey = process.env.NFTSTORAGE_API
const client = new NFTStorage({ token: apiKey })


const create_metadata = function () {
    let myPromise = new Promise(async function (myResolve, myReject) {

        const metadata = await client.store({
            name: 'Tree NFT',
            description: 'The first Tree NFT',
            height: Math.floor(Math.random() * 42) + 1,
            image: new File([/* data */], 'tree.jpg', { type: 'image/jpg' })
        })
        console.log(metadata)

        myResolve(metadata.url);
    });
    return myPromise
}

function mint(path) {
    let myPromise = new Promise(function (myResolve, myReject) {

        let command = `./cli-wallet create-nft -immutable-data ${path}`
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                myReject();
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                myReject();
            }
            myResolve(stdout);
        });
    });
    return myPromise
}

module.exports = {
    mint, create_metadata
}