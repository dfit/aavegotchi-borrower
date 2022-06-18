## Aavegotchi automatizer

It is for me a good exercise to get more familiar with web3 dev environment and mechanics.

Any comment, remark or suggestions would be highly appreciated.

## Main actions

The purpose of the bot is to borrow a certain number of gotchis with some parameters wanted.

You can set parameters for : 
- the lending duration
- the ghst upfront cost
- the borrower share for you
- if the gotchi to borrow should have channel ready
- minimum kinship needed 
- number of gotchis you want to borrow

It will automatically borrow the gotchi that is below your ghst limit and have the more % of share for you.

It will then iterate until all borrow are fulfill from your parameters.

## How it works ##

A configuration file take all the informations needed and use them across the routine to perform the borrow sequence

Routine is run based on a 7 sec period.

## Prerequisites

* [Alchemy](https://dashboard.alchemyapi.io/) account (free for this usage)
* (pm2 if wanted)


## IMPORTANT ##
Please don't hesitate to ask if you're not sure about a specific part of the code before starting it.

## Steps to install

### 1. Clone the repo

```bash 
https://github.com/dfit/aavegotchi-borrower.git
```

### 2. Install npm package

```bash 
npm install
```

### 3. Env vars

```bash 
export PRIVATE_KEY=<enter-your-private-key> 
//private key (until I find something better ...)
```

### 4. How to run the bot
```bash
node main https://polygon-mainnet.g.alchemy.com/v2/<replace-with-your-cred>
```

### 5. How to run the bot (alternative)

Alternatively you can use the [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/) command to run your bot on background and managing it a little bit better.

You can add the `--no-autorestart` to `pm2` command in order to only execute the bot once.

```bash
pm2 start main.js --no-autorestart -- https://polygon-mainnet.g.alchemy.com/v2/<replace-with-your-cred> 
```

### 6. Example

`node main https://polygon-mainnet.g.alchemy.com/v2/<replace-with-your-cred>`
```bash
[2022-06-18 18:23:16.921] [LOG]   Public address : 0xa9589438851A7eFBa37bC45ebE2be558c4bA3055
[2022-06-18 18:23:44.613] [LOG]   Trying to borrow 963109.
[2022-06-18 18:23:49.347] [LOG]   txHash: "...txHash..."
[2022-06-18 18:23:53.650] [LOG]   receipt: {...transaction object...}
[2022-06-18 18:23:53.655] [LOG]   Borrow of listing id : 963109 started.
[2022-06-18 18:23:54.197] [LOG]   My work is done good-bye.

```
