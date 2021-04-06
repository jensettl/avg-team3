const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("stockExchange.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const stockExchangePackage = grpcObject.stockExchangePackage;

const client = new stockExchangePackage.CustomerService("localhost:50051", grpc.credentials.createInsecure());

// Client Aufruf mit Parameter
const text = process.argv[2];

client.getStockExchangeInfo(
    {
        "tradeNr": text
    },
    (err, response) => {
        console.log("Received from Server " + JSON.stringify(response))
});