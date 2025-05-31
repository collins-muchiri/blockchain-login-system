import { Navigate } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'

function PrivateRoute({ children }) {
  const { account } = useWeb3React()
  const token = localStorage.getItem('token')

  if (!account || !token) {
    return <Navigate to="/" replace />
  }

  return children
}

export default PrivateRoute 