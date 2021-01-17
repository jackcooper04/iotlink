var mqtt = require("mqtt");
const yaml = require('js-yaml')
const fs = require('fs');
const os = require('os');
const path = require('path')
const deviceName = os.hostname().toLowerCase();
const uri = 'iotlink/workgroup/'+deviceName
const fileLocation = path.join(process.env.PROGRAMDATA,'IOTLink\\Configs\\configuration.yaml');
var fileContents = fs.readFileSync(fileLocation,'utf-8')
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



module.exports = {
    sendNotification:function(title,message){
        var data = {
            title:title,
            message:message
        };
        client.publish(uri+'/commands/notify',JSON.stringify(data));
    },
    lockComputer:function(){
        client.publish(uri+'/commands/lock');
    },
    shutdownComputer:function(){
        client.publish(uri+'/commands/shutdown');
    },
    rebootComputer:function(){
        client.publish(uri+'/commands/reboot');
    },
    hibernateComputer:function(){
        client.publish(uri+'/commands/hibernate');
    },
    logOffComputer:function(){
        client.publish(uri+'/commands/logoff');
    },
    toggleMedia:function(){
        client.publish(uri+'/commands/media/playpause');
    },
    stopMedia:function(){
        client.publish(uri+'/commands/media/stop');
    },
    nextSong:function(){
        client.publish(uri+'/commands/media/next');
    },
    previousSong:function(){
        client.publish(uri+'/commands/media/previous');
    },
    toggleDisplay:function(state){
        state.toLowerCase();
        if (state == "on" || state == "off"){
            client.publish(uri+'/commands/displays/'+state);
        }
        
    },
    openApplication:function(path){
        var pathArray = path.split("\\");
        pathArray.pop();
        var pathString = pathArray.join("\\")
        var body = {
            command:path,
            args:"",
            path:pathString,
            user:"",
            visible:true,
            fallback:true
        };
        client.publish(uri+'/commands/run',JSON.stringify(body));
    }
}





