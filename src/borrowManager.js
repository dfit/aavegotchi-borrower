const axios = require('axios');
const configuration = require('../configuration');
const walletUtil = require('./walletUtil');

module.exports = {
  async getAvailableGotchis() {
    const query = `query MyQuery {
      gotchiLendings(
        first: 1000
        where: {period_gte: "${configuration.borrowParameters.time * 60 * 60}", cancelled: false, gotchiKinship_gte: "${configuration.borrowParameters.kinship}", timeAgreed: "0", tokensToShare: ["0x403e967b044d4be25170310157cb1a4bf10bdd0f", "0x44a6e0be76e1d9620a7f76588e4509fe4fa8e8c8", "0x6a3e7c3c6ef65ee26975b12293ca1aad7e1daed2", "0x42e5e06ef5b90fe15f853f59299fc96259209c5c"], whitelistId: null, splitBorrower_gte: "${configuration.borrowParameters.borrower}", upfrontCost_lte: "${configuration.web3.utils.toWei(configuration.borrowParameters.ghstUpfrontCost,"Ether")}"}
        orderBy: upfrontCost
        orderDirection: asc
      ) {
        id
        upfrontCost
        period
        tokensToShare
        gotchi {
          name
          id
        }
        gotchiKinship
        timeCreated
        lender
        originalOwner
        splitBorrower
        splitOther
        splitOwner
        gotchiTokenId
        whitelistId
      }
    }`

    const listings = (await axios.post("https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic", { query: query })).data.data.gotchiLendings.sort((a,b) => b.splitBorrower - a.splitBorrower)
    if(configuration.borrowParameters.shouldHaveChannel) {
      const gotchisWithChannelReady = await this.returnGotchisWithChannelAvailable(listings.map(listing => listing.gotchi.id))
      return listings.filter(listing => gotchisWithChannelReady.indexOf(listing.gotchi.id) !== -1)
    }
    return listings
  },
  async returnGotchisWithChannelAvailable(gotchis) {
    const query = `{gotchis ( first: 1000 where: { id_in: [${gotchis.map(id => '"'+id+'"')}]}) {id lastChanneledAlchemica}}`
    const gotchisInfos = await axios.post("https://api.thegraph.com/subgraphs/name/froid1911/aavegotchi-gotchiverse", { query: query })
    const elibleGotchis = []
    const now = new Date().getTime()
    for(const gotchi of gotchisInfos.data.data.gotchis) {
      const lastChannelingDate = new Date(gotchi.lastChanneledAlchemica * 1000)
      let nextChannelingDate = new Date(lastChannelingDate.getTime())
      nextChannelingDate.setDate(nextChannelingDate.getDate() + 1)
      nextChannelingDate.setUTCHours(0)
      nextChannelingDate.setUTCMinutes(0)
      nextChannelingDate.setUTCSeconds(0)
      const timeUntillNextChannel = (nextChannelingDate - now) / 36e5;
      if(timeUntillNextChannel < 0) elibleGotchis.push(gotchi.id)
    }
    return elibleGotchis
  },
  borrowCallback(listingId) {
    console.log(`Borrow of listing id : ${listingId} started.`)
    configuration.borrowParameters.nbGotchiWanted = configuration.borrowParameters.nbGotchiWanted - 1
  },
  async borrowGotchi(listing) {
    if(configuration.borrowParameters.nbGotchiWanted !== 0) {
      console.log(`Trying to borrow ${listing.id}.`)
      const transaction = configuration.aavegotchiContract.methods.agreeGotchiLending(listing.id, listing.gotchi.id,
        listing.upfrontCost, listing.period, [listing.splitOwner, listing.splitBorrower, listing.splitOther])
      await walletUtil.sendWithPrivateKey(transaction, this.borrowCallback, listing.id );
    }
  }
}


