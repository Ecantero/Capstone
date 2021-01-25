@echo off

cd back-end
start db.bat
node index.js
cd .. 
cd front-end
ng serve