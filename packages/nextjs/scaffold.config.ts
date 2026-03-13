// Chain type'ını kendimiz tanımlayalım (viem olmadan)
type Chain = {
  id: number;
  name: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: {
    default: { http: readonly string[] };
    public: { http: readonly string[] };
  };
  blockExplorers: {
    default: { name: string; url: string };
  };
};

// 🔥 MONAD TESTNET TANIMI
const monadTestnet = {
  id: 10143,
  name: "Monad Testnet",
  nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet-rpc.monad.xyz/"] },
    public: { http: ["https://testnet-rpc.monad.xyz/"] },
  },
  blockExplorers: {
    default: { name: "MonadExplorer", url: "https://explorer.monad.xyz/" },
  },
} as const satisfies Chain;

export type BaseConfig = {
  targetNetworks: readonly Chain[];
  pollingInterval: number;
  rpcOverrides?: Record<number, string>;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
  alchemyApiKey?: string;
};

export type ScaffoldConfig = BaseConfig;

export const DEFAULT_ALCHEMY_API_KEY = "cR4WnXePioePZ5fFrnSiR";

const scaffoldConfig = {
  // 🚀 Sadece Monad Testnet'i hedefliyoruz
  targetNetworks: [monadTestnet], 

  pollingInterval: 3000,
  rpcOverrides: {},
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "63aa10cd92321894d958c5213dba77d7",
  
  // ⚠️ MVP için gerçek cüzdan kullanmak için false
  onlyLocalBurnerWallet: false,

  // Alchemy kullanmıyoruz, undefined
  alchemyApiKey: undefined,
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;