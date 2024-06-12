const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const expressWs = require('express-ws')(app);

const corsOption = {
  origin: '*',
}
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const monitoring_basic = {
  serialnum: '6908 1117 0108',
  fwversion_router: '3.5.9',
  load_average: ['0.01', '0.13', '0.12'],
  ip: '10.87.255.10',
  ap_linking: 5,
  adhoc_linking: 3,
}
const monitoring_power = {
  currtime: 58822766,
  uout: 5369,
  iout: 854,
  uacc: 3482,
  iacc: 0,
  uf1: 59505,
  if1: 131,
  uf2: 0,
  if2: 0,
  protocolver: '0005',
  charge: 100,
  accumact: 0,
  positioning_module: true,
}
const monitoring_lan = [
  {
    id: 1,
    name_port: 'eth0.1',
    mac_addr: '9C:1D:58:63:27:6D',
    ip_addr: '10.87.252.19',
    tx: Math.random(),
    rx: Math.random(),
    link: true,
  },
  {
    id: 2,
    name_port: 'eth0.2',
    mac_addr: '9C:1D:58:63:27:6D',
    ip_addr: '10.87.252.20',
    tx: Math.random(),
    rx: Math.random(),
    link: true,
  },
  {
    id: 3,
    name_port: 'eth0.3',
    mac_addr: '9C:1D:58:63:27:6D',
    ip_addr: '192.168.87.19',
    tx: Math.random(),
    rx: Math.random(),
    link: false,
  },
  {
    id: 3,
    name_port: 'eth0.4',
    mac_addr: '9C:1D:58:63:27:6D',
    ip_addr: '192.168.87.20',
    tx: Math.random(),
    rx: Math.random(),
    link: true,
  },
]

const monitoring_wlan = [
  {
    id: 1,
    name_port: 'wlan0',
    mac_addr: '00:1f:04:81:57:0a',
    ip_addr: '10.87.10.1',
    tx: Math.random(20000),
    rx: Math.random(20000),
    link: true,
  },
  {
    id: 2,
    name_port: 'wlan1',
    mac_addr: '00:1f:04:82:57:0a',
    ip_addr: '10.87.254.19',
    tx: Math.random(20000),
    rx: Math.random(20000),
    link: true,
  },
]

const ping_data = {
  ping: true
}

const access_point_data = [
  {
    id: 1,
    mac_addr: '00:1F:04:00:06:89',
    power_level: -40,
  },
  {
    id: 2,
    mac_addr: '00:1F:04:00:06:90',
    power_level: -50,
  },
  {
    id: 3,
    mac_addr: '00:1F:04:00:06:91',
    power_level: -60,
  },
]

const adhoc_data = [
  {
    id: 1,
    mac_addr: '00:1f:04:82:57:7D',
    host_number_byte: 125,
    power_level: -53,
  },
  {
    id: 2,
    mac_addr: '00:02:72:74:34:d0',
    host_number_byte: 125,
    power_level: -53,
  },
  {
    id: 3,
    mac_addr: '00:1f:04:82:57:7C',
    host_number_byte: 125,
    power_level: -53,
  },
]

const dhcp_data = [
  {
    id: 1,
    mac_addr: '00:1F:04:00:06:89',
    host_name: 'Light_uo',
    ip_addr: '10.87.10.2',
    link: true,
  },
  {
    id: 2,
    mac_addr: '00:1F:04:00:06:90',
    host_name: 'Light_uo',
    ip_addr: '10.87.10.3',
    link: true,
  },
  {
    id: 3,
    mac_addr: '00:1F:04:00:06:40',
    host_name: 'Light_uo',
    ip_addr: '10.87.10.4',
    link: true,
  },
  {
    id: 4,
    mac_addr: 'd0:17:c2:4c:de:cb',
    host_name: 'android',
    ip_addr: '10.87.10.5',
    link: false,
  },
]

app.get('/monitoring/basic', cors(corsOption),  (req, res) => {
  res.send(monitoring_basic);
});
app.get('/monitoring/power', cors(corsOption),  (req, res) => {
  res.send(monitoring_power);
});
app.get('/monitoring/lan', cors(corsOption),  (req, res) => {
  res.send(monitoring_lan);
});
app.get('/monitoring/wlan', cors(corsOption),  (req, res) => {
  res.send(monitoring_wlan);
});
app.get('/additional/access', cors(corsOption),  (req, res) => {
  res.send(access_point_data);
});
app.get('/additional/adhoc', cors(corsOption),  (req, res) => {
  res.send(adhoc_data);
});
app.get('/additional/dhcp', cors(corsOption),  (req, res) => {
  res.send(dhcp_data);
});

app.post('/auth', (request, response) => {
  if (request.body.user_name == 'admin' && request.body.password == 'admin') {
    response.send('user=admin');
  } else {
    response.send(false);
  }
})
app.post('/settings', (request, response) => {

  for (let i = 0; i < monitoring_lan.length; i++) {
    if (monitoring_lan[i].name_port == JSON.parse(request.body.data[0][i]).name) {
      monitoring_lan[i].ip_addr = JSON.parse(request.body.data[0][i]).ip_addr;
    }
  }
  for (let i = 0; i < monitoring_wlan.length; i++) {
    if (monitoring_wlan[i].name_port == JSON.parse(request.body.data[1][i]).name) {
      monitoring_wlan[i].ip_addr = JSON.parse(request.body.data[1][i]).ip_addr;
    }
  }
  response.send('ok!');
})

app.ws('/echo', function(ws, req) {
  ws.on('message', function() {
    ws.send(JSON.stringify(ping_data));
  })
})

app.ws('/lan', function(ws, req) {
  ws.on('message', function() {
    ws.send(JSON.stringify(monitoring_lan));
  })
})
app.ws('/wlan', function(ws, req) {
  ws.on('message', function() {
    ws.send(JSON.stringify(monitoring_wlan));
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})