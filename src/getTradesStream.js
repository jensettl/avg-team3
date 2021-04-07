const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("stockExchange.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const stockExchangePackage = grpcObject.stockExchangePackage;

const client = new stockExchangePackage.CustomerService("localhost:50051", grpc.credentials.createInsecure());

const zeit = process.argv[2];

const call = client.getTrades({
    "zeit": zeit
});
call.on("data",item => {
    // sleep(2000).then(() => { console.log("received item from server" + JSON.stringify(item)); });
    console.log("received item from server" + JSON.stringify(item));
})

call.on("end", e => console.log("server done!"))