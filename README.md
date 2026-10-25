# Blockchain Login System

*Secure authentication solution leveraging blockchain-based identity verification; JavaScript.*

![category](https://img.shields.io/badge/category-web3-EF4444?style=flat-square) ![language](https://img.shields.io/badge/language-JavaScript-2563EB?style=flat-square) ![license](https://img.shields.io/badge/license-MIT-16A34A?style=flat-square) ![maintenance](https://img.shields.io/badge/maintenance-dormant-D97706?style=flat-square) ![repo](https://img.shields.io/badge/repo-blockchain--login--system-111827?style=flat-square)

---

A secure, decentralized authentication system that uses blockchain wallets for user authentication. This system provides a modern, secure, and user-friendly way to authenticate users using their blockchain wallets.

## Features

- 🔐 Wallet-based authentication using MetaMask
- 🔑 Passwordless login through cryptographic signatures
- 🔄 Cross-chain compatibility
- 🛡️ Role-based access control
- 📱 Modern, responsive UI with Chakra UI
- 🔍 On-chain user management
- 📊 Login tracking and analytics
- 🚀 Easy integration with existing applications

## Tech Stack

### Frontend
- React
- Vite
- Chakra UI
- Web3-React
- Ethers.js
- React Router

### Backend
- Node.js
- Express
- JWT Authentication
- Winston Logger

### Smart Contracts
- Solidity
- OpenZeppelin
- Hardhat

## Prerequisites

- Node.js (v14 or higher)
- MetaMask or any Web3 wallet
- npm or yarn package manager
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/collins-muchiri/blockchain-login-system.git
cd blockchain-login-system
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Install smart contract dependencies:
```bash
cd ../contracts
npm install
```

5. Create environment files:

Frontend (.env):
```env
VITE_CONTRACT_ADDRESS=your_contract_address_here
VITE_BACKEND_URL=http://localhost:5000
```

Backend (.env):
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:3000
LOG_LEVEL=info
```

Contracts (.env):
```env
PRIVATE_KEY=your_wallet_private_key
GOERLI_RPC_URL=your_goerli_rpc_url
ETHERSCAN_API_KEY=your_etherscan_api_key
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend:
```bash
# In the root directory
npm run dev
```

3. Deploy the smart contract (optional for development):
```bash
cd contracts
npm run deploy:local
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Usage

1. Connect your MetaMask wallet
2. Sign the authentication message
3. Access the dashboard
4. Manage your profile and permissions

## Security Features

- Message signing for authentication
- JWT-based session management
- Protected routes
- Rate limiting
- Secure wallet connection handling
- Role-based access control
- Emergency pause functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- OpenZeppelin for secure smart contract libraries
- MetaMask for wallet integration
- The Ethereum community for their excellent documentation 