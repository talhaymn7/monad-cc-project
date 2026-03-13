# Clear Cart - Monad Hackathon 2026

Grup yemek siparişlerini blockchain üzerinde paylaşan ve bölen merkeziyetsiz uygulama.

## 🚀 Özellikler

- **Grup Siparişleri**: Arkadaşlarınızla aynı sepete ürün ekleyin
- **Blockchain Ödemeleri**: Monad testnet üzerinde güvenli ödemeler
- **Anında Bölüşme**: Otomatik hesap bölme ve ödeme takibi
- **Web3 Entegrasyonu**: MetaMask ve diğer wallet'larla uyumlu

## 🛠 Teknoloji Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Blockchain**: Monad Testnet, Solidity
- **Web3**: Wagmi, Viem, RainbowKit
- **UI**: Tailwind CSS, DaisyUI
- **Deployment**: Vercel

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
yarn install

# Local development
yarn start

# Contract deploy (Hardhat)
yarn deploy
```

## 🚀 Deployment

### Vercel'e Deploy Etmek İçin

1. **Vercel'e Giriş**:
   ```bash
   yarn vercel:login
   ```

2. **Production Deploy**:
   ```bash
   yarn vercel:yolo --prod
   ```

### Environment Variables (Vercel Dashboard)

Production'da aşağıdaki değişkenleri ayarlayın:
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`: `63aa10cd92321894d958c5213dba77d7`
- `NEXT_PUBLIC_FIREBASE_API_KEY`: Firebase API Key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: Firebase Auth Domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: Firebase Project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: Firebase Storage Bucket
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: Firebase Messaging Sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID`: Firebase App ID

## 📱 Kullanım

1. Ana sayfadan "Oda Oluştur" butonuna tıklayın
2. Login olun ve oda oluşturun
3. Arkadaşlarınızı odaya davet edin
4. Market'ten ürün ekleyin
5. Ödeme zamanı geldiğinde herkes payını ödesin

## 🔗 Contract Adresi

**Monad Testnet**: `0x3cfb0852E617A7926065E9B88906872960EF223b`

## 📄 Lisans

MIT License

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Install dependencies if it was skipped in CLI:

```
cd my-dapp-example
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `packages/hardhat/hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contracts in `packages/hardhat/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/hardhat/deploy`


## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.