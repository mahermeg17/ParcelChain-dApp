# ParcelChain Solana Program

This is the Solana program for the ParcelChain decentralized delivery platform, built using the Anchor framework.

## Project Structure

```
anchor/
├── programs/              # Solana program source code
│   └── parcelchain/      # Main program
│       └── src/
│           └── lib.rs    # Program logic
├── tests/                # Integration tests
│   └── parcelchain.spec.ts
├── migrations/           # Database migrations
├── app/                  # Frontend application
├── target/              # Build artifacts
│   ├── idl/            # Interface Definition Language
│   └── types/          # TypeScript types
└── Anchor.toml          # Anchor configuration
```

## Prerequisites

- Node.js (v16 or later)
- Rust (latest stable)
- Solana CLI tools
- Anchor CLI

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the program:
```bash
anchor build
```

3. Run tests:
```bash
anchor test
```

## Program Overview

The ParcelChain program implements a decentralized delivery platform with the following features:

### Accounts

- **Platform**: Global platform configuration
  - `authority`: Public key of the platform owner/authority
  - `fee_rate`: Platform fee rate in basis points (e.g., 200 = 2%)
  - `total_packages`: Total number of packages registered on the platform

- **Carrier**: Delivery service provider
  - `authority`: Public key of the carrier's authority
  - `reputation`: Carrier's reputation score (0-255)
  - `completed_deliveries`: Number of successfully completed deliveries

- **Package**: Delivery package
  - `id`: Unique identifier for the package
  - `sender`: Public key of the package sender
  - `carrier`: Public key of the assigned carrier
  - `description`: Description of the package contents
  - `weight`: Weight of the package in grams
  - `dimensions`: Package dimensions [length, width, height] in centimeters
  - `price`: Delivery price in lamports
  - `status`: Current status (Registered, InTransit, Delivered)
  - `created_at`: Unix timestamp when the package was registered
  - `accepted_at`: Unix timestamp when the carrier accepted the delivery
  - `delivered_at`: Unix timestamp when the package was delivered

### Instructions

1. **Initialize Platform**
   - Sets up the platform with initial fee rate (2%)
   - Can only be called once
   - Requires authority signature

2. **Create Carrier**
   - Creates a new carrier account with initial reputation
   - Requires authority signature
   - Carrier account is a PDA derived from authority public key

3. **Register Package**
   - Creates a new delivery package
   - Validates package dimensions and price
   - Sets initial status to Registered
   - Package account is a PDA derived from platform key and package ID

4. **Accept Delivery**
   - Carrier accepts a package for delivery
   - Requires package status to be Registered
   - Requires carrier reputation >= 50
   - Updates package status to InTransit

5. **Complete Delivery**
   - Marks package as delivered
   - Distributes payment between carrier and platform
   - Updates carrier's completed deliveries and reputation
   - Requires package status to be InTransit
   - Requires proper escrow account with sufficient balance

### Error Codes

- `InvalidPackageStatus`: Package status is invalid for the requested operation
- `InsufficientReputation`: Carrier's reputation is insufficient for the operation
- `Unauthorized`: Operation attempted by unauthorized account
- `InvalidDimensions`: Package dimensions are invalid (zero or negative)
- `InvalidPrice`: Package price is invalid (zero or negative)
- `InsufficientEscrowBalance`: Escrow account has insufficient balance
- `InvalidEscrowAccount`: Escrow account is invalid

## Testing

The test suite in `tests/parcelchain.spec.ts` verifies:

1. Platform initialization
   - Successful initialization
   - Prevention of double initialization

2. Carrier creation
   - Successful carrier creation
   - Invalid authority handling
   - Reputation validation

3. Package registration
   - Successful package registration
   - Invalid dimensions handling
   - Invalid price handling
   - Invalid sender handling

4. Delivery acceptance
   - Successful delivery acceptance
   - Invalid package status handling
   - Insufficient reputation handling

5. Delivery completion
   - Successful delivery completion
   - Payment distribution
   - Carrier reputation update

Run tests with:
```bash
anchor test
```

## Development

1. Make changes to the program in `programs/parcelchain/src/lib.rs`
2. Build the program:
```bash
anchor build
```
3. Run tests to verify changes:
```bash
anchor test
```

## Deployment

1. Build the program:
```bash
anchor build
```

2. Deploy to desired cluster:
```bash
anchor deploy
```

## License

This project is licensed under the MIT License - see the LICENSE file for details. 