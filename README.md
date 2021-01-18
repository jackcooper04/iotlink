# IOT Link
## An NPM Package For IOT Link control

# Setup
Install and Setup IOT Link [Here](https://iotlink.gitlab.io/)


```
npm install iotlink --save
```


# Commands
```javascript
const iotLink = require('iotlink');
iotLink.initialize({host:"MQTTIP",port:1883,username:null,password:null},'MyPC')

```
If You leave the object empty it will attempt to grab information from the configuartion file from IOTLink otherwise it will throw an error. If you leave the device name blank it will default to the current device name.
## Send Notification
```javascript
iotLink.sendNotification('Title Of Message','Contents Of Message')
```
## Computer Controls
```javascript
//Lock
iotLink.lockComputer()
//Shutdown
iotLink.shutdownComputer()
//Reboot
iotLink.rebootComputer()
//Log Off
iotLink.logOffComputer()
//Hibernate
iotLink.hibernateComputer()
```
## Media Controls
```javascript
//Play / Pause
iotLink.toggleMedia()
//Stop
iotLink.stopMedia()
//Next
iotLink.nextSong()
//Previous
iotLink.previousSong()
```

## Other
```javascript
//Toggle Display State can be on or off
iotLink.toggleDisplay('state');
//Open Application 
iotLink.openApplication('path')
```
Path needs to be full path to application for example:
C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe