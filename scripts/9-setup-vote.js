import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";


// This is our governance contract.
const voteModule = sdk.getVoteModule(
    "0x7bc453A936bfb544FDF845440d040610B951a024",
);

// This is our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
    "0xCA57F27928127dDc2cC2bA445867B10B4599323D",
);

(async () => {
    try {
        // Give our treasury the power to mint additional token if needed.
        await tokenModule.grantRole("minter", voteModule.address);
        console.log(
            "Successfully gave vote module permissions to act on token module"
        );
    } catch (error) {
        console.error(
            "failed to grant vote module permissions on token module",
            error
        );
        process.exit(1);
    }

    try {
        // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
        const ownedTokenBalance = await tokenModule.balanceOf(
            process.env.WALLET_ADDRESS
        );

        // Grab 90% of the supply that we hold.
        const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
        const percent90 = ownedAmount.div(100).mul(90);

        // Transfer 90% of the supply to our voting contract.
        await tokenModule.transfer(
            voteModule.address,
            percent90
        );

        console.log("✅ Successfully transferred tokens to vote module");

    } catch (err) {
        console.error("failed to transfer tokens to vote module", err);
    }
})();