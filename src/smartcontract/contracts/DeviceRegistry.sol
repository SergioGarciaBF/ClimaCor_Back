//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DeviceRegistry {
    struct Device {
        //Structure to store device information
        address owner;
        bool registered;
    }

    //Mapping device IDs to your information
    mapping(string => Device) private devices;

    //Event to emit when a device is registered 
    event DeviceRegistered(string deviceId);

    //Function for registering a new device
    function registerDevice(string memory deviceId, address owner) public {
        require(!devices[deviceId].registered, "Device is already registered");

        devices[deviceId] = Device({
            owner: owner,
            registered: true
        });

        emit DeviceRegistered(deviceId);
    }
    
    //Function to check the authentication of a device
    function authenticateDevice(string memory deviceId, address owner) public view returns (bool) {
        //require(msg.sender == owner, "Not authorized");
        require(tx.origin == owner, "Not authorized");
        require(devices[deviceId].registered, "Device is not registered");

        // return 
        //    keccak256(abi.encodePacked(devices[deviceId].owner)) == 
        //    keccak256(abi.encodePacked(owner));
        return devices[deviceId].owner == owner;
    }

    //Function to check if a device is registered
    function isDeviceRegistered(string memory deviceId) public view returns (bool) {
        return devices[deviceId].registered;
    }
}
