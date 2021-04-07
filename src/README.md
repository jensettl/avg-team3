# Anwendungsbeispiel

### 0. Aufgabe:
> Ein Client kann beim Server eine Information zu einem Börsengeschäft mit einer Trade-Nr anfragen (Unary RPC).  
> Ein Client kann beim Server alle Trades anfragen, die von jetzt
bis in x Minuten getätigt werden. Der Server liefert einen
Stream von Informationen zu den einzelnen Börsengeschäften
zurück.  
>> Erstellt eine entsprechende Schnittstellenbeschreibung und
implementiert Client und Server.  
>> Simuliert notwendige Logik, so dass unterschiedliche Situationen
(erfolgreiche Anfrage, Ausnahme) durchgeführt werden können.

### 1. Anwendung

* Mit `node .\server.js` kann der gRPC Server lokal gestartet werden.

* Mit `node .\create.js <name> <typ> <wert>` kann ein neuer Trade erstellt werden.

* Mit `node .\getExchangeInfo.js <tradeNr>` kann das JSON Objekt zur entsprechenden TradeNr. geliefert werden.

* Mit `node .\getTradesStream <duration>` können alle Trades in den nächsten Sekunden als Stream geliefert werden. Der Parameter *duration* wird in Sekunden angegeben.

### 2. Proto-Datei

```proto
//Beispiel einer Proto-Datei für das Anwendungsbeispiel
syntax = "proto3";
package stockExchangePackage;

service CustomerService {
    rpc createStockExchange (StockExchangeModel) returns (StockExchangeModel);
    // Unary Call
    rpc getStockExchangeInfo (StockExchangeLookUpModel) returns (StockExchangeModel);
    // Server Streaming
    rpc getTrades (StockExchangeStreamDuration) returns (stream StockExchangeModel);
}

message StockExchangeLookUpModel {
    int32 tradeNr = 1;
}

message StockExchangeStreamDuration {
    int32 zeit = 1;
}

message StockExchangeModel {
    int32 id = 1;
    string name = 2;
    string typ = 3;
    double wert = 4;
}
```
