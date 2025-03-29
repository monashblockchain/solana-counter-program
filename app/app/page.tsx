"use client";

import dynamic from 'next/dynamic';
import CounterProgram from '@/components/CounterProgram';
import { Toaster } from "@/components/ui/sonner";

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Counter Solana Program
        </h1>
        <p className="mt-4 text-gray-300">
          Test the Solana Counter Program Here
        </p>
        <div className="mt-6">
          <WalletMultiButtonDynamic style={{}} />
        </div>
        <div>
          <CounterProgram />
        </div>
      </div>
      <Toaster />
    </main>
  );
}