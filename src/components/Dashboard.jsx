import { useWeb3React } from '@web3-react/core'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'

function Dashboard() {
  const { account, deactivate } = useWeb3React()
  const navigate = useNavigate()
  const toast = useToast()

  const handleLogout = () => {
    localStorage.removeItem('token')
    deactivate()
    navigate('/')
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8}>
        <Heading>Dashboard</Heading>
        
        <Box w="full" p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
          <VStack spacing={4} align="stretch">
            <Text>
              <strong>Connected Wallet:</strong> {account}
            </Text>
            
            <Button
              colorScheme="red"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default Dashboard 