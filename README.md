# IOT Link
## A NPM Package For IOT Link control

#Setup
Install and Setup IOT Link [Here](https://iotlink.gitlab.io/)


```
npm install iotlink-client --save
```
If you have IOT Link installed and setup the package will grab MQTT credentials from the configuartion.yaml file this means there is no need to input credentials in your project.

#Commands
```javascript
const iotLink = require('iotlink-client');
```

##Send Notification
```javascript
iotLink.sendNotification('Title Of Message','Contents Of Message')
```
##Computer Controls
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
##Media Controls
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

##Other
```javascript
//Toggle Display State can be on or off
iotLink.toggleDisplay('state');
//Open Application 
iotLink.openApplication('path')
```
Path needs to be full path to application for example:
C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe