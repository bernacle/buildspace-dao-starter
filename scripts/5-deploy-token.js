import sdk from "./1-initialize-sdk.js";


// In order to deploy the new contract we need our old friend the app module again.
const app = sdk.getAppModule("0x65D968721d5346028cFAA8254B675026eA0C079c");

(async () => {
    try {
        // Deploy a standard ERC-20 contract.

        const tokenModule = await app.deployTokenModule({
            // What's your token's name? Ex. "Ethereum"
            name: "CryptoMemesDAO Governance Token",
            symbol: "CRY"
        });

        console.log(
            "✅ Successfully deployed token module, address:",
            tokenModule.address,
        );
    } catch (error) {
        console.error("failed to deploy token module", error);
    }

})();