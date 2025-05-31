import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42], // Ethereum networks
})

function Login() {
  const { activate, account, library } = useWeb3React()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const connectWallet = async () => {
    try {
      setIsLoading(true)
      await activate(injected)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to connect wallet',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async () => {
    if (!account || !library) return

    try {
      setIsLoading(true)
      
      // Create a message to sign
      const message = `Welcome to Blockchain Login System!\n\nClick to sign in and accept the terms of service.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.`
      
      // Get the signer
      const signer = await library.getSigner()
      
      // Sign the message
      const signature = await signer.signMessage(message)
      
      // Send the signature to the backend for verification
      const response = await axios.post('/api/auth/login', {
        address: account,
        signature,
        message,
      })

      // Store the token
      localStorage.setItem('token', response.data.token)
      
      // Navigate to dashboard
      navigate('/dashboard')
      
      toast({
        title: 'Success',
        description: 'Successfully logged in!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to login',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8}>
        <Heading>Blockchain Login System</Heading>
        <Text textAlign="center" color="gray.600">
          Connect your wallet to sign in securely
        </Text>
        
        <Box w="full" p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
          <VStack spacing={4}>
            {!account ? (
              <Button
                w="full"
                size="lg"
                onClick={connectWallet}
                isLoading={isLoading}
                loadingText="Connecting..."
              >
                Connect Wallet
              </Button>
            ) : (
              <VStack spacing={4} w="full">
                <Text>Connected: {account}</Text>
                <Button
                  w="full"
                  size="lg"
                  onClick={handleLogin}
                  isLoading={isLoading}
                  loadingText="Signing in..."
                >
                  Sign In
                </Button>
              </VStack>
            )}
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default Login 