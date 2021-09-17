// Using the built in crypto module
const { scryptSync, randomBytes } = require("crypto");
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);

console.log("Encrypted with BCRYPT")
console.table({ "salt": salt, "hash": hash})

var simplecrypt = require("simplecrypt");
console.log("Encrypted with simplecrypt")
var sc = simplecrypt();
var digest = sc.encrypt("my secret");
console.table({ "text" : "my secret", "digest": digest })

console.log("Encrypted with InBUILD Crypto")
var text = randomBytes(16)
var salt = text.toString("hex")
console.table({ "text" : text, "salt": salt })


```
OUTPUT :-
Encrypted with BCRYPT
┌─────────┬────────────────────────────────────────────────────────────────┐
│ (index) │                             Values                             │
├─────────┼────────────────────────────────────────────────────────────────┤
│  salt   │                '$2a$10$nVvRZSbHY4yG5oe8TEU3W.'                 │
│  hash   │ '$2a$10$nVvRZSbHY4yG5oe8TEU3W.g4j7kSM6UlHxlfQltnWcnYd87uf4YcO' │
└─────────┴────────────────────────────────────────────────────────────────┘
Encrypted with simplecrypt
┌─────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ (index) │                                                                               Values                                                                               │
├─────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  text   │                                                                            'my secret'                                                                             │
│ digest  │ '635e9c54b6694097bce3722dda3908701e39c9575f38890613f2b07c461e64e48c8a5a6fbcd6ad531e04d2a527afcf103beafdc9d3bd97a786ae2f06af17711733ff7a02571d1acc047a3c4f80caba2c' │
└─────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
Encrypted with InBUILD Crypto
┌─────────┬─────┬────┬────┬─────┬─────┬───┬─────┬────┬─────┬────┬─────┬─────┬────┬─────┬────┬─────┬────────────────────────────────────┐
│ (index) │  0  │ 1  │ 2  │  3  │  4  │ 5 │  6  │ 7  │  8  │ 9  │ 10  │ 11  │ 12 │ 13  │ 14 │ 15  │               Values               │
├─────────┼─────┼────┼────┼─────┼─────┼───┼─────┼────┼─────┼────┼─────┼─────┼────┼─────┼────┼─────┼────────────────────────────────────┤
│  text   │ 150 │ 30 │ 58 │ 195 │ 160 │ 0 │ 238 │ 32 │ 170 │ 10 │ 176 │ 205 │ 27 │ 101 │ 22 │ 183 │                                    │
│  salt   │     │    │    │     │     │   │     │    │     │    │     │     │    │     │    │     │ '961e3ac3a000ee20aa0ab0cd1b6516b7' │
└─────────┴─────┴────┴────┴─────┴─────┴───┴─────┴────┴─────┴────┴─────┴─────┴────┴─────┴────┴─────┴────────────────────────────────────┘
```