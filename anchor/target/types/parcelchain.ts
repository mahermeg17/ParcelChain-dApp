/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/parcelchain.json`.
 */
export type Parcelchain = {
  "address": "C7X3fAU4PQZc3Hg9mDgBp5MRmi2pwpuHAQfRJ61ELniS",
  "metadata": {
    "name": "parcelchain",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "docs": [
    "ParcelChain program module containing all instructions"
  ],
  "instructions": [
    {
      "name": "acceptDelivery",
      "docs": [
        "Accepts a package delivery request by a carrier",
        "",
        "# Arguments",
        "* `ctx` - Context containing the package and carrier accounts",
        "",
        "# Errors",
        "Returns an error if:",
        "- Package status is not Registered",
        "- Carrier reputation is insufficient"
      ],
      "discriminator": [
        153,
        42,
        84,
        137,
        56,
        87,
        13,
        64
      ],
      "accounts": [
        {
          "name": "package",
          "writable": true
        },
        {
          "name": "carrier",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  97,
                  114,
                  114,
                  105,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "carrier.authority",
                "account": "carrier"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "completeDelivery",
      "docs": [
        "Completes a package delivery and distributes payment",
        "",
        "# Arguments",
        "* `ctx` - Context containing the package, carrier, platform, and escrow accounts",
        "",
        "# Errors",
        "Returns an error if:",
        "- Package status is not InTransit",
        "- Carrier is not authorized",
        "- Payment transfer fails"
      ],
      "discriminator": [
        137,
        39,
        117,
        110,
        67,
        245,
        64,
        146
      ],
      "accounts": [
        {
          "name": "package",
          "writable": true
        },
        {
          "name": "carrier",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  97,
                  114,
                  114,
                  105,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "carrier.authority",
                "account": "carrier"
              }
            ]
          }
        },
        {
          "name": "platform",
          "writable": true
        },
        {
          "name": "escrow",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createCarrier",
      "docs": [
        "Creates a new carrier account with the specified initial reputation",
        "",
        "# Arguments",
        "* `ctx` - Context containing the carrier and authority accounts",
        "* `initial_reputation` - Initial reputation score for the carrier (0-255)",
        "",
        "# Errors",
        "Returns an error if the carrier account cannot be initialized"
      ],
      "discriminator": [
        55,
        191,
        197,
        197,
        9,
        47,
        133,
        192
      ],
      "accounts": [
        {
          "name": "carrier",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  97,
                  114,
                  114,
                  105,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "initialReputation",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initialize",
      "docs": [
        "Initializes the platform with the given authority and fee rate",
        "",
        "# Arguments",
        "* `ctx` - Context containing the platform and authority accounts",
        "",
        "# Errors",
        "Returns an error if the platform account cannot be initialized"
      ],
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "platform",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  108,
                  97,
                  116,
                  102,
                  111,
                  114,
                  109
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "registerPackage",
      "docs": [
        "Registers a new package for delivery",
        "",
        "# Arguments",
        "* `ctx` - Context containing the package, sender, and platform accounts",
        "* `description` - Description of the package contents",
        "* `weight` - Weight of the package in grams",
        "* `dimensions` - Package dimensions [length, width, height] in centimeters",
        "* `price` - Delivery price in lamports",
        "",
        "# Errors",
        "Returns an error if the package account cannot be initialized"
      ],
      "discriminator": [
        94,
        135,
        164,
        218,
        103,
        151,
        22,
        189
      ],
      "accounts": [
        {
          "name": "package",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  99,
                  107,
                  97,
                  103,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "platform"
              }
            ]
          }
        },
        {
          "name": "sender",
          "writable": true,
          "signer": true
        },
        {
          "name": "platform",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "weight",
          "type": "u32"
        },
        {
          "name": "dimensions",
          "type": {
            "array": [
              "u32",
              3
            ]
          }
        },
        {
          "name": "price",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "carrier",
      "discriminator": [
        72,
        94,
        40,
        25,
        61,
        150,
        81,
        118
      ]
    },
    {
      "name": "package",
      "discriminator": [
        203,
        12,
        246,
        255,
        184,
        43,
        206,
        39
      ]
    },
    {
      "name": "platform",
      "discriminator": [
        77,
        92,
        204,
        58,
        187,
        98,
        91,
        12
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidPackageStatus",
      "msg": "Invalid package status"
    },
    {
      "code": 6001,
      "name": "insufficientReputation",
      "msg": "Insufficient reputation"
    },
    {
      "code": 6002,
      "name": "unauthorized",
      "msg": "unauthorized"
    }
  ],
  "types": [
    {
      "name": "carrier",
      "docs": [
        "Carrier account that stores information about a delivery carrier"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "Public key of the carrier's authority"
            ],
            "type": "pubkey"
          },
          {
            "name": "reputation",
            "docs": [
              "Carrier's reputation score (0-255)"
            ],
            "type": "u8"
          },
          {
            "name": "completedDeliveries",
            "docs": [
              "Number of successfully completed deliveries"
            ],
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "package",
      "docs": [
        "Package account that stores information about a specific delivery"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "docs": [
              "Unique identifier for the package"
            ],
            "type": "u64"
          },
          {
            "name": "sender",
            "docs": [
              "Public key of the package sender"
            ],
            "type": "pubkey"
          },
          {
            "name": "carrier",
            "docs": [
              "Public key of the assigned carrier"
            ],
            "type": "pubkey"
          },
          {
            "name": "description",
            "docs": [
              "Description of the package contents"
            ],
            "type": "string"
          },
          {
            "name": "weight",
            "docs": [
              "Weight of the package in grams"
            ],
            "type": "u32"
          },
          {
            "name": "dimensions",
            "docs": [
              "Package dimensions [length, width, height] in centimeters"
            ],
            "type": {
              "array": [
                "u32",
                3
              ]
            }
          },
          {
            "name": "price",
            "docs": [
              "Delivery price in lamports"
            ],
            "type": "u64"
          },
          {
            "name": "status",
            "docs": [
              "Current status of the package delivery"
            ],
            "type": {
              "defined": {
                "name": "packageStatus"
              }
            }
          },
          {
            "name": "createdAt",
            "docs": [
              "Unix timestamp when the package was registered"
            ],
            "type": "i64"
          },
          {
            "name": "acceptedAt",
            "docs": [
              "Unix timestamp when the carrier accepted the delivery"
            ],
            "type": "i64"
          },
          {
            "name": "deliveredAt",
            "docs": [
              "Unix timestamp when the package was delivered"
            ],
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "packageStatus",
      "docs": [
        "Enum representing the possible states of a package delivery"
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "registered"
          },
          {
            "name": "inTransit"
          },
          {
            "name": "delivered"
          }
        ]
      }
    },
    {
      "name": "platform",
      "docs": [
        "Platform account that stores global platform state"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "Public key of the platform owner/authority"
            ],
            "type": "pubkey"
          },
          {
            "name": "feeRate",
            "docs": [
              "Platform fee rate in basis points (e.g., 200 = 2%)"
            ],
            "type": "u16"
          },
          {
            "name": "totalPackages",
            "docs": [
              "Total number of packages registered on the platform"
            ],
            "type": "u64"
          }
        ]
      }
    }
  ]
};
