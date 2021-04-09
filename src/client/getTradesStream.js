const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("../stockExchange.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const stockExchangePackage = grpcObject.stockExchangePackage;

const client = new stockExchangePackage.CustomerService("localhost:50051", grpc.credentials.createInsecure());

// Zeitdauer wird als Parameter beim Aufruf mitgeliefert
const zeit = process.argv[2];

const call = client.getTrades({
    "zeit": zeit
});

// Wenn Daten in Form von JSON vom Server kommen werden diese im Terminal ausgegeben
call.on("data",item => {
    console.log("received item from server" + JSON.stringify(item));
})

// Wenn der Server das Ende ankündigt, wird das im Terminal ausgegeben.
call.on("end", e => console.log("server done!"))