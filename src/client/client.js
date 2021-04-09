const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("../stockExchange.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const stockExchangePackage = grpcObject.stockExchangePackage;

const client = new stockExchangePackage.CustomerService("localhost:50051", grpc.credentials.createInsecure());

// Client Aufruf mit Parameter
// changeType: bestimmt ob Unary Call oder ServerSide Streaming
const changeType = process.argv[2];
const text = process.argv[3];

// case1: unary call
// case2: server side streaming
switch(changeType){
    case "1": 
        client.getStockExchangeInfo(
            {
                "tradeNr": text
            },
            (err, response) => {
                console.log("Received from Server " + JSON.stringify(response))
        });
        break;
    case "2":
        const call = client.getTrades();
            call.on("data",item => {
                console.log("received item from server" + JSON.stringify(item));
            })

            call.on("end", e => console.log("server done!"))    
}




