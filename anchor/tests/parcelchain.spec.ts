import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Parcelchain } from '../target/types/parcelchain'
import { expect } from 'chai'
import { BN } from 'bn.js'
import 'mocha'

describe('parcelchain', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const program = anchor.workspace.Parcelchain as Program<Parcelchain>

  it('Is initialized!', async () => {
    // Get the PDA for the platform account
    const [platformPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("platform")],
      program.programId
    )

    try {
      // Try to fetch the platform account to see if it exists
      const existingAccount = await program.account.platform.fetch(platformPDA)
      console.log('Platform account already exists')
      expect(existingAccount.authority.toString()).to.equal(provider.wallet.publicKey.toString())
      expect(existingAccount.feeRate).to.equal(200)
      expect(existingAccount.totalPackages instanceof BN).to.be.true
      expect(existingAccount.totalPackages.eq(new BN(0))).to.be.true
    } catch (error) {
      // If account doesn't exist, initialize it
      console.log('Initializing platform account')
      const tx = await program.methods
        .initialize()
        .accounts({
          platform: platformPDA,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        } as any)
        .rpc()

      console.log('Your transaction signature', tx)

      // Fetch the platform account
      const platformAccount = await program.account.platform.fetch(platformPDA)
      expect(platformAccount.authority.toString()).to.equal(provider.wallet.publicKey.toString())
      expect(platformAccount.feeRate).to.equal(200)
      expect(platformAccount.totalPackages instanceof BN).to.be.true
      expect(platformAccount.totalPackages.eq(new BN(0))).to.be.true
    }
  })

  it('Cannot initialize twice', async () => {
    // Get the PDA for the platform account
    const [platformPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("platform")],
      program.programId
    )

    try {
      await program.methods
        .initialize()
        .accounts({
          platform: platformPDA,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        } as any)
        .rpc()
      expect.fail('Should have thrown an error')
    } catch (error) {
      const err = error as Error
      expect(err.toString()).to.include('already in use')
    }
  })

  it('Can connect to the program', () => {
    expect(program.programId.toString()).to.not.be.empty
  })
})
