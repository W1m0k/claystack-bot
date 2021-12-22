# Claystack Victoria Bot

**Features**

- Stake both Grt and Matic
- Unstake both Grt and Matic
- Get Grt and Matic from the faucet
- Claim Grt and Matic when available

## Setup

1. Clean this repo
2. Run `mkdir -p credentials`
3. Create `credential/finish.json` file and put your array of private keys there. The example file is below.

```
finish.json
[
  "0xprivatekey1",
  "0xprivatekey2"
]
```

## Run

First, make sure you terminate all claystack-bot running container.
To do this, run `make docker-service-down`.

### Stake 2 GRT and Matic, then unstake 1 GRT and Matic

Run `REPLICA=1 make docker-stake-service`

Note:

- Replica is number of concurrency. For example, `REPLICA=10` meant sending transaction from 10 wallets concurrently.
- Number of replica should not be more than number of private keys in `finish.json` file to avoid conflict.

### Request GRT and Matic from the faucet

Run `REPLICA=1 make docker-faucet-service`

### Claim GRT and Matic

Run `REPLICA=1 make docker-claim-service`

### View log

Run `make docker-service-log`
