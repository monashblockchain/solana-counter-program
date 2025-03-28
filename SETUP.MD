# Set Up Instructions

## Overview

This documentations consist of tutorials on how to:
1. Deploy & Test your Solana Program 
2. Call your Solana Program from the Frontend Appplication

If you're looking to deploy this Solana Program on your own, you can follow the **Step 1 Instruction**. Otherwise, if you're only looking to test the Solana Program, you can follow the **Step 2 Instruction** to interact with the deployed code on Solana.

## 1. Deploying Solana Program

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- [Anchor](https://book.anchor-lang.com/getting_started/installation.html)
- Node.js & npm (for frontend or JS scripts)

### 1.1 Clone the repo
```bash
git clone https://github.com/monashblockchain/solana-counter-program.git
cd solana-counter-program
```

### 1.2 Initialize a new 

Then, initialize a new keypair for your Smart Contract. This will generate a Private Key and Public Key for the deployed Solana Program.

```bash
solana-keygen new --outfile target/deploy/counter-keypair.json
solana address -k target/deploy/counter-keypair.json
```

The terminal will print a pubkey which is **your new program ID**, e.g. `DBqLwSMD2kZ2AxL6XQw3wJpBaKAube9sejmq19XxcW7d`

### 1.3 Update Anchor.toml to new address

Remove the old program ID `Hx8vRhUw1Rg7nSRp7dEkpXTpwpuKFJCdHcEqinsgRKjy`. Then, add your new program ID generated in the previous step into `Anchor.toml`.

```
[programs.localnet]
<program_name> = "YourNewProgramID"

[programs.devnet]
<program_name> = "YourNewProgramID"
```

### 1.4 Update lib.rs to new address

Also remove the old program ID at `lib.rs`, then add your new program ID 

```rust
// Change the program ID to the newly generated one
declare_id!("YourNewProgramID");
```

### 1.5 Build the Project
```bash
anchor build
```

### 1.6 Test Project Locally

This code will run a solana simulator and test out the smart contract by running the testcase at `tests/counter.ts`.

```bash
anchor test
```

### 1.7 Deploy to Solana Devnet

```bash
solana config set --url devnet
anchor deploy
```

### 1.8 Test Project on Solana Devnet

Once the code is deployed, you can modify `Anchor.toml` to test the program on devnet instead of on local device.

```
[provider]
cluster = "devnet"
```

## 2. Call Program from Frontend

Prerequisites:
- Node.js & npm (for frontend or JS scripts)

### 2.1 Clone the Repo (if not done in step1 yet)
```bash
git clone https://github.com/monashblockchain/solana-counter-program.git
cd solana-counter-program
```

Then open the `app` folder
```bash
cd app
```

### 2.2 Install the Packages
```bash
npm install
```


