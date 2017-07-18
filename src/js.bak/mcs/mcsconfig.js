/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['jquery', 'mcs'], function($, mcs) {

    var mcsConfig = {
        "logLevel": mcs.logLevelInfo,
        "mobileBackends": {
            "KAL_MBE": {
                "default": true,
                "baseUrl": "https://mcsoraclejet-busanuniv.mobileenv.us2.oraclecloud.com:443",
                "applicationKey": "",
                "authorization": {
                    "basicAuth": {
                      "backendId": "6bc24297-621c-4242-856b-d6efd8f27d67",
                      "anonymousToken": "QlVTQU5VTklWX01DU09SQUNMRUpFVF9NT0JJTEVfQU5PTllNT1VTX0FQUElEOmg5dC5Ra2w0Y3l6bmZv"
                    },
                    "oAuth": {
                      "clientId": "",
                      "clientSecret": "",
                      "tokenEndpoint": ""
                    },
                    "facebookAuth":{
                      "facebookAppId": "YOUR_FACEBOOK_APP_ID"
                    },
                    "ssoAuth":{
                      "tokenEndpoint": ""
                    }

                }
            }
        }
    }
    
    
    return mcsConfig;
});
