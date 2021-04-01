# AVG-Team3
Dieses Repository wurde für das Modul Anwendung von Geschäftsprozesse erstellt. Es enhält den Code für eine Proo-Datei anhand der ein gRPC-Server generiert wurde. Die Anwendungslogik haben wir auf Basis des Anwendungsfalls entwickelt. Die Anfragen des Clients an den Server sollen sowohl Unary als auch als Stream beantwortet werden können.

Infos zu Erstellung und Bearbeitung einer **Markdown Datei** findet ihr [hier](https://docs.microsoft.com/en-us/azure/devops/project/wiki/markdown-guidance?view=azure-devops).

---

## Github benutzen

Alle Informationen stammen aus dem [GitHub Workshop](https://simonkienzler.github.io/git-workshop/) und sind hier stark zusammengefasst.

### Überprüfe zunächst ob Punkte vorhanden sind.

1. Git für Windows installieren (Die Installation findet ihr auf der offiziellen Website). Alternativ kann mit  `git --version` die aktuelle Version abgefragt werden.

2. Git mit meiner Person vertraut machen mit den Befehlen `git config --global user.name "vorname nachname"` und `git config --global user.email "email@mail.de"`

### Ablauf bei Änderungen

* Mit `git status` kann in der Kommandozeile geprüft werden ob sich etwas verändert hat.

* Mit `git add` können Änderungen für git für einen commit sichtbar gemacht werden.

* Mit `git commit -m "Commit Message"` kann nun ein commit abgesetzt werden.

* Mit `git checkout -b mybranch` kann ... (TODO)

* TODO Pull Request

* Branches

> Diese Schritte sind einfacher mit der Verknüpfung des Repos mit der kostenlosen Software GitHub Desktop ([hier](https://desktop.github.com/)).

---

## GPRC mit Node

Dieser Absatz umreist das gelernte zu gRPC, genaueres findet sich auf der offiziellen Website [grpc.io]([grpc.io](https://grpc.io/docs/languages/node/quickstart/)).

Im Order /protos befindet sich eine **Protobuf** Datei die Struktur des Services mit all seinen Funktionen definiert.

```js
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}
  rpc SayHelloAgain (HelloRequest) returns (HelloReply) {}
}
```

>Den Language Guide zu proto3 findet ihr [hier](https://developers.google.com/protocol-buffers/docs/proto3).

* Mit `node server.js` kann der Server aus dem Terminal gestartet werden

* Mit `node client.js` kann der Aufruf des Clients auf den Server gestartet werden.

* Mit dem Aufruf des Protobuf Compiler `protoc --proto_path=protos --proto_path=third_party --js_out=library=gen,binary:. protos/<protoDateiName>.proto` kann aus der proto-Datei die Basis für den Server als JavaScript Code generiert werden.