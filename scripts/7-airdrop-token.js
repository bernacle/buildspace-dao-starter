import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";


// This is the address to our ERC-1155 membership NFT contract.
const bundleDropModule = sdk.getBundleDropModule(
    "0x0C306Fe7989673C7DE48C74cc9B41Ee6f1Db850D",
);

// This is the address to our ERC-20 token contract.
const tokenModule = sdk.getTokenModule(
    "0xCA57F27928127dDc2cC2bA445867B10B4599323D",
);


(async () => {
    try {
        // Grab all the addresses of people who own our membership NFT, which has 
        // a tokenId of 0.
        const walletAddress = await bundleDropModule.getAllClaimerAddresses("0")

        if (walletAddress.length === 0) {
            console.log(
                "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
            );
            process.exit(0);
        }

        // Loop through the array of addresses.

        const airdropTargets = walletAddress.map(address => {
            // Pick a random # between 1000 and 10000.
            const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000)
            console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

            // Set up the target.

            const airdropTarget = {
                address,
                // Remember, we need 18 decimal placees!
                amount: ethers.utils.parseUnits(randomAmount.toString(), 18),
            };

            return airdropTarget;
        });
        // Call transferBatch on all our airdrop targets.
        console.log("🌈 Starting airdrop...")
        await tokenModule.transferBatch(airdropTargets);
        console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");

    } catch (err) {
        console.error("Failed to airdrop tokens", err);
    }
})();