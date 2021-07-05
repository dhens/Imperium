"use strict";
const webSocket = new WebSocket("ws://127.0.0.1:8888");

webSocket.onopen = () => {
    webSocket.send("Connected to web dashboard.");
}

webSocket.onmessage = (event) => {
    if (event.data.slice(0,11) === "clientCount") {
        updateClientCount(event.data.split(" ")[1]);
    }

    console.log("Received:",event.data);
}

// When input is submitted for a connected client, send the command as a json object
// e.g { client2: pwd }
const sendCommand = (client, command) => {
    webSocket.send(JSON.stringify({ client : command }));
}