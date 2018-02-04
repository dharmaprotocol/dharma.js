// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let filesystem = {};

const mockFilesystem = (mockedFilesystem: object) => {
    filesystem = mockedFilesystem;
}

const readFile = (path: string, encoding: string): Promise<string> => {
    if (path in filesystem) {
        return filesystem[path];
    } else {
        throw new Error("Couldn't read file");
    }
}

export { mockFilesystem, readFile };
