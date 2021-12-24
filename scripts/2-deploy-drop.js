import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from 'fs'

const app = sdk.getAppModule("0x65D968721d5346028cFAA8254B675026eA0C079c");

(async () => {
    try {
        const bundleDropModule = await app.deployBundleDropModule({
            // The collection's name, ex. CryptoPunks
            name: "CryptoMemeDAO Membership",
            description: "It's a DAO for Crypto Memes",
            image: readFileSync("scripts/assets/icon.jpeg"),
            // We need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the module.
            // We're planning on not charging people for the drop, so we'll pass in the 0x0 address
            // you can set this to your own wallet address if you want to charge for the drop.
            primarySaleRecipientAddress: ethers.constants.AddressZero,

        });
        console.log(
            "✅ Successfully deployed bundleDrop module, address:",
            bundleDropModule.address,
        );
        console.log(
            "✅ bundleDrop metadata:",
            await bundleDropModule.getMetadata(),
        );
    } catch (error) {
        console.log("failed to deploy bundleDrop module", error);
    }

})()