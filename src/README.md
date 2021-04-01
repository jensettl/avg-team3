## Anwendungsbeispiel

> Ein Client kann beim Server eine Information zu einem Börsengeschäft mit einer Trade-Nr anfragen (Unary RPC).  
> Ein Client kann beim Server alle Trades anfragen, die von jetzt
bis in x Minuten getätigt werden. Der Server liefert einen
Stream von Informationen zu den einzelnen Börsengeschäften
zurück.  
>> Erstellt eine entsprechende Schnittstellenbeschreibung und
implementiert Client und Server.  
>> Simuliert notwendige Logik, so dass unterschiedliche Situationen
(erfolgreiche Anfrage, Ausnahme) durchgeführt werden können.

```js
//Beispiel einer Proto-Datei für das Anwendungsbeispiel
service Customer {
    // Unary Call
    rpc GetStockExchangeInfo (StockExchangeLookupModel) returns (StockExchangeModel)
    // server side streaming
    rpc GetTradesUntil (NewCustomerRequest) returns (stream StockExchangeModel)
}

message StockExchangeLookupModel {
    int32 tradeNr = 1;
}

message StockExchangeModel {

}

message NewCustomerRequest {

}
```
