const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("stockExchange.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const stockExchangePackage = grpcObject.stockExchangePackage;

const server = new grpc.Server();
server.bind("0.0.0.0:50051",grpc.ServerCredentials.createInsecure());

server.addService(stockExchangePackage.CustomerService.service, 
    {
        "createStockExchange": createStockExchange,
        "getStockExchangeInfo": getStockExchangeInfo,
    });
server.start();

const tradeItems = [
    {
        "id":1,
        "name": "beispiel1",
        "typ": "wertpapier",
        "wert": 17.5
    },
    {
        "id": 2, 
        "name": "beispiel2", 
        "typ":"aktie",
        "wert": 21.3
    },
    {
        "id": 3, 
        "name": "beispiel3",
        "typ": "Fond",
        "wert": 121.6
    }
];

function createStockExchange (call, callback) {
    const tradeItem = {
        "id": tradeItems.length + 1,
        "name": call.request.name,
        "typ": call.request.typ,
        "wert": call.request.wert
    }
    tradeItems.push(tradeItem);
    callback(null, tradeItem);
}

function getStockExchangeInfo (call, callback){
    console.log(call.request);
        
    callback(null, tradeItems[call.request.tradeNr - 1]);
}