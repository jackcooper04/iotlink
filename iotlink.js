var mqtt = require("mqtt");
const yaml = require('js-yaml')
const fs = require('fs');
const os = require('os');
const path = require('path')
var deviceName = os.hostname().toLowerCase();
var uri = 'iotlink/workgroup/' + deviceName

//var options = require('./mqtt-options.json');
var client = "hello"
function initialize(mqtt_data) {
    var fileContents
    if (mqtt_data == undefined || mqtt_data.host == undefined) {
        const fileLocation = path.join(process.env.PROGRAMDATA, 'IOTLink\\Configs\\configuration.yaml');
        try {
            const data = fs.readFileSync(fileLocation, 'utf-8')
            var fileContents = data;
        } catch (err) {
            console.error('Error: Configuration File Not Found Please Ensure that IOT Link is installed or provide MQTT Data manually please check Docs for more details')
        }

        //console.log(fileContents)
        var data = yaml.load(fileContents);
        var options = {
            "port": data.mqtt.tcp.port,
            "host": "mqtt://" + data.mqtt.tcp.hostname,

            "username": data.mqtt.credentials.username,
            "password": data.mqtt.credentials.password,

            "keepalive": 60,
            "reconnectPeriod": 1000,
            "protocolId": "MQIsdp",
            "protocolVersion": 3,
            "clean": true,
            "encoding": "utf8"
        }
        //console.log(options) 
    } else {
        // console.log('gothere')
        var options = {
            "port": mqtt_data.port,
            "host": "mqtt://" + mqtt_data.host,
            "username": mqtt_data.username,
            "password": mqtt_data.password,
            "keepalive": 60,
            "reconnectPeriod": 1000,
            "protocolId": "MQIsdp",
            "protocolVersion": 3,
            "clean": true,
            "encoding": "utf8"
        }
        //console.log(options)
    };
    var error = false;
    return options;
    /* var client = mqtt.connect(options.host, options);
    client.on('error', function (err) {
        checkStatus(true)
        error = true;
        //client.end();
       

    })
    
        client.on('connect', function (err) {
          //  console.log(err)
            //checkStatus(false)
        }) */

    //console.log(client)

}

var errorStore = false;
function checkStatus(state) {

    if (state) {
        // console.log('error')
        console.error("Error: MQTT Details Invalid")
        process.exit();

    } else {
        console.log('pass')
    }
}
module.exports = {
    initialize: function (mqtt_data,name) {
        options = initialize(mqtt_data);
        if (name != undefined || name != ''){
            deviceName = name.toLowerCase();
            uri = 'iotlink/workgroup/' + deviceName
        } else {
            console.log('hello1')
            deviceName = os.hostname().toLowerCase();
            uri = 'iotlink/workgroup/' + deviceName
        }
        if (name == ''){
            deviceName = os.hostname().toLowerCase();
            uri = 'iotlink/workgroup/' + deviceName
        }
       
        client = mqtt.connect(options.host, options);
        client.on('error', function (err) {
            checkStatus(true)
            error = true;
            //client.end();


        })

        client.on('connect', function (err) {
            //  console.log(err)
            //checkStatus(false)
        })
    },
    setDevice:function(name){
      
    },
    sendNotification: function (title, message) {
        //console.log(deviceName)
        //console.log(options)
        var data = {
            title: title,
            message: message
        };
        client.publish(uri + '/commands/notify', JSON.stringify(data));
    },
    lockComputer: function () {
        client.publish(uri + '/commands/lock');
    },
    shutdownComputer: function () {
        client.publish(uri + '/commands/shutdown');
    },
    rebootComputer: function () {
        client.publish(uri + '/commands/reboot');
    },
    hibernateComputer: function () {
        client.publish(uri + '/commands/hibernate');
    },
    logOffComputer: function () {
        client.publish(uri + '/commands/logoff');
    },
    toggleMedia: function () {
        client.publish(uri + '/commands/media/playpause');
    },
    stopMedia: function () {
        client.publish(uri + '/commands/media/stop');
    },
    nextSong: function () {
        client.publish(uri + '/commands/media/next');
    },
    previousSong: function () {
        client.publish(uri + '/commands/media/previous');
    },
    toggleDisplay: function (state) {
        state.toLowerCase();
        if (state == "on" || state == "off") {
            client.publish(uri + '/commands/displays/' + state);
        }

    },
    openApplication: function (path) {
        var pathArray = path.split("\\");
        pathArray.pop();
        var pathString = pathArray.join("\\")
        var body = {
            command: path,
            args: "",
            path: pathString,
            user: "",
            visible: true,
            fallback: true
        };
        client.publish(uri + '/commands/run', JSON.stringify(body));
    }
}





