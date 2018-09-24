export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
export const NULL_BYTES32 = "0x0000000000000000000000000000000000000000000000000000000000000000";

export namespace ERC20TokenSymbol {
    export const REP = "REP";
    export const ZRX = "ZRX";
    export const MKR = "MKR";
}

export const SALT_DECIMALS = 20;

/**
 * An estimate of Ethereum blocktime: The typical number of sections between each block.
 *
 * @type {number}
 */
export const BLOCK_TIME_ESTIMATE_SECONDS = 14;

export const NULL_ECDSA_SIGNATURE = {
    r: "",
    s: "",
    v: 0,
};

export const WEB3_ERROR_INVALID_ADDRESS = "invalid address";
export const WEB3_ERROR_ACCOUNT_NOT_FOUND = "Account not found";
export const WEB3_ERROR_NO_PRIVATE_KEY = "cannot sign data; no private key";

export const DEBT_KERNEL_CONTRACT_CACHE_KEY = "DebtKernel";
export const DEBT_REGISTRY_CONTRACT_CACHE_KEY = "DebtRegistry";
export const CONTRACT_REGISTRY_CONTRACT_CACHE_KEY = "ContractRegistry";
export const DEBT_TOKEN_CONTRACT_CACHE_KEY = "DebtToken";
export const REPAYMENT_ROUTER_CONTRACT_CACHE_KEY = "RepaymentRouter";
export const SIMPLE_INTEREST_TERMS_CONTRACT_CACHE_KEY = "SimpleInterestTermsContract";
export const TOKEN_REGISTRY_CONTRACT_CACHE_KEY = "TokenRegistry";
export const TOKEN_TRANSFER_PROXY_CONTRACT_CACHE_KEY = "TokenTransferProxy";
export const TERMS_CONTRACT_REGISTRY_CONTRACT_CACHE_KEY = "TermsContractRegistry";
export const COLLATERALIZED_SIMPLE_INTEREST_TERMS_CONTRACT_CACHE_KEY =
    "CollateralizedSimpleInterestTermsContract";
export const COLLATERALIZER_CONTRACT_CACHE_KEY = "CollateralizerContract";
export const ERC721_COLLATERALIZER_CONTRACT_CACHE_KEY = "ERC721CollateralizerContract";
export const ERC721_COLLATERALIZED_SIMPLE_INTEREST_TERMS_CONTRACT_CACHE_KEY =
    "ERC721CollateralizedSimpleInterestTermsContract";
export const ERC721_TOKEN_REGISTRY_CONTRACT_CACHE_KEY = "ERC721TokenRegistryContract";
export const MINTABLE_ERC721_CACHE_KEY = "MintableERC721TokenContract";

export const TERMS_CONTRACT_TYPES = {
    COLLATERALIZED_SIMPLE_INTEREST_LOAN: "CollateralizedSimpleInterestLoan",
    SIMPLE_INTEREST_LOAN: "SimpleInterestLoan",
    ERC721_COLLATERALIZED_SIMPLE_INTEREST_LOAN: "ERC721CollateralizedSimpleInterestLoan",
};

export const TOKEN_REGISTRY_TRACKED_TOKENS = [
    {
        address: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
        name: "Dai Stablecoin",
        symbol: "DAI",
        decimals: 18,
    },
    {
        address: "0xe94327d07fc17907b4db788e5adf2ed424addff6",
        name: "Augur REP",
        symbol: "REP",
        decimals: 18,
    },
    {
        address: "0xe41d2489571d322189246dafa5ebde1f4699f498",
        name: "ZRX",
        symbol: "ZRX",
        decimals: 18,
    },
    {
        address: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
        name: "Maker Dao",
        symbol: "MKR",
        decimals: 18,
    },
    {
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        name: "Canonical Wrapped Ether",
        symbol: "WETH",
        decimals: 18,
    },
    {
        address: "0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0",
        name: "EOS",
        symbol: "EOS",
        decimals: 18,
    },
    {
        address: "0xd850942ef8811f2a866692a623011bde52a462c1",
        name: "VeChain",
        symbol: "VEN",
        decimals: 18,
    },
    {
        address: "0xf230b790e05390fc8295f4d3f60332c93bed42e2",
        name: "Tronix",
        symbol: "TRX",
        decimals: 6,
    },
    {
        address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
        name: "BNB",
        symbol: "BNB",
        decimals: 18,
    },
    {
        address: "0xb5a5f22694352c15b00323844ad545abb2b11028",
        name: "ICON",
        symbol: "ICX",
        decimals: 18,
    },
    {
        address: "0xcb97e65f07da24d46bcdd078ebebd7c6e6e3d750",
        name: "Bytom",
        symbol: "BTM",
        decimals: 8,
    },
    {
        address: "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07",
        name: "OmiseGO",
        symbol: "OMG",
        decimals: 18,
    },
    {
        address: "0xe0b7927c4af23765cb51314a0e0521a9645f0e2a",
        name: "DGD",
        symbol: "DGD",
        decimals: 9,
    },
    {
        address: "0x05f4a42e251f2d52b8ed15e9fedaacfcef1fad27",
        name: "Zilliqa",
        symbol: "ZIL",
        decimals: 12,
    },
    {
        address: "0x168296bb09e24a88805cb9c33356536b980d3fc5",
        name: "RHOC",
        symbol: "RHOC",
        decimals: 8,
    },
    {
        address: "0x5ca9a71b1d01849c0a95490cc00559717fcf0d1d",
        name: "Aeternity",
        symbol: "AE",
        decimals: 18,
    },
    {
        address: "0x744d70fdbe2ba4cf95131626614a1763df805b9e",
        name: "StatusNetwork",
        symbol: "SNT",
        decimals: 18,
    },
    {
        address: "0x4CEdA7906a5Ed2179785Cd3A40A69ee8bc99C466",
        name: "AION",
        symbol: "AION",
        decimals: 8,
    },
    {
        address: "0xef68e7c694f40c8202821edf525de3782458639f",
        name: "Loopring",
        symbol: "LRC",
        decimals: 18,
    },
    {
        address: "0xfa1a856cfa3409cfa145fa4e20eb270df3eb21ab",
        name: "IOSToken",
        symbol: "IOST",
        decimals: 18,
    },
    {
        address: "0xb7cb1c96db6b22b0d3d9536e0108d062bd488f74",
        name: "Walton",
        symbol: "WTC",
        decimals: 18,
    },
    {
        address: "0xbf2179859fc6d5bee9bf9158632dc51678a4100e",
        name: "ELF",
        symbol: "ELF",
        decimals: 18,
    },
    {
        address: "0xa74476443119A942dE498590Fe1f2454d7D4aC0d",
        name: "Golem",
        symbol: "GNT",
        decimals: 18,
    },
    {
        address: "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
        name: "BAT",
        symbol: "BAT",
        decimals: 18,
    },
    {
        address: "0x1122b6a0e00dce0563082b6e2953f3a943855c1f",
        name: "Centrality Token",
        symbol: "CENNZ",
        decimals: 18,
    },
    {
        address: "0x618e75ac90b12c6049ba3b27f5d5f8651b0037f6",
        name: "QASH",
        symbol: "QASH",
        decimals: 6,
    },
    {
        address: "0x8f3470A7388c05eE4e7AF3d01D8C722b0FF52374",
        name: "Veritaseum",
        symbol: "VERI",
        decimals: 18,
    },
    {
        address: "0x419c4db4b9e25d6db2ad9691ccb832c8d9fda05e",
        name: "Dragon",
        symbol: "DRGN",
        decimals: 18,
    },
    {
        address: "0x12480e24eb5bec1a9d4369cab6a80cad3c0a377a",
        name: "Substratum",
        symbol: "SUB",
        decimals: 2,
    },
    {
        address: "0x5d65D971895Edc438f465c17DB6992698a52318D",
        name: "Nebulas",
        symbol: "NAS",
        decimals: 18,
    },
    {
        address: "0x5af2be193a6abca9c8817001f45744777db30756",
        name: "Ethos",
        symbol: "ETHOS",
        decimals: 8,
    },
    {
        address: "0x419d0d8bdd9af5e606ae2232ed285aff190e711b",
        name: "FunFair",
        symbol: "FUN",
        decimals: 8,
    },
    {
        address: "0xdd974d5c2e2928dea5f71b9825b8b646686bd200",
        name: "KyberNetwork",
        symbol: "KNC",
        decimals: 18,
    },
    {
        address: "0x48f775efbe4f5ece6e0df2f7b5932df56823b990",
        name: "Revain",
        symbol: "R",
        decimals: 0,
    },
    {
        address: "0x4156D3342D5c385a87D264F90653733592000581",
        name: "Salt",
        symbol: "SALT",
        decimals: 8,
    },
    {
        address: "0x809826cceab68c387726af962713b64cb5cb3cca",
        name: "NucleusVision",
        symbol: "nCash",
        decimals: 18,
    },
    {
        address: "0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c",
        name: "Bancor",
        symbol: "BNT",
        decimals: 18,
    },
    {
        address: "0x514910771af9ca656af840dff83e8264ecf986ca",
        name: "ChainLink Token",
        symbol: "LINK",
        decimals: 18,
    },
    {
        address: "0x595832f8fc6bf59c85c527fec3740a1b7a361269",
        name: "PowerLedger",
        symbol: "POWR",
        decimals: 6,
    },
    {
        address: "0xd0a4b8946cb52f0661273bfbc6fd0e0c75fc6433",
        name: "Storm",
        symbol: "STORM",
        decimals: 18,
    },
    {
        address: "0x39bb259f66e1c59d5abef88375979b4d20d98022",
        name: "WAX Token",
        symbol: "WAX",
        decimals: 8,
    },
    {
        address: "0xf0ee6b27b759c9893ce4f094b49ad28fd15a23e4",
        name: "Enigma",
        symbol: "ENG",
        decimals: 8,
    },
    {
        address: "0xB97048628DB6B661D4C2aA833e95Dbe1A905B280",
        name: "TenXPay",
        symbol: "PAY",
        decimals: 18,
    },
    {
        address: "0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac",
        name: "Storj",
        symbol: "STORJ",
        decimals: 8,
    },
    {
        address: "0x8f8221afbb33998d8584a2b05749ba73c37a938a",
        name: "Request",
        symbol: "REQ",
        decimals: 18,
    },
    {
        address: "0x08d32b0da63e2C3bcF8019c9c5d849d7a9d791e6",
        name: "Dentacoin",
        symbol: "Dentacoin",
        decimals: 0,
    },
    {
        address: "0xe25bcec5d3801ce3a794079bf94adf1b8ccd802d",
        name: "MATRIX AI Network",
        symbol: "MAN",
        decimals: 18,
    },
    {
        address: "0x3597bfd533a99c9aa083587b074434e61eb0a258",
        name: "DENT",
        symbol: "DENT",
        decimals: 8,
    },
    {
        address: "0xd0352a019e9ab9d757776f532377aaebd36fd541",
        name: "Fusion",
        symbol: "FSN",
        decimals: 18,
    },
    {
        address: "0xd4c435f5b09f855c3317c8524cb1f586e42795fa",
        name: "Cindicator",
        symbol: "CND",
        decimals: 18,
    },
    {
        address: "0x888666CA69E0f178DED6D75b5726Cee99A87D698",
        name: "ICONOMI",
        symbol: "ICN",
        decimals: 18,
    },
    {
        address: "0x1776e1f26f98b1a5df9cd347953a26dd3cb46671",
        symbol: "NMR",
        name: "Numeraire",
        decimals: 18,
    },
    {
        address: "0x42d6622dece394b54999fbd73d108123806f6a18",
        symbol: "SPANK",
        name: "SPANK",
        decimals: 18,
    },
    {
        address: "0x8dd5fbce2f6a956c3022ba3663759011dd51e73e",
        symbol: "TUSD",
        name: "TrueUSD",
        decimals: 18,
    },
    {
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        symbol: "USDT",
        name: "Tether USD",
        decimals: 6,
    },
];

/**
 * Tokens that are in the process of being disabled for various reasons.
 *
 * EOS (5/29/2018) - (Disabled in dharma.js / Plex) Disabled because EOS ERC20 is being frozen
 */
export const DISABLED_TOKEN_SYMBOLS = ["EOS"];
