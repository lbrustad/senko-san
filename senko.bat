echo off
cls
title SenkoBot
echo  ######  ######## ##    ## ##    ##  #######           ######     ###    ##    ## 
echo ##    ## ##       ###   ## ##   ##  ##     ##         ##    ##   ## ##   ###   ## 
echo ##       ##       ####  ## ##  ##   ##     ##         ##        ##   ##  ####  ## 
echo  ######  ######   ## ## ## #####    ##     ## #######  ######  ##     ## ## ## ## 
echo       ## ##       ##  #### ##  ##   ##     ##               ## ######### ##  #### 
echo ##    ## ##       ##   ### ##   ##  ##     ##         ##    ## ##     ## ##   ### 
echo  ######  ######## ##    ## ##    ##  #######           ######  ##     ## ##    ## 
nodemon senkoCore.js
pause
rem if (console.error);
rem return console.log(`An Error has occured`);