export class NetworkError extends Error{
    constructor(message: string) {
        super(message);
        this.name = "NetworkError"
    }
}


export class DataError extends Error{
    //problems with the data itself a missing or invalid field
    // optional, so it can be undefined if no field is passed
    // readonly field?: string;

    constructor(message: string, public readonly field?: string) {
    super(message);
    this.name = "DataError"
}
}