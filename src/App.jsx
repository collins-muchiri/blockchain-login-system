import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'

// Components
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'

// Theme
import theme from './theme'

function getLibrary(provider) {
  return new ethers.BrowserProvider(provider)
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </ChakraProvider>
    </Web3ReactProvider>
  )
}

export default App 