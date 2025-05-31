// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title AccessControl
 * @dev Manages user roles and permissions for the blockchain login system
 */
contract AccessControl is AccessControl, Pausable {
    using Counters for Counters.Counter;

    // Role definitions
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MODERATOR_ROLE = keccak256("MODERATOR_ROLE");

    // User data structure
    struct User {
        bool isActive;
        uint256 lastLogin;
        uint256 createdAt;
        string metadata; // IPFS hash for additional user data
    }

    // Mapping of addresses to user data
    mapping(address => User) public users;
    
    // Counter for total users
    Counters.Counter private _userCount;

    // Events
    event UserRegistered(address indexed user, uint256 timestamp);
    event UserDeactivated(address indexed user, uint256 timestamp);
    event UserReactivated(address indexed user, uint256 timestamp);
    event UserMetadataUpdated(address indexed user, string metadata);
    event UserLoggedIn(address indexed user, uint256 timestamp);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(MODERATOR_ROLE, msg.sender);
    }

    /**
     * @dev Register a new user
     * @param user Address of the user to register
     * @param metadata IPFS hash of user metadata
     */
    function registerUser(address user, string memory metadata) 
        external 
        onlyRole(ADMIN_ROLE) 
        whenNotPaused 
    {
        require(!users[user].isActive, "User already registered");
        
        users[user] = User({
            isActive: true,
            lastLogin: block.timestamp,
            createdAt: block.timestamp,
            metadata: metadata
        });

        _grantRole(USER_ROLE, user);
        _userCount.increment();

        emit UserRegistered(user, block.timestamp);
    }

    /**
     * @dev Deactivate a user
     * @param user Address of the user to deactivate
     */
    function deactivateUser(address user) 
        external 
        onlyRole(ADMIN_ROLE) 
        whenNotPaused 
    {
        require(users[user].isActive, "User not active");
        
        users[user].isActive = false;
        _revokeRole(USER_ROLE, user);

        emit UserDeactivated(user, block.timestamp);
    }

    /**
     * @dev Reactivate a user
     * @param user Address of the user to reactivate
     */
    function reactivateUser(address user) 
        external 
        onlyRole(ADMIN_ROLE) 
        whenNotPaused 
    {
        require(!users[user].isActive, "User already active");
        
        users[user].isActive = true;
        _grantRole(USER_ROLE, user);

        emit UserReactivated(user, block.timestamp);
    }

    /**
     * @dev Update user metadata
     * @param user Address of the user
     * @param metadata New IPFS hash of user metadata
     */
    function updateUserMetadata(address user, string memory metadata) 
        external 
        onlyRole(ADMIN_ROLE) 
        whenNotPaused 
    {
        require(users[user].isActive, "User not active");
        
        users[user].metadata = metadata;

        emit UserMetadataUpdated(user, metadata);
    }

    /**
     * @dev Record user login
     * @param user Address of the user
     */
    function recordLogin(address user) 
        external 
        onlyRole(USER_ROLE) 
        whenNotPaused 
    {
        require(users[user].isActive, "User not active");
        
        users[user].lastLogin = block.timestamp;

        emit UserLoggedIn(user, block.timestamp);
    }

    /**
     * @dev Get total number of registered users
     */
    function getTotalUsers() external view returns (uint256) {
        return _userCount.current();
    }

    /**
     * @dev Pause the contract
     */
    function pause() external onlyRole(ADMIN_ROLE) {
        _pause();
    }

    /**
     * @dev Unpause the contract
     */
    function unpause() external onlyRole(ADMIN_ROLE) {
        _unpause();
    }
} 