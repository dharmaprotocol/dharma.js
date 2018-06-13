export const Dharma = jest.fn().mockImplementation(() => {
    return {
        sign: jest.fn().mockImplementation(() => {
            // STUB.
        }),
        order: jest.fn().mockImplementation(() => {
            // STUB.
        }),
        contracts: jest.fn().mockImplementation(() => {
            // STUB.
        }),
        adapters: jest.fn().mockImplementation(() => {
            // STUB.
        }),
        servicing: jest.fn().mockImplementation(() => {
            // STUB.
        }),
        token: jest.fn().mockImplementation(() => {
            // STUB.
        }),
        blockchain: jest.fn().mockImplementation(() => {
            // STUB.
        }),
        logs: jest.fn().mockImplementation(() => {
            // STUB.
        }),
    };
});
