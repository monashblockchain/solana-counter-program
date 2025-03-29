// @ts-ignore
import IDL from "@/lib/idl.json";
import {Counter} from "@/lib/counter";
import * as anchor from "@coral-xyz/anchor";
import { useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import {PublicKey, Connection, Keypair} from "@solana/web3.js";
import { RPC_LINK } from "@/lib/connection";

import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

// Solana Connection
const connection = new Connection(RPC_LINK);
const programId = new PublicKey(IDL.address);

// Public Counter Address
const [publicCounterPda, ] = PublicKey.findProgramAddressSync(
    [Buffer.from("public_counter")],
    programId
);


export default function CounterProgram(){
    const {publicKey, connected, signTransaction} = useWallet();
    const wallet = useAnchorWallet();

    // Frontend State to Display
    const [publicCounterValue, setPublicCounterValue] = useState<string| null>(null);
    const [personalCounterValue, setPersonalCounterValue] = useState<string | null>(null);


    useEffect(() => {
        fetchPublicCounter();
        fetchPersonalCounter();
    }, [publicKey]);


    const fetchPublicCounter = async () => {
        const dummyWallet = {
            publicKey: publicKey || Keypair.generate().publicKey,
            signTransaction: async (transaction: any) => {}
        } as any;
        try{
            const provider = new anchor.AnchorProvider(connection, dummyWallet, anchor.AnchorProvider.defaultOptions())
            const program = new anchor.Program(IDL as Counter, provider);
            const publicCounter = await program.account.publicCounter.fetch(publicCounterPda);
            console.log("Public Counter: ", publicCounter.value.toString());
            setPublicCounterValue(publicCounter.value.toNumber());
        }catch(e){
            console.log("Error fetching public counter: ", e);
        }
    }

    const fetchPersonalCounter = async () => {
        if(!wallet){
            console.log("Wallet not connected");
            return;
        }
        const [personalCounterPda, ] = PublicKey.findProgramAddressSync(
            [Buffer.from("personal_counter"), wallet.publicKey.toBuffer()],
            programId
        );
        try{
            const provider = new anchor.AnchorProvider(connection, wallet, anchor.AnchorProvider.defaultOptions())
            const program = new anchor.Program(IDL as Counter, provider);
            const personalCounter =await program.account.personalCounter.fetch(personalCounterPda);
            console.log("Personal Counter: ", personalCounter.value.toString());
            setPersonalCounterValue(personalCounter.value.toNumber());
        }catch(e){
            console.log("Error fetching personal counter: ", e);
        }
    }

    const addPublic = async ()=>{
        if(!publicKey || !connected|| !wallet){
            console.log("Wallet not connected");
            return;
        }

        const provider = new anchor.AnchorProvider(connection, wallet, anchor.AnchorProvider.defaultOptions())
        const program = new anchor.Program(IDL as Counter, provider);
        const tx = await program.methods.addPublic()
            .accounts({})
            .rpc({
                skipPreflight:false
            });
        console.log("Transaction: ", tx);

        // Show success toast with explorer link
        toast.success("Program Call Successful", {
            description: (
            <a
                href={`https://explorer.solana.com/tx/${tx}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 underline flex items-center font-semibold"
            >
                View on Explorer <ArrowRight className="ml-1 h-3 w-3" />
            </a>
            ),
        });

        // Wait until the transaction gets finalized
        const latestBlockhash = await connection.getLatestBlockhash();
        await connection.confirmTransaction(
            {
                signature: tx,
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            },
            "finalized"
        );
        fetchPublicCounter();
    }

    const addPersonal = async ()=>{
        if(!publicKey || !connected|| !wallet){
            console.log("Wallet not connected");
            return;
        }
        const provider = new anchor.AnchorProvider(connection, wallet, anchor.AnchorProvider.defaultOptions())
        const program = new anchor.Program(IDL as Counter, provider);
        const tx = await program.methods.addPersonal()
            .accounts({})
            .rpc({
                skipPreflight:false
            });
        console.log("Transaction: ", tx);

        // Show success toast with explorer link
        toast.success("Program Call Successful", {
            description: (
            <a
                href={`https://explorer.solana.com/tx/${tx}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 underline flex items-center"
            >
                View on Explorer <ArrowRight className="ml-1 h-3 w-3" />
            </a>
            ),
        });

        // Wait until the transaction gets finalized
        const latestBlockhash = await connection.getLatestBlockhash();
        await connection.confirmTransaction(
            {
                signature: tx,
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            },
            "finalized"
        );
        fetchPersonalCounter();
    }

    return(
        <div className="text-center mt-8">
            <div className="flex flex-col items-center justify-center mb-8">
            <div className="mb-6">
                <p className="text-lg font-semibold text-gray-300">Program Address:</p>
                <p className="text-sm font-mono text-gray-400">{programId.toString()}</p>
                <div className="mt-4 mb-4">
                    <a
                        href={`https://explorer.solana.com/address/${programId.toString()}?cluster=devnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                    >
                        View Program on Explorer
                    </a>
                </div>
            </div>
                
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6">
                    <Card className="px-6 py-4 bg-gray-700 text-white rounded-lg shadow-lg max-w-sm text-center">
                        <div className="mt-4">
                            <p className="text-lg font-semibold">Public Counter:</p>
                            <p className="text-2xl font-bold">{publicCounterValue !== null ? publicCounterValue : "Loading..."}</p>
                        </div>
                    </Card>
                    <Card className="px-6 py-4 bg-gray-700 text-white rounded-lg shadow-lg max-w-sm text-center">
                        <div className="mt-4">
                            <p className="text-lg font-semibold">Personal Counter:</p>
                            <p className="text-2xl font-bold">{personalCounterValue !== null ? personalCounterValue : "Loading..."}</p>
                        </div>
                    </Card>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <Button onClick={addPublic} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Add Public Counter
                    </Button>
                    <Button onClick={addPersonal} className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                        Add Personal Counter
                    </Button>
                </div>
            </div>
        </div>
    )
}