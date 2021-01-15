var mqtt = require("mqtt");
const yaml = require('js-yaml')
const fs = require('fs');
const os = require('os');
const deviceName = os.hostname().toLowerCase();
var fileContents = fs.readFileSync('C:\\ProgramData\\IOTLink\\Configs\\configuration.yaml','utf-8')
var data = yaml.load(fileContents);
var options = {
   "port": data.mqtt.tcp.port,
   "host": "mqtt://"+data.mqtt.tcp.hostname,
 
   "username":data.mqtt.credentials.username,
   "password":data.mqtt.credentials.password,
 
   "keepalive": 60,
   "reconnectPeriod": 1000,
   "protocolId": "MQIsdp",
   "protocolVersion": 3,
   "clean": true,
   "encoding": "utf8"
 }
//var options = require('./mqtt-options.json');
var client = mqtt.connect(options.host,options);

client.subscribe("iotlink/workgroup/jackspc/windows-monitor/#",function(){
    client.on('message',function(topic,message,packet){
        //console.log(packet)
    })
})

function showNotification(title,message){
    var data = {
        title:title,
        message:message
    };
    client.publish('iotlink/workgroup/'+deviceName+'/commands/notify',JSON.stringify(data));
}
