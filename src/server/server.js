// Notwendige Module laden und mit protoLoader die .proto Datei laden
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("stockExchange.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const stockExchangePackage = grpcObject.stockExchangePackage;

const server = new grpc.Server();
server.bind("0.0.0.0:50051",grpc.ServerCredentials.createInsecure());

// Services die in der Protodatei definiert wurden spezifizieren und Funktionen zuordnen.
server.addService(stockExchangePackage.CustomerService.service, 
    {
        "createStockExchange": createStockExchange,
        "getStockExchangeInfo": getStockExchangeInfo,
        "getTrades": getTrades   
    });
server.start();

// Trades-Datenbank als JSON Array laden
const tradeItems = require("./tradeItems.json")

/* 
 * Funktion um einen Trade mit den angegebenen Parametern zu erzeugen.
 * callback liefert das erzeugte TradeItem zurück
 */
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

/*
 * Funktion um das Objekt zur TradeNr aus dem Parameter zu erhalten
 * callback liefert das StockExchangeItem aus dem JSON Array zurück
 */
function getStockExchangeInfo (call, callback){
    console.log(call.request);
    
    if(call.request.tradeNr > tradeItems.length) 
    {
        console.error("Börsengeschäft mit der angegebenen Trade-Nr existiert nicht!")
        // callback(new Error("Argument of type number is expected."));
        return;
    }
        
    callback(null, tradeItems[call.request.tradeNr - 1]);
}

/*
 * Funktion liefert alle Trades in einer gewissen Zeitspanne, die im Parameter mit angegeben wurde
 * Nach einer bestimmten Zeit x beendet sich der Stream.
 */
function getTrades (call, callback) {

    var anz = tradeItems.length + 1;
    var arrayTyp = new Array("Aktie","Wertpapier","Fond");
    var randTime = Math.random() * (2000 - 200) + 200;

    var zeit = call.request.zeit * 1000;
    var zähler = 0;


    var interval1 = setInterval(function(){
        if(zähler > zeit){
            clearInterval(interval1);
            call.end();
        }

        zähler = zähler + randTime;

        var randName = Math.random().toString().substr(2,8);
        var randTyp = Math.floor(Math.random() * 3 + 0);
        var randWert = Math.floor(Math.random() * (5000 - 1)) + 1;   
        const tradeItem = {
            "id": anz,
            "name": randName,
            "typ": arrayTyp[randTyp],
            "wert": randWert
        }
    
        anz = anz +1;
    
        call.write(tradeItem);
    },  randTime);
}
