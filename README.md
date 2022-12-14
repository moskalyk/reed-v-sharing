# Reed
Reed is a crypto-enabled tarot application that combines arcana light with extended decks, progamming our reality by pulling intelligence from a spatially distributed timemachine of computers on the fluence network

#### current repo
```
$ cd reed-v4
$ yarn
$ yarn start
```
Note: requires [NodeSeed](https://github.com/moskalyk/NodeSeed) server running in tandem to test shareability via phone or email

#### remote repo
Note: code is not up to date and is worked-on-off-line

## startup
1. run pocket server (nodejs, fluence): `$ cd pocket && yarn run start:pocket`
2. take peerID from pocket server, and embed in frontend `PEER_ID`
3. run front end (react): `yarn start`

## aqua generation
The typescript defintions from Aqua must be generated in 2 locations to accomodate file paths (we think), with the frontend and the 'backend'.
* frontend: `$ aqua --input aqua --output generated`
* 'backend': `$ aqua --input aqua --output pocket/generated_aqua`

## tests
```
$ cd pocket
$ yarn run test:pocket-db
$ yarn run test:pocket-fluence
```

## aqua definition generation
The architecture currently stands where the `pocket` fluence nodejs peer holds the access point to file system to make writes. This way, off-chain writes can be written and retroactively pulled from if moderator of platform decides to place transactions on chain. This operation would should inform the user that the peer interactions have been broadcasted in a roller.

# api
### fluence
#### register service definitions
* registerMatrix
* registerReviews

#### fluence-js aqua handlers
TODO: reference code from frontend calls

#### matrix
* append(from: PeerId, signature: string, address: string, title: string, deck: []string) -> u64
* look(from: PeerId, title: string) -> [][]string

#### reviews
* post(from: PeerId, session: string, signature: string, address: string, rating: u64) -> string
* getReduced(session: string) -> u64
* getAll(session: string) -> []u64
* isUnique(session: string) -> bool

### PocketDB
#### matrix
* append(key, value) ==> ("#< deck >", [...["<card>,<image>,<description>"]]
* look(key) ==> "#< deck >"
* everything() ==> < Void >

#### reviews
* post(key, value) ==> ("< deck >:< adress >", any) // TODO: how to abstract & restrict the value==alignment
* getReduced(session) ==> "< deck >"
* getAll(session) ==> "< deck >"
* duplicate(key) ==> "< deck >:< address >"

### roller (gorse?)
TBD

TODO
- db tests
- network tests
- timeframe for conversion from fluence verified particles -> onchain roller

#### research (marine service to be worked on)
service SMS:
![](./diagram.png)
