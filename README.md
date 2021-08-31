## Installation
1. Download and install [NodeJS 14.17.1](https://nodejs.org/en/)
2. Download this repo via `git clone https://github.com/dhens/Imperium.git` or download the .zip file.
3. Navigate to project folder and open a terminal in it's directory.
4. Run `npm start` to start the web and socket servers.
5. Run a socket client of your choice to connect to your local machines IP on port 11111.

##

## Overview
 Visualize and manage multiple remote clients via Node CLI and an HTML5 dashboard. The client software I'm developing in tandem with the dashboard is not available, you need to build your own client to properly interface with the server. This should be easy to do if you can understand the socket server code.

## Goals
 * We want a robust management dashboard with a clean and rich user interface. 
 * Minimum external dependencies. The only production dependency is the `ws` package.
 * A limited attack surface. 
  * The web dashboard is only accessible from the local loopback network on the machine it runs on.

## TODO


* COMPLETE 
  * ~~Render connected clients properly even after reloading dashboard. Do this by checking for server data on page load.~~
