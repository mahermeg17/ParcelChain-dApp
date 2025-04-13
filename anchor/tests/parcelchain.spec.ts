import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Parcelchain } from "../target/types/parcelchain";
import { expect } from "chai";
import { PublicKey, SystemProgram, Keypair } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";

describe("parcelchain", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Parcelchain as Program<Parcelchain>;

  const platform_seed = Buffer.from("platform");
  const carrier_seed = Buffer.from("carrier");
  const package_seed = Buffer.from("package");

  let platformPda: PublicKey;
  let carrierPda: PublicKey;
  let packagePda: PublicKey;

  before(async () => {
    [platformPda] = PublicKey.findProgramAddressSync(
      [platform_seed],
      program.programId
    );

    [carrierPda] = PublicKey.findProgramAddressSync(
      [carrier_seed, provider.wallet.publicKey.toBuffer()],
      program.programId
    );

    [packagePda] = PublicKey.findProgramAddressSync(
      [package_seed, platformPda.toBuffer()],
      program.programId
    );
  });
}); 