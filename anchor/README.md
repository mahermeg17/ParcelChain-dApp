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
  - `fee_rate`: Platform fee percentage
  - `total_packages`: Total number of packages registered
  - `authority`: Platform authority public key

- **Carrier**: Delivery service provider
  - `name`: Carrier name
  - `rating`: Service rating
  - `active`: Active status
  - `authority`: Carrier authority public key

- **Package**: Delivery package
  - `status`: Current status (Registered, InTransit, Delivered, Cancelled)
  - `weight`: Package weight
  - `price`: Delivery price
  - `pickup_location`: Pickup coordinates
  - `delivery_location`: Delivery coordinates
  - `carrier`: Assigned carrier public key
  - `owner`: Package owner public key

### Instructions

1. **Initialize Platform**
   - Sets up the platform with initial fee rate
   - Can only be called once

2. **Create Carrier**
   - Registers a new delivery service provider
   - Requires platform authority signature

3. **Register Package**
   - Creates a new delivery package
   - Sets initial status to Registered

4. **Accept Delivery**
   - Carrier accepts a package for delivery
   - Updates package status to InTransit

5. **Complete Delivery**
   - Marks package as delivered
   - Distributes payment between carrier and platform
   - Updates carrier rating

## Testing

The test suite in `tests/parcelchain.spec.ts` verifies:

1. Platform initialization
2. Carrier creation
3. Package registration
4. Delivery acceptance
5. Delivery completion

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