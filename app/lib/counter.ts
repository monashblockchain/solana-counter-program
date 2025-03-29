/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/counter.json`.
 */
export type Counter = {
    "address": "Hx8vRhUw1Rg7nSRp7dEkpXTpwpuKFJCdHcEqinsgRKjy",
    "metadata": {
      "name": "counter",
      "version": "0.1.0",
      "spec": "0.1.0",
      "description": "Created with Anchor"
    },
    "instructions": [
      {
        "name": "addPersonal",
        "discriminator": [
          127,
          15,
          218,
          151,
          16,
          182,
          29,
          251
        ],
        "accounts": [
          {
            "name": "personalCounter",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    112,
                    101,
                    114,
                    115,
                    111,
                    110,
                    97,
                    108,
                    95,
                    99,
                    111,
                    117,
                    110,
                    116,
                    101,
                    114
                  ]
                },
                {
                  "kind": "account",
                  "path": "user"
                }
              ]
            }
          },
          {
            "name": "user",
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
        "name": "addPublic",
        "discriminator": [
          181,
          20,
          225,
          246,
          103,
          44,
          212,
          246
        ],
        "accounts": [
          {
            "name": "publicCounter",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    112,
                    117,
                    98,
                    108,
                    105,
                    99,
                    95,
                    99,
                    111,
                    117,
                    110,
                    116,
                    101,
                    114
                  ]
                }
              ]
            }
          },
          {
            "name": "user",
            "writable": true,
            "signer": true
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": []
      }
    ],
    "accounts": [
      {
        "name": "personalCounter",
        "discriminator": [
          230,
          62,
          85,
          95,
          21,
          117,
          6,
          231
        ]
      },
      {
        "name": "publicCounter",
        "discriminator": [
          24,
          39,
          141,
          94,
          252,
          238,
          50,
          150
        ]
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "invalidOwner",
        "msg": "Invalid owner"
      },
      {
        "code": 6001,
        "name": "myErrorMessage",
        "msg": "My Error Message"
      }
    ],
    "types": [
      {
        "name": "personalCounter",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "owner",
              "type": "pubkey"
            },
            {
              "name": "value",
              "type": "u64"
            }
          ]
        }
      },
      {
        "name": "publicCounter",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "value",
              "type": "u64"
            }
          ]
        }
      }
    ]
  };
  