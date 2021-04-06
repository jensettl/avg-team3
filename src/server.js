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



function getStockExchangeInfo (call, callback){
    console.log(call.request);
    const tradeItem = {
        "id" : call.request.tradeNr,
        "name" : "test1",
        "typ" : "Wertpapier",
        "wert" : 12.5
    }
    callback(null, tradeItem)
}