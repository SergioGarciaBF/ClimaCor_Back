//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DeviceRegistry {
    struct Device {
        //Structure to store device information
        string owner;
        bool registered;
    }

    //Mapping device IDs to your information
    mapping(string => Device) private devices;

    //Event to emit when a device is registered 
    event DeviceRegistered(string deviceId);

    //Function for registering a new device
    function registerDevice(string memory _deviceId, string memory _owner) public {
        require(!devices[_deviceId].registered, "Device is already registered");

        devices[_deviceId] = Device({
            owner: _owner,
            registered: true
        });

        emit DeviceRegistered(_deviceId);
    }
    
    //Function to check the authentication of a device
    function authenticateDevice(string memory _deviceId, string memory _owner, bytes32 messageHash, bytes memory signature) public view returns (bool) {
        require(devices[_deviceId].registered, "Device is not registered");

        //Ethereum Signed Message
        bytes32 signedMessageHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));

        //Retrieves the subscriber's address
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(signature);
        address signer = ecrecover(signedMessageHash, v, r, s);

        //Checks that the recovered address is the same as that of the device owner
        return 
            keccak256(abi.encodePacked(devices[_deviceId].owner)) == 
            keccak256(abi.encodePacked(_owner)) && 
            signer == msg.sender;
    }

    //Function to splits the signature into v, r and s, expected by the ECDSA algorithm
    function splitSignature(bytes memory sig) internal pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65);

        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
        return (r, s, v);
    }

    //Function to check if a device is registered
    function isDeviceRegistered(string memory _deviceId) public view returns (bool) {
        return devices[_deviceId].registered;
    }
}
