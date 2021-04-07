const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("stockExchange.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const stockExchangePackage = grpcObject.stockExchangePackage;

const client = new stockExchangePackage.CustomerService("localhost:50051", grpc.credentials.createInsecure());

// Client Aufruf mit Parametern für Name Typ und Wert
// Index wird automatisch bestimmt
const text = process.argv[2];
const text2 = process.argv[3];
const text3 = process.argv[4];

// Client liefert ein TradeObjekt welches der Server erstellen soll
// Als Response erhält er das fertige JSON Objekt mit der ermittelten ID
client.createStockExchange({
    "id": -1,
    "name": text,
    "typ": text2,
    "wert": text3
}, (err, response) => {

    console.log("Received from Server " + JSON.stringify(response))

});