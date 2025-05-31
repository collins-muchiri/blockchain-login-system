import { ethers } from 'ethers'
import AccessControlABI from '../../contracts/artifacts/contracts/AccessControl.sol/AccessControl.json'

const CONTRACT_ADDRESS = process.env.VITE_CONTRACT_ADDRESS

export const getContract = async (signer) => {
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    AccessControlABI.abi,
    signer
  )
  return contract
}

export const registerUser = async (signer, address, metadata) => {
  try {
    const contract = await getContract(signer)
    const tx = await contract.registerUser(address, metadata)
    await tx.wait()
    return true
  } catch (error) {
    console.error('Error registering user:', error)
    throw error
  }
}

export const recordLogin = async (signer, address) => {
  try {
    const contract = await getContract(signer)
    const tx = await contract.recordLogin(address)
    await tx.wait()
    return true
  } catch (error) {
    console.error('Error recording login:', error)
    throw error
  }
}

export const getUserData = async (signer, address) => {
  try {
    const contract = await getContract(signer)
    const userData = await contract.users(address)
    return {
      isActive: userData.isActive,
      lastLogin: new Date(userData.lastLogin.toNumber() * 1000),
      createdAt: new Date(userData.createdAt.toNumber() * 1000),
      metadata: userData.metadata
    }
  } catch (error) {
    console.error('Error getting user data:', error)
    throw error
  }
}

export const getTotalUsers = async (signer) => {
  try {
    const contract = await getContract(signer)
    const totalUsers = await contract.getTotalUsers()
    return totalUsers.toNumber()
  } catch (error) {
    console.error('Error getting total users:', error)
    throw error
  }
} 