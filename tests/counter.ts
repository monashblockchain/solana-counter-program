import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import { PublicKey, SystemProgram } from "@solana/web3.js";

/*
The default of this project will test the program on your local device.

Run: "anchor test" in your terminal to test it

To change the network from local network to solana devnet, go to Anchor.toml
*/

describe("counter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Counter as Program<Counter>;
  const provider = anchor.AnchorProvider.env();
  const wallet = provider.wallet;

  it("Add Public Counter", async () => {
    const [publicCounterPda, _] = await PublicKey.findProgramAddress(
      [Buffer.from("public_counter")],
      program.programId
    );

    const tx = await program.methods
      .addPublic()
      .accounts({
        // Note: If a red mark appears, that's because Anchor has a feature to automatically fills the account and you don't need to specify the account anymore.
        // Your code will still work even without `personalCounter` added here:
        publicCounter: publicCounterPda,
      })
      .rpc();
    console.log("Transaction Signature:", tx);

    const publicCounterAccount = await program.account.publicCounter.fetch(publicCounterPda);
    console.log("Public Counter Value:", publicCounterAccount.value.toString());
  });

  it("Add Personal Counter", async () => {
    const [personalCounterPda, _] = await PublicKey.findProgramAddress(
      [Buffer.from("personal_counter"), wallet.publicKey.toBuffer()],
      program.programId
    );

    const tx = await program.methods
      .addPersonal()
      .accounts({
        // Note: If a red mark appears, that's because Anchor has a feature to automatically fills the account and you don't need to specify the account anymore.
        // Your code will still work even without `personalCounter` added here:
        personalCounter: personalCounterPda,
      })
      .rpc();
    console.log("Transaction Signature:", tx);

    const personalCounterAccount = await program.account.personalCounter.fetch(personalCounterPda);
    console.log("Personal Counter Value:", personalCounterAccount.value.toString());
  });


  // Same with the previous test, but this time we don't specify the `personalCounter` account (it will automatically be filled by Anchor)
  it("Account Autofill Example", async () => {
    const [personalCounterPda, _] = await PublicKey.findProgramAddress(
      [Buffer.from("personal_counter"), wallet.publicKey.toBuffer()],
      program.programId
    );

    const tx = await program.methods
      .addPersonal()
      .accounts({
        // An example where your code still works because Anchor automatically fills the account without specificying `personalCounter`
      })
      .rpc();
    console.log("Transaction Signature:", tx);

    const personalCounterAccount = await program.account.personalCounter.fetch(personalCounterPda);
    console.log("Personal Counter Value:", personalCounterAccount.value.toString());
  });
});
