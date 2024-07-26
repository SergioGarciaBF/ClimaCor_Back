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
    function authenticateDevice(string memory _deviceId, string memory _owner) public view returns (bool) {
        require(devices[_deviceId].registered, "Device is not registered");
        return keccak256(abi.encodePacked(devices[_deviceId].owner)) == keccak256(abi.encodePacked(_owner));
    }

    //Function to check if a device is registered
    function isDeviceRegistered(string memory _deviceId) public view returns (bool) {
        return devices[_deviceId].registered;
    }
}
