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

const tradeItems = require("./tradeItems.json")

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
    
    if(call.request.tradeNr > tradeItems.length) 
    {
        callback(new Error("Argument of type number is expected."));
        return;
    }
        
    callback(null, tradeItems[call.request.tradeNr - 1]);
}

function getTrades (call, callback) {
    tradeItems.forEach(t => call.write(t));
    call.end();
}