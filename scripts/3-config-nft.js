import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
    "0x0C306Fe7989673C7DE48C74cc9B41Ee6f1Db850D",
);

(async () => {
    try {
        await bundleDrop.createBatch([
            {
                name: "Weird Bitcoin Meme",
                description: "This NFT will give you access to CryptoMemeDAO",
                image: readFileSync("scripts/assets/icon.jpeg"),
            }
        ]);
        console.log("✅ Successfully created a new NFT in the drop!");
    } catch (error) {
        console.error("failed to create the new NFT", error);
    }
})()

