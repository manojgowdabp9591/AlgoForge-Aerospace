const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const { WebSocketServer } = require('ws');

// 1. Boot up the local WebSocket Server
const wss = new WebSocketServer({ port: 8080 });
console.log("🚀 [SYSTEM] WebSocket Server broadcasting on ws://localhost:8080");

// 2. Connect to the Node 3 Ground Station via USB
const portName = 'COM8'; // <--- Verify this matches your Node 3 port
const port = new SerialPort({ path: portName, baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// Map the C++ ENUM numbers to human-readable flight states
const flightStates = ["PAD_IDLE", "BOOST", "COAST", "APOGEE_DESCENT", "LANDED"];

port.on('open', () => {
  console.log(`📡 [RADIO] Connected to Ground Station on ${portName} at 115200 baud`);
});

port.on('error', (err) => {
  console.error(`🔥 [ERROR] Serial Port Error:`, err.message);
});

// 3. Listen for incoming telemetry from the rocket
parser.on('data', (data) => {
  // Check if this is a valid rocket telemetry string from Node 3
  if (data.startsWith('TELEMETRY|')) {
    
    // Clean up the string: "TELEMETRY|0,0.0,1.0,0.0,RSSI:-45,SNR:9.5"
    const rawData = data.replace('TELEMETRY|', '');
    const parts = rawData.split(',');

    if (parts.length >= 6) {
      const stateIndex = parseInt(parts[0]);
      
      // Parse the raw CSV string into a clean JSON object
      const telemetryJson = {
        state: flightStates[stateIndex] || "UNKNOWN",
        altitude: parseFloat(parts[1]), 
        accelZ: parseFloat(parts[2]),
        maxAltitude: parseFloat(parts[3]),
        rssi: parseInt(parts[4].split(':')[1]), 
        snr: parseFloat(parts[5].split(':')[1])   
      };

      // 4. Blast the JSON object to the Next.js dashboard
      const jsonString = JSON.stringify(telemetryJson);
      console.log(`[UPLINK] ->`, jsonString);

      wss.clients.forEach((client) => {
        if (client.readyState === 1) { // 1 means OPEN
          client.send(jsonString);
        }
      });
    }
  } else {
    // Print standard debug messages from the ESP32
    console.log(`[ESP32] ${data}`);
  }
});
