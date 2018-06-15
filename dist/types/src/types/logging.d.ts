export declare namespace Logging {
    const LOG_ERROR_NAME = "LogError";
    const ERROR_ID = "_errorId";
    type Entries = Entry[];
    interface Entry {
        name: string;
        events: Event[];
        address: string;
    }
    interface Event {
        name: string;
        type: SolidityType;
        value: string;
    }
    enum SolidityType {
        address = "address",
        uint256 = "uint256",
        uint8 = "uint8",
        uint = "uint",
        bytes32 = "bytes32",
    }
}
