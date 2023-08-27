import { ethers, utils } from 'ethers';
import { theWellABI } from './theWellABI.jsx';
import { splashTokenABI } from './splashTokenABI.jsx';
//import { oldSplashTokenABI } from './oldSplashTokenABI';//
import { theTapABI } from './theTapABI.jsx';
import { oldTapABI } from './oldTapABI.jsx';
import { buddyABI } from './buddyABI.jsx';
import { splashpadABI } from './splashpadABI.jsx';
import { usdtTokenABI } from './usdtTokenABI.jsx';
import { swapperABI } from './swapperABI.jsx';
import { LPTokenABI } from './LPTokenABI.jsx';
//import { swapABI } from './swapABI';//
import { AggregatorABI } from './AggregatorABI.jsx';
import { Multicall } from 'ethereum-multicall';

//Mainnet
const provider = new ethers.providers.JsonRpcProvider(
 'https://api.avax.network/ext/bc/C/rpc'
);
//Testnet
//const provider = new ethers.providers.JsonRpcProvider(
 //  'https://api.avax-test.network/ext/bc/C/rpc'
//);
const multicall = new Multicall({
  ethersProvider: provider,
  tryAggregate: true,
});
// const provider = new ethers.providers.JsonRpcProvider(
//   'https://api.avax.network/ext/bc/C/rpc'
// );
//const theWellContractAddress = '0xf5ee7f00854a5f11D3A79E5fDF3619bbE1c896E7'; // ****TheWellContract.sol
const splashTokenAddress = '0xE16253892F126D068E711C2fdde6DB56969dBCf6'; // ****CoveToken.sol **0xE16253892F126D068E711C2fdde6DB56969dBCf6**
//const oldSplashTokenAddress = '0x4ec58f9D205F9c919920313932cc71EC68d123C7'; // ********************
//const oldTapContractAddress = '0x16049c3C123b1b78AED0028EFC7C51baf58C4F87'; //****TreasureChest.sol
const theTapContractAddress = '0xd17a5D992567E2Fc2a3FE1c8BC58bF63D24E55E1'; //Cant use this ****0xd17a5D992567E2Fc2a3FE1c8BC58bF63D24E55E1****
const buddyContractAddress = '0x39027379F0e3835f8A3C4E6cf5e96777De0894A6'; // *****ReferralSystem.sol ****0x39027379F0e3835f8A3C4E6cf5e96777De0894A6****
//const waveTokenAddress = '0xbc6f589171d6d66EB44ebCC92dFFb570Db4208da'; // ******************
//const swapContractAddress = '0x109f11A0c6bB570cce16D9D4ccE544fC04BA10Cb'; // ******************
//const USDTTokenAddress = '0xc7198437980c041c805A1EDcbA50c1Ce5db95118'; // *******************
//const SwapperContractAddress = '0x88d2ac1fbf6dbe5b040107f334128f542d88a934'; // ****************
//const LPTokenAddressUSDTe = '0x2C846CF666f2D427ec86ca4BADe204fFD5CbC421'; //USDT.e
const LPTokenAddressAVAX = '0xDEc7c320C22Db915069A0AE582994AC89B52054b'; //AVAX ***0xDEc7c320C22Db915069A0AE582994AC89B52054b
// const LPTokenAddressWaveAVAX = '0xDEB71D0233eCE459966f7667D39dEf902919c3d1'; //AVAX
//const splashpadsContractAddress = '0x44c4eb88293f7bccc7b7e3ebdaf670fa1a93a6da'; //
const aggregatorContractAddress = '0x0a77230d17318075983913bc2145db16c7366156'; // ****0x0a77230d17318075983913bc2145db16c7366156****

// Testnet
// const provider = new ethers.providers.JsonRpcProvider(
//   'https://api.avax-test.network/ext/bc/C/rpc'
// );
// const theWellContractAddress = '0xdE314A2a782F27B6F42479d3fBE824395bC5be38';
// const splashTokenAddress = '0x38a8932De5d1Fb229e3e121CB7140deC0C430E30';
// const oldTapContractAddress = '0x3a9EC25319Ba6CeB8F9CC30026c3Be1904bD09d8';
// const theTapContractAddress = '0x7d50dbaF3d69277684a4b21Ec4541f232BC9bd11';
// const buddyContractAddress = '0xf42C505AEb535FaC8C76b64dB0534CAd095ACE75';
// const USDTTokenAddress = '0x5e666D284815C9C2f00fA7Ac8786abfB806954FC';
// const SwapperContractAddress = '0x44534E4347d751b9a5346952bf4eC3914D504796'; //
// const LPTokenAddress = '0x919D6510Fbf0E792Ccc6fAc26e864D45D1E197Da';
// const splashpadsContractAddress = '0x53a895079d71aE43A3ACAD7725F538b9b8055fEd'; //

// Localhost
// const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
// const theWellContractAddress = '0xf5ee7f00854a5f11D3A79E5fDF3619bbE1c896E7'; //
// const splashTokenAddress = '0xE16253892F126D068E711C2fdde6DB56969dBCf6'; //
// const oldSplashTokenAddress = '0x4ec58f9D205F9c919920313932cc71EC68d123C7'; //
// const oldTapContractAddress = '0x16049c3C123b1b78AED0028EFC7C51baf58C4F87';
// const theTapContractAddress = '0xd17a5D992567E2Fc2a3FE1c8BC58bF63D24E55E1'; //
// const buddyContractAddress = '0x39027379F0e3835f8A3C4E6cf5e96777De0894A6'; //
// const waveTokenAddress = '0xbc6f589171d6d66EB44ebCC92dFFb570Db4208da'; //
// const swapContractAddress = '0x109f11A0c6bB570cce16D9D4ccE544fC04BA10Cb'; //
// const USDTTokenAddress = '0xc7198437980c041c805A1EDcbA50c1Ce5db95118'; //
// const SwapperContractAddress = '0x88d2ac1fbf6dbe5b040107f334128f542d88a934'; //
// const LPTokenAddressUSDTe = '0x2C846CF666f2D427ec86ca4BADe204fFD5CbC421'; //USDT.e
// const LPTokenAddressAVAX = '0xDEc7c320C22Db915069A0AE582994AC89B52054b'; //AVAX
// const LPTokenAddressWaveAVAX = '0xDEB71D0233eCE459966f7667D39dEf902919c3d1'; //AVAX
// const splashpadsContractAddress = '0x44c4eb88293f7bccc7b7e3ebdaf670fa1a93a6da'; //

/*const theWellContract = new ethers.Contract(
  theWellContractAddress,
  theWellABI,
  provider
); */
//const oldTapContract = new ethers.Contract(
  //oldTapContractAddress,
  //oldTapABI,
  //provider
//);
const theTapContract = new ethers.Contract(
  theTapContractAddress,
  theTapABI,
  provider
);
const splashTokenContract = new ethers.Contract(
  splashTokenAddress,
  splashTokenABI,
  provider
);
const buddyContract = new ethers.Contract(
  buddyContractAddress,
  buddyABI,
  provider
);
/*const splashpadsContract = new ethers.Contract(
  splashpadsContractAddress,
  splashpadABI,
  provider
); */
/*const usdtTokenContract = new ethers.Contract(
  USDTTokenAddress,
  usdtTokenABI,
  provider
); */
/*const swapperContract = new ethers.Contract(
  SwapperContractAddress,
  swapperABI,
  provider
); */
const LPTokenContractAVAX = new ethers.Contract(
  LPTokenAddressAVAX,
  LPTokenABI,
  provider
); 
/*const LPTokenContractUSDTe = new ethers.Contract(
  LPTokenAddressUSDTe,
  LPTokenABI,
  provider
); */
/* const LPTokenContractWaveAVAX = new ethers.Contract(
  LPTokenAddressWaveAVAX,
  LPTokenABI,
  provider
); */
const aggregatorContract = new ethers.Contract(
  aggregatorContractAddress,
  AggregatorABI,
  provider
); 

// let theWellIface = new utils.Interface(theWellABI);
// let splashTokenIface = new utils.Interface(splashTokenABI);
// let theTapContractIface = new utils.Interface(theTapABI);
// let buddyContractIface = new utils.Interface(buddyABI);
// let splashpadContractIface = new utils.Interface(splashpadABI);
// let usdtTokenIface = new utils.Interface(usdtTokenABI);
// let swapperIface = new utils.Interface(swapperABI);
// let LPContractIface = new utils.Interface(LPTokenABI);
// let swapContractIface = new utils.Interface(swapABI);

Number.prototype.toFixedDown = function (digits) {
  var re = new RegExp('(\\d+\\.\\d{' + digits + '})(\\d)'),
    m = this.toString().match(re);
  return m ? parseFloat(m[1]) : this.valueOf();
};

const splashTokenMultiCall = {
  reference: 'SplashTokenContract',
  contractAddress: splashTokenContract.address,
  abi: splashTokenABI,
};
const LPTokenContractAVAXMultiCall = {
  reference: 'LPTokenContractAVAX',
  contractAddress: LPTokenContractAVAX.address,
  abi: LPTokenABI,
}; 
  const AggregatorContractMultiCall = {
  reference: 'AggregatorContract',
  contractAddress: aggregatorContract.address,
  abi: AggregatorABI,
}; 
const TheTapContractMultiCall = {
  reference: 'TheTapContract',
  contractAddress: theTapContract.address,
  abi: theTapABI,
};
const SplashTokenContractMultiCall = {
  reference: 'SplashTokenContract',
  contractAddress: splashTokenContract.address,
  abi: splashTokenABI,
};
const BuddyContractMultiCall = {
  reference: 'BuddyContract',
  contractAddress: buddyContract.address,
  abi: buddyABI,
};

/*export const getReservesUSDTe = async () => {
  const { _reserve0, _reserve1 } = await LPTokenContractUSDTe.getReserves();
  const usdteBalance = parseFloat(utils.formatUnits(_reserve0, 6));
  const splashBalance = parseFloat(utils.formatEther(_reserve1));
  return { usdteBalance, splashBalance };
}; */
export const getReservesAVAX = async () => {
  const { _reserve0, _reserve1 } = await LPTokenContractAVAX.getReserves();
  const avaxBalance = parseFloat(utils.formatEther(_reserve0));
  const splashBalance = parseFloat(utils.formatEther(_reserve1));
  return { avaxBalance, splashBalance };
};
/* export const getReservesWaveAVAX = async () => {
  const { _reserve0, _reserve1 } = await LPTokenContractWaveAVAX.getReserves();
  const avaxBalance = parseFloat(utils.formatEther(_reserve0));
  const waveBalance = parseFloat(utils.formatEther(_reserve1));
  return { avaxBalance, waveBalance }; 
}; */
export const getUSDTPriceInUsd = async () => {
  // const usdtpriceinusd = parseFloat(
  //   (
  //     await axios.get(
  //       'https://api.coingecko.com/api/v3/simple/price?ids=tether-avalanche-bridged-usdt-e&vs_currencies=usd'
  //     )
  //   ).data['tether-avalanche-bridged-usdt-e'].usd
  // );
  // return usdtpriceinusd;
  return 1;
};
export const getAVAXPriceInUsd = async () => {
  const decimals = parseFloat(await aggregatorContract.decimals());
  const avaxpriceinusd = parseFloat(
    utils.formatUnits(
      (await aggregatorContract.latestRoundData()).answer,
      decimals
    )
  );
  // const avaxpriceinusd = parseFloat(
  //   (
  //     await axios.get(
  //       'https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd'
  //     )
  //   ).data['avalanche-2'].usd
  // );
  return avaxpriceinusd;
};
export const getSplashTransactionsCount = async (multiCallResults) => {
  console.log(multiCallResults);
  return ethers.BigNumber.from(
    multiCallResults.SplashTokenContract.callsReturnContext.filter(
      (e) => e.methodName === 'totalTxs'
    )[0].returnValues[0]
  );
};
export const getSplashPlayersCount = async (multiCallResults) => {
  return ethers.BigNumber.from(
    multiCallResults.SplashTokenContract.callsReturnContext.filter(
      (e) => e.methodName === 'players'
    )[0].returnValues[0]
  );
};
export const getSplashTotalSupply = async (multiCallResults) => {
  return ethers.BigNumber.from(
    multiCallResults.SplashTokenContract.callsReturnContext.filter(
      (e) => e.methodName === 'totalSupply'
    )[0].returnValues[0]
  );
};
/*export const getClaimsAvailable = async (MultiCallResults) => {
  console.log('All MultiCallResults:', MultiCallResults);
  console.log('TheTapContract Return Context:', MultiCallResults.TheTapContract.callsReturnContext);
  return parseFloat(
    utils.formatEther(
      ethers.BigNumber.from(
        MultiCallResults.TheTapContract.callsReturnContext.filter(
          (e) => e.methodName === 'claimsAvailable'
        )[0].returnValues[0]
      )
    )
  );
}; */

export const getClaimsAvailable = async (MultiCallResults) => {
  // Logging for debug purposes
  console.log('All MultiCallResults:', MultiCallResults);
  console.log('TheTapContract Return Context:', MultiCallResults.TheTapContract.callsReturnContext);
  
  // Filtering the results for 'claimsAvailable'
  const claimsAvailableContext = MultiCallResults.TheTapContract.callsReturnContext.filter(
      (e) => e.methodName === 'claimsAvailable'
  );

  // Check if any relevant data exists
  if (!claimsAvailableContext.length || 
      !claimsAvailableContext[0].decoded || 
      !claimsAvailableContext[0].returnValues || 
      !claimsAvailableContext[0].returnValues.length) {
      return 0;  // Default value if data isn't found or is in unexpected format
  }

  // If everything is alright, proceed to extract and format the value
  const returnValue = claimsAvailableContext[0].returnValues[0];
  return parseFloat(utils.formatEther(ethers.BigNumber.from(returnValue)));
};


/*export const getDepositsOldTap = async (address) => {
  const userInfoTotals = await oldTapContract.userInfoTotals(address);
  const deposits = parseFloat(utils.formatEther(userInfoTotals.total_deposits));
  return { deposits };
}; */
export const getDepositsAvailableAndPlayerTeam = async (MultiCallResults) => {
  const deposits = parseFloat(
    utils.formatEther(
      ethers.BigNumber.from(
        MultiCallResults.TheTapContract.callsReturnContext.filter(
          (e) => e.methodName === 'userInfoTotals'
        )[0].returnValues[1]
      )
    )
  );
  const directPlayers = parseFloat(
    ethers.BigNumber.from(
      MultiCallResults.TheTapContract.callsReturnContext.filter(
        (e) => e.methodName === 'userInfoTotals'
      )[0].returnValues[0]
    )
  );
  const teamSize = parseFloat(
    ethers.BigNumber.from(
      MultiCallResults.TheTapContract.callsReturnContext.filter(
        (e) => e.methodName === 'userInfoTotals'
      )[0].returnValues[3]
    )
  );
  return { deposits, directPlayers, teamSize };
};
export const getClaimed = async (MultiCallResults) => {
  const claimed = parseFloat(
    utils.formatEther(
      ethers.BigNumber.from(
        MultiCallResults.TheTapContract.callsReturnContext.filter(
          (e) => e.methodName === 'users'
        )[0].returnValues[7]
      )
    )
  );
  return claimed;
};
export const getRewarded = async (MultiCallResults) => {
  const directRewarded = parseFloat(
    utils.formatEther(
      ethers.BigNumber.from(
        MultiCallResults.TheTapContract.callsReturnContext.filter(
          (e) => e.methodName === 'users'
        )[0].returnValues[3]
      )
    )
  );
  const indirectRewarded = parseFloat(
    utils.formatEther(
      ethers.BigNumber.from(
        MultiCallResults.TheTapContract.callsReturnContext.filter(
          (e) => e.methodName === 'users'
        )[0].returnValues[4]
      )
    )
  );
  return {
    directRewarded,
    indirectRewarded,
  };
};
/*export const getMaxPayout = async (MultiCallResults) => {
  const maxPayout = parseFloat(
    utils.formatEther(
      ethers.BigNumber.from(
        MultiCallResults.TheTapContract.callsReturnContext.filter(
          (e) => e.methodName === 'payoutOf'
        )[0].returnValues[1]
      )
    )
  );
  return maxPayout;
}; */

export const getMaxPayout = async (MultiCallResults) => {
  // Logging for debug purposes
  console.log('All MultiCallResults:', MultiCallResults);
  console.log('TheTapContract Return Context:', MultiCallResults.TheTapContract.callsReturnContext);
  
  // Filtering the results for 'payoutOf'
  const payoutOfContext = MultiCallResults.TheTapContract.callsReturnContext.filter(
      (e) => e.methodName === 'payoutOf'
  );

  // Check if any relevant data exists
  if (!payoutOfContext.length || 
      !payoutOfContext[0].decoded || 
      !payoutOfContext[0].returnValues || 
      !payoutOfContext[0].returnValues[1]) {
      return 0;  // Default value if data isn't found or is in unexpected format
  }

  // If everything is alright, proceed to extract and format the value
  const returnValue = payoutOfContext[0].returnValues[1];
  return parseFloat(utils.formatEther(ethers.BigNumber.from(returnValue)));
};

/*export const getCurrentPayoutRate = async (MultiCallResults) => {
  const currentPayoutRate = parseFloat(
    ethers.BigNumber.from(
      MultiCallResults.TheTapContract.callsReturnContext.filter(
        (e) => e.methodName === 'getCurrentPayoutRate'
      )[0].returnValues[0]
    )
  ); 
  const lastClaimOrRoll = parseFloat(
    ethers.BigNumber.from(
      MultiCallResults.TheTapContract.callsReturnContext.filter(
        (e) => e.methodName === 'users'
      )[0].returnValues[12]
    )
  );
  return {
    currentPayoutRate,
    lastClaimOrRoll,
  };
}; */
export const getSplashBalance = async (MultiCallResults) => {
  // const balanceOf = parseFloat(
  //   utils.formatEther(await splashTokenContract.balanceOf(address))
  // );
  const balanceOf = parseFloat(
    utils.formatEther(
      ethers.BigNumber.from(
        MultiCallResults.SplashTokenContract.callsReturnContext.filter(
          (e) => e.methodName === 'balanceOf'
        )[0].returnValues[0]
      )
    )
  );
  return balanceOf;
};
export const getSplashAllowanceTheTap = async (MultiCallResults) => {
  const splashAllowance = parseFloat(
    utils.formatEther(
      ethers.BigNumber.from(
        MultiCallResults.SplashTokenContract.callsReturnContext.filter(
          (e) => e.methodName === 'allowance'
        )[0].returnValues[0]
      )
    )
  );
  return splashAllowance;
};
/*export const getSplashAllowanceTheWell = async (address) => {
  const splashAllowance = parseFloat(
    utils.formatEther(
      await splashTokenContract.allowance(address, theWellContractAddress)
    )
  );
  return splashAllowance;
}; */

export const getWaveStarter = async (MultiCallResults) => {
  const waveStarter = MultiCallResults.BuddyContract.callsReturnContext.filter(
    (e) => e.methodName === 'buddyOf'
  )[0].returnValues[0];
  return waveStarter;
};
export const getLastCheckin = async (MultiCallResults) => {
  // const lastCheckin = parseFloat(
  //   (await theTapContract.custody(address)).last_checkin
  // );
  const lastCheckin = parseFloat(
    ethers.BigNumber.from(
      MultiCallResults.TheTapContract.callsReturnContext.filter(
        (e) => e.methodName === 'custody'
      )[0].returnValues[3]
    )
  );
  return lastCheckin;
};
export const approveSplashTheTap = async (balance, signer) => {
  let _splashTokenContract = splashTokenContract.connect(signer);
  const tx = await _splashTokenContract.approve(
    theTapContractAddress,
    ethers.constants.MaxUint256
  );
  return tx;
};
/*export const approveSplashTheWell = async (balance, signer) => {
  let _splashTokenContract = splashTokenContract.connect(signer);
  const tx = await _splashTokenContract.approve(
    theWellContractAddress,
    ethers.constants.MaxUint256
  );
  return tx;
}; */

export const updateWaveStarter = async (waveStarter, address, signer) => {
  let _buddyContract = buddyContract.connect(signer);
  const tx = await _buddyContract.updateBuddy(waveStarter);

  return tx;
};
export const hydrate = async (signer) => {
  let _theTapContract = theTapContract.connect(signer);
  const tx = await _theTapContract.roll();
  return tx;
};
export const claim = async (available, address, signer) => {
  let _theTapContract = theTapContract.connect(signer);
  const tx = await _theTapContract.claim()};
 /* let data = {
    hash: tx.hash,
    toAddress: address,
    fromAddress: theWellContractAddress,
    id: address,
    amount: available,
  };
  // await axios.post("https://splash-test-app.herokuapp.com/api/users/postEvents", data);
  return tx;
}; */
export const deposit = async (referral, amount, address, signer) => {
  let _theTapContract = theTapContract.connect(signer);
  let fixedAmount = Number(amount).toFixedDown(6);
  const tx = await _theTapContract.deposit(
    referral,
    utils.parseUnits(fixedAmount.toString())
  );
  /*let data = {
    hash: tx.hash,
    toAddress: theWellContractAddress,
    fromAddress: address,
    id: address,
    amount: fixedAmount,
  }; */
  // await axios.post(
  //   'https://splash-test-app.herokuapp.com/api/users/postEvents',
  //   data
  // );
  return tx;
};
// export const getUserAvaxBalance = async (signer) => {
//   const userAvaxBalance = parseFloat(
//     utils.formatEther(await signer.getBalance())
//   );
//   return userAvaxBalance;
// };
/*export const buySplash = async (amount, address, slippage, signer) => {
  let _theWellContract = theWellContract.connect(signer);
  let fixedAmount = Number(amount).toFixedDown(6);
  const tokensInputPrice = await theWellContract.getBnbToTokenInputPrice(
    utils.parseUnits(fixedAmount.toString())
  );
  const minTokensToReceive =
    parseFloat(utils.formatEther(tokensInputPrice)) * (1 - slippage / 100);

  const tx = await _theWellContract.bnbToTokenSwapInput(
    utils.parseEther(minTokensToReceive.toString()),
    {
      value: utils.parseEther(fixedAmount.toString()),
    }
  );
  let data = {
    hash: tx.hash,
    toAddress: theWellContractAddress,
    fromAddress: address,
    id: address,
    amount: fixedAmount,
  };
  // await axios.post("https://splash-test-app.herokuapp.com/api/users/postEvents",data);
  return tx;
};
export const sellSplash = async (amount, address, slippage, signer) => {
  let _theWellContract = theWellContract.connect(signer);
  let fixedAmount = Number(amount).toFixedDown(6);
  const tokensInputPrice = await theWellContract.getTokenToBnbInputPrice(
    utils.parseUnits(fixedAmount.toString())
  );

  const minAvaxToReceive =
    parseFloat(utils.formatEther(tokensInputPrice)) *
    (1 - slippage / 100) *
    0.9;
  const tx = await _theWellContract.tokenToBnbSwapInput(
    utils.parseEther(fixedAmount.toString()),
    utils.parseEther(minAvaxToReceive.toString())
  );
  let data = {
    hash: tx.hash,
    toAddress: theWellContractAddress,
    fromAddress: address,
    id: address,
    amount: fixedAmount,
  };
  // await axios.post("https://splash-test-app.herokuapp.com/api/users/postEvents",data);
  return tx;
}; */
export const getPlayerInfo = async (address) => {
  const userInfoTotals = await theTapContract.userInfoTotals(address);
  const airdrops = await theTapContract.airdrops(address);

  const airdropReceived = parseFloat(
    utils.formatEther(airdrops.airdrops_received)
  );
  const airdropSent = parseFloat(utils.formatEther(airdrops.airdrops));
  const lastAirdrop = parseFloat(airdrops.last_airdrop);
  const directs = parseFloat(userInfoTotals.referrals);
  const teamSize = parseFloat(userInfoTotals.total_structure);
  const totalDeposits = parseFloat(
    utils.formatEther(userInfoTotals.total_deposits)
  );
  return {
    directs,
    teamSize,
    totalDeposits,
    airdropReceived,
    airdropSent,
    lastAirdrop,
  };
};

export const getEligibleParticipants = async (
  player,
  minimumDirects,
  minimumDeposits
) => {
  // console.log(player);
  const participantsData = await Promise.all(
    player.team[0].map(async (participant) => {
      let data = await theTapContract.userInfoTotals(participant);
      return {
        address: participant,
        referrals: parseFloat(data.referrals),
        deposits: parseFloat(utils.formatEther(data.total_deposits)),
      };
    })
  );
  const eligibleParticipants = participantsData.filter(
    (participant) =>
      participant.referrals >= minimumDirects &&
      participant.deposits >= minimumDeposits
  );
  return eligibleParticipants;
};
export const sendMultipleAirdrop = async (addresses, amount, signer) => {
  let _theTapContract = theTapContract.connect(signer);
  let fixedAmount = Number(amount).toFixedDown(6);
  const gasNeeded = await _theTapContract.estimateGas.MultiSendairdrop(
    addresses,
    utils.parseUnits(fixedAmount.toString()),
    { gasLimit: 8000000 }
  );
  const tx = await _theTapContract.MultiSendairdrop(
    addresses,
    utils.parseUnits(fixedAmount.toString()),
    { gasLimit: gasNeeded }
  );
  // console.log(parseFloat(tx));
  // let data = {
  //   hash: tx.hash,
  //   toAddress: theWellContractAddress,
  //   fromAddress: address,
  //   id: address,
  //   amount: amount,
  // };
  // await axios.post(
  //   'https://splash-test-app.herokuapp.com/api/users/postEvents',
  //   data
  // );
  return tx;
};
export const sendDirectAirdrop = async (address, amount, signer) => {
  let _theTapContract = theTapContract.connect(signer);
  let fixedAmount = Number(amount).toFixedDown(6);
  const tx = await _theTapContract.airdrop(
    address,
    utils.parseUnits(fixedAmount.toString())
  );
  // let data = {
  //   hash: tx.hash,
  //   toAddress: theWellContractAddress,
  //   fromAddress: address,
  //   id: address,
  //   amount: amount,
  // };
  // await axios.post(
  //   'https://splash-test-app.herokuapp.com/api/users/postEvents',
  //   data
  // );
  return tx;
};
export const getSplashPriceInUSD = async (MultiCallResult) => {
  // Before filtering for decimals
  console.log("All AggregatorContract Calls:", MultiCallResult.AggregatorContract.callsReturnContext);

  const decimalsResult = MultiCallResult.AggregatorContract.callsReturnContext.filter(
    (e) => e.methodName === 'decimals'
  );
  
  // After filtering for decimals
  console.log("Filtered Result for 'decimals':", decimalsResult);

  // Ensure the filter returned at least one item and that returnValues exists
  if (!decimalsResult.length || !decimalsResult[0].returnValues) {
    throw new Error("Decimals filter did not return any valid data");
  }

  const decimals = decimalsResult[0].returnValues[0];
  console.log("Decimals:", decimals);

  // Before filtering for latestRoundData
  console.log("All AggregatorContract Calls for latestRoundData:", MultiCallResult.AggregatorContract.callsReturnContext);

  const latestRoundDataResult = MultiCallResult.AggregatorContract.callsReturnContext.filter(
    (e) => e.methodName === 'latestRoundData'
  );
  
  // After filtering for latestRoundData
  console.log("Filtered Result for 'latestRoundData':", latestRoundDataResult);

  // Ensure the filter returned at least one item and that returnValues exists
  if (!latestRoundDataResult.length || !latestRoundDataResult[0].returnValues) {
    throw new Error("latestRoundData filter did not return any valid data");
  }

  const latestRoundData = latestRoundDataResult[0].returnValues[1];
  console.log("Latest Round Data:", latestRoundData);

  const avaxinusd = parseFloat(
    utils.formatUnits(latestRoundData, decimals)
  );
  console.log("avaxinusd:", avaxinusd);
  
  // ... rest of your function

  const avaxBalance = parseFloat(
    utils.formatEther(
      MultiCallResult.LPTokenContractAVAX.callsReturnContext.filter(
        (e) => e.methodName === 'getReserves'
      )[0].returnValues[0]
    )
  );
  const splashBalance = parseFloat(
    utils.formatEther(
      MultiCallResult.LPTokenContractAVAX.callsReturnContext.filter(
        (e) => e.methodName === 'getReserves'
      )[0].returnValues[1]
    )
  );
  const splashPrice = (avaxBalance * avaxinusd) / splashBalance;
  return { avaxBalance, splashBalance, splashPrice, avaxinusd };
};
export const getWavePriceInUSD = async () => {
  let { avaxBalance, waveBalance } = await getReservesWaveAVAX();
  const avaxinusd = await getAVAXPriceInUsd();
  const wavePrice = (avaxBalance * avaxinusd) / waveBalance;
  return { wavePrice };
};

//SPLASHPAD
/*export const approveUsdtSwapper = async (balance, signer) => {
  let _usdtTokenContract = usdtTokenContract.connect(signer);
  const tx = await _usdtTokenContract.approve(
    SwapperContractAddress,
    ethers.constants.MaxUint256 
  );
  return tx;
}; */
/*export const approveLPToSwapper = async (balance, signer) => {
  let _LPTokenContractUSDTe = LPTokenContractUSDTe.connect(signer);
  const tx = await _LPTokenContractUSDTe.approve(
    SwapperContractAddress,
    ethers.constants.MaxUint256
  );
  return tx;
}; */
/*export const approveLPToSplashPads = async (balance, signer) => {
  let _LPTokenContractUSDTe = LPTokenContractUSDTe.connect(signer);
  const tx = await _LPTokenContractUSDTe.approve(
    splashpadsContractAddress,
    ethers.constants.MaxUint256
  );
  return tx;
}; */
/*export const getUSDTAllowanceSwapper = async (address) => {
  const usdtAllowance = parseFloat(
    utils.formatEther(
      await usdtTokenContract.allowance(address, SwapperContractAddress)
    )
  );
  return usdtAllowance;
}; */
/*export const getLPAllowanceSwapper = async (address) => {
  const LPAllowance = parseFloat(
    utils.formatEther(
      await LPTokenContractUSDTe.allowance(address, SwapperContractAddress)
    )
  );
  return LPAllowance;
}; */
/*export const getLPAllowanceSplashPads = async (address) => {
  const LPAllowance = parseFloat(
    utils.formatEther(
      await LPTokenContractUSDTe.allowance(address, splashpadsContractAddress)
    )
  );
  return LPAllowance;
}; */
/*export const getLPPriceInUSD = async () => {
  const { usdteBalance } = await getReservesUSDTe();
  const LPTotalSupply = parseFloat(
    utils.formatEther(await LPTokenContractUSDTe.totalSupply())
  );
  const LPPriceInUSD = (usdteBalance * 2) / LPTotalSupply;
  return LPPriceInUSD;
}; */
 /*export const getUSDTBalance = async (address) => {
  let balance = parseFloat(
    utils.formatUnits(await usdtTokenContract.balanceOf(address), 6)
  );
  return balance;
}; */
/*export const getLPTokenBalance = async (address) => {
  let balance = parseFloat(
    utils.formatEther(await LPTokenContractUSDTe.balanceOf(address))
  );
  return balance;
}; */
/*export const convertUSDTTOLP = async (amount, signer) => {
  let _swapperContract = swapperContract.connect(signer);
  let fixedAmount = Number(amount).toFixedDown(12);
  const tx = await _swapperContract.swapUSDTtoLP(
    utils.parseUnits(fixedAmount.toString(), 6)
  );
  return tx;
}; */
/*export const convertLPTOUSDT = async (amount, signer) => {
  let _swapperContract = swapperContract.connect(signer);
  let fixedAmount = Number(amount).toFixed(12);
  const tx = await _swapperContract.swapLPToUSDT(
    utils.parseUnits(fixedAmount.toString())
  );
  return tx;
}; */
/*export const depositSplashPads = async (amount, signer) => {
  let _splashpadsContract = splashpadsContract.connect(signer);
  let fixedAmount = Number(amount).toFixedDown(12);
  const tx = await _splashpadsContract.deposit(
    utils.parseUnits(fixedAmount.toString())
  );
  return tx;
}; */
/*export const rollSplashPads = async (depositId, signer) => {
  let _splashpadsContract = splashpadsContract.connect(signer);
  const tx = await _splashpadsContract.roll(depositId);
  return tx;
};
export const rollAllSplashPads = async (signer) => {
  let _splashpadsContract = splashpadsContract.connect(signer);
  const tx = await _splashpadsContract.rollAll();
  return tx;
};
export const claimSplashPads = async (depositId, signer) => {
  let _splashpadsContract = splashpadsContract.connect(signer);
  const tx = await _splashpadsContract.claim(depositId);
  return tx;
};
export const claimAllSplashPads = async (signer) => {
  let _splashpadsContract = splashpadsContract.connect(signer);
  const tx = await _splashpadsContract.claimAll();
  return tx;
};
export const getPlayerInfoSplashPads = async (address) => {
  let depositIds = await splashpadsContract.getDepositsIds(address);
  let deposits = await Promise.all(
    depositIds.map((deposit) =>
      splashpadsContract.getDeposit(parseFloat(deposit))
    )
  ); 
  deposits = deposits.map((deposit) => {
    return {
      deposit: parseFloat(utils.formatEther(deposit.amount)),
      depositTime: parseFloat(deposit.depositTime),
      id: parseFloat(deposit.id),
      payout: parseFloat(utils.formatEther(deposit.payout)),
      claimTime: parseFloat(deposit.claimTime),
      rollTime: parseFloat(deposit.rollTime),
      percentage: parseFloat(deposit.percentage),
      rewardsAvailable: parseFloat(utils.formatEther(deposit.rewardsAvailable)),
    };
  });
  let playerStats = deposits.reduce(
    (previous, current) => {
      return {
        ...{
          deposit: previous.deposit + current.deposit,
          rewardsAvailable:
            previous.rewardsAvailable + current.rewardsAvailable,
          payout: previous.payout + current.payout,
        },
      };
    },
    { deposit: 0, rewardsAvailable: 0, payout: 0 }
  );
  playerStats.averageDailyPercentage =
    deposits.reduce((previous, current) => {
      return previous + current.deposit * current.percentage;
    }, 0) / playerStats.deposit || 0;
  return { deposits, playerStats };
}; */

export const MigrateFromOldTap = async (signer) => {
  let tx = await theTapContract.connect(signer).migrateFromOldContract();
  return tx;
};

export const getDepositsAvailableAndPlayerTeamFromAddress = async (address) => {
  const contractCallContext = [
    {
      ...TheTapContractMultiCall,
      calls: [
        {
          reference: 'userInfoTotals',
          methodName: 'userInfoTotals',
          methodParameters: [address],
        },
      ],
    },
  ];
  const { results } = await multicall.call(contractCallContext);
  const { deposits, directPlayers, teamSize } =
    await getDepositsAvailableAndPlayerTeam(results);
  return { deposits, directPlayers, teamSize };
};

export const refreshHomeData = async () => {
  const contractCallContext = [
    {
      ...splashTokenMultiCall,
      calls: [
        { reference: 'totalTxs', methodName: 'totalTxs' },
        { reference: 'players', methodName: 'players' },
        { reference: 'totalSupply', methodName: 'totalSupply' },
      ],
    },
  ];
  const { results } = await multicall.call(contractCallContext);
  // console.log({ results });
  const splashTransactionsCount = parseFloat(
    await getSplashTransactionsCount(results)
  );

  const splashTokenPlayersCount = parseFloat(
    await getSplashPlayersCount(results)
  );
  const splashTokenTotalSupply = parseFloat(
    utils.formatEther(await getSplashTotalSupply(results))
  );
  return {
    splashTransactionsCount,
    splashTokenPlayersCount,
    splashTokenTotalSupply,
  };
};
export const refreshTheWellData = async () => {
  const contractCallContext = [
    {
      ...AggregatorContractMultiCall,
      calls: [
        { reference: 'decimals', methodName: 'decimals' },
        { reference: 'latestRoundData', methodName: 'latestRoundData' },
      ],
    },
    {
      ...LPTokenContractAVAXMultiCall,
      calls: [{ reference: 'getReserves', methodName: 'getReserves' }],
    },
  ];
  const { results } = await multicall.call(contractCallContext);
  const { avaxBalance, splashBalance, splashPrice, avaxinusd } =
    await getSplashPriceInUSD(results);
  return { avaxBalance, splashBalance, splashPrice, avaxinusd };
};
export const refreshTheTapStats = async (address) => {
  const contractCallContext = [
    {
      ...AggregatorContractMultiCall,
      calls: [
        { reference: 'decimals', methodName: 'decimals' },
        { reference: 'latestRoundData', methodName: 'latestRoundData' },
      ],
    },
    {
      ...LPTokenContractAVAXMultiCall,
      calls: [{ reference: 'getReserves', methodName: 'getReserves' }],
    },
    {
      ...TheTapContractMultiCall,
      calls: [
        {
          reference: 'claimsAvailable',
          methodName: 'claimsAvailable',
          methodParameters: [address],
        },
      /*  {
          reference: 'getCurrentPayoutRate',
          methodName: 'getCurrentPayoutRate',
          methodParameters: [address],
        }, */
        {
          reference: 'users',
          methodName: 'users',
          methodParameters: [address],
        },
        {
          reference: 'userInfoTotals',
          methodName: 'userInfoTotals',
          methodParameters: [address],
        },
        {
          reference: 'payoutOf',
          methodName: 'payoutOf',
          methodParameters: [address],
        },
        {
          reference: 'custody',
          methodName: 'custody',
          methodParameters: [address],
        },
      ],
    },
    {
      ...SplashTokenContractMultiCall,
      calls: [
        {
          reference: 'balanceOf',
          methodName: 'balanceOf',
          methodParameters: [address],
        },
        {
          reference: 'allowance',
          methodName: 'allowance',
          methodParameters: [address, theTapContractAddress],
        },
      ],
    },
    {
      ...BuddyContractMultiCall,
      calls: [
        {
          reference: 'buddyOf',
          methodName: 'buddyOf',
          methodParameters: [address],
        },
      ],
    },
  ];
  const { results } = await multicall.call(contractCallContext);
  // console.log({ results });
  const { splashPrice } = await getSplashPriceInUSD(results);
  const claimsAvailable = await getClaimsAvailable(results);
  /*const { currentPayoutRate, lastClaimOrRoll } = await getCurrentPayoutRate(
    results
  ); */
  const { deposits, directPlayers, teamSize } =
    await getDepositsAvailableAndPlayerTeam(results);
  const claimed = await getClaimed(results);
  const rewarded = await getRewarded(results);
  const maxPayout = await getMaxPayout(results);
  const splashBalance = await getSplashBalance(results);
  const splashAllowanceTheTap = await getSplashAllowanceTheTap(results);
  const waveStarter = await getWaveStarter(results);
  const lastCheckin = await getLastCheckin(results);
  // console.log({
  //   splashPrice,
  //   claimsAvailable,
  //   deposits,
  //   claimed,
  //   rewarded,
  //   maxPayout,
  //   directPlayers,
  //   teamSize,
  //   splashBalance,
  //   splashAllowanceTheTap,
  //   waveStarter,
  //   lastCheckin,
  //   address,
  //   currentPayoutRate,
  //   lastClaimOrRoll,
  // });
  return {
    splashPrice,
    claimsAvailable,
    deposits,
    claimed,
    rewarded,
    maxPayout,
    directPlayers,
    teamSize,
    splashBalance,
    splashAllowanceTheTap,
    waveStarter,
    lastCheckin,
    address,
   // currentPayoutRate,
    //lastClaimOrRoll,
  };
};
/*export const refreshSplashPadsStats = async (address) => {
  const usdtBalance = await getUSDTBalance(address);
  const usdtAllowanceSwapper = await getUSDTAllowanceSwapper(address);
  const LPBalance = await getLPTokenBalance(address);
  const LPAllowanceSwapper = await getLPAllowanceSwapper(address);
  const LPAllowanceSplashPads = await getLPAllowanceSplashPads(address);
  const LPPriceInUSD = await getLPPriceInUSD();
  const PlayerInfo = await getPlayerInfoSplashPads(address);
  return {
    usdtBalance,
    usdtAllowanceSwapper,
    LPAllowanceSwapper,
    LPAllowanceSplashPads,
    LPBalance,
    LPPriceInUSD,
    PlayerInfo,
  };
}; */
