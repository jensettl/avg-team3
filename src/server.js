const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("stockExchange.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const stockExchangePackage = grpcObject.stockExchangePackage;

const server = new grpc.Server();
server.bind("0.0.0.0:50051",grpc.ServerCredentials.createInsecure());

server.addService(stockExchangePackage.CustomerService.service, 
    {
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

function getStockExchangeInfo (call, callback){
    console.log(call.request);
    
    if(call.request.tradeNr > tradeItems.length) 
    {
        callback(new Error("Argument of type number is expected."));
        return;
    }
        
    callback(null, tradeItems[call.request.tradeNr - 1]);
}