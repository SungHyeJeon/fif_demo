/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define(['jquery', 'knockout', 'mcsconfig',  'mcs'], function ($, ko, mcsconfig, mcs) {
    function MobileBackend() {
        var self = this;

        self.mobileBackend = null;
        self.isAdmin = false;
        self.appConfig =  ko.observable(); //{ "beauty": "SungHye.Jeon" };
        //self.appConfig =  { "beauty": "SungHye.Jeon" };

        (function() {
            mcs.MobileBackendManager.setConfig(mcsconfig);
            self.mobileBackend = mcs.MobileBackendManager.getMobileBackend('KAL_MBE');
            self.mobileBackend.setAuthenticationType("basicAuth"); // basicAuth, oAuth, ssoAuth
        }());

        self.authenticate = function(username, password) {
            return new Promise(function(resolve, reject) {
                self.mobileBackend.Authorization.authenticate(username, password, // basicAuth, oAuth
                //self.mobileBackend.Authorization.authenticate(//username, password, // ssoAuth
                    function(response, data){
                        //console.log(JSON.stringify(data));

                        //
                        self.mobileBackend.loadAppConfig(function(statusCode, appConfig) {
                            console.log("statusCode", statusCode);
                            //self.appConfig = Object.assign(self.appConfig, appConfig);
                            //console.log("appConfig", self.appConfig);

                            self.appConfig(appConfig);
                            console.log("appConfig", self.appConfig());

                            self.checkIsAdmin().then(function(_isAdmin) {
                                console.log("_isAdmin", _isAdmin);
                                self.isAdmin = _isAdmin;
                                resolve();
                            }, function(error) {
                                reject(error);
                            }) ;


                        }, function(error) {
                            console.error("failed to load appConfig");
                            reject(error);
                        });

                    },
                    function(error) {
                        //console.log(error);
                        reject(error);
                    });
            });

        };

        self.logout = function () {
            return new Promise(function(resolve, reject) {
                try {
                    self.mobileBackend.Authorization.logout();
                    resolve();
                } catch(e) {
                    reject(e);
                }
            });
        };

        self.checkIsAdmin = function() {
            return new Promise(function(resolve, reject) {
                var url = "FIF_CustomerAPI/dashboard";

                self.invokeCustomAPI(url, "GET", null, function(statusCode, data) {
                    console.log("This user is able to access **Dashboard api** ");

                    resolve(true);

                }, function(error) {
                    console.log("error", error);
                    resolve(false);
                }) ;
            });
        };

        self.isAuthorized = function () {
            return self.mobileBackend.Authorization.getIsAuthorized();
        };

        self.logEvent = function(name, properties){

          var analytics = self.mobileBackend.Analytics;
          analytics.startSession();
          var event = new mcs.AnalyticsEvent();
          event.name = name;
          event.properties = properties;
          console.log("properties : " , properties);
          console.log("name : " , name);

          analytics.logEvent(event);
          analytics.endSession(function(){
            console.log("Analytics successCallback")
          }, function(statusCode, message){
            console.log("Analytics failed ", statusCode, message);
          });

        }
        self.getUsername = function () {
            return self.mobileBackend.Authorization.getAuthorizedUserName();
        };

        self.getAccessToken = function() {
            return self.mobileBackend.Authorization.getAccessToken();
        }

        self.getAuthorizedUserName = function () {
            return self.mobileBackend.Authorization.authorizedUserName;
        };

        self.invokeCustomAPI = function (path, method, data, successCallback, errorCallback) {
            var jsonData = null;
            if (data != null && data.length>0)
            {
                jsonData = JSON.parse(data);

            }
            self.mobileBackend.CustomCode.invokeCustomCodeJSONRequest(path, method, jsonData, successCallback, errorCallback);
        };
    }
    return new MobileBackend();
 });
