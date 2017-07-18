/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define(['jquery', 'mcsconfig', 'mcs'], function ($, mcsconfig, mcs) {
    function MobileBackend() {
        var self = this;

        self.mobileBackend = null;
        self.isAdmin = false;

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
                        resolve();
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
        self.isAuthorized = function () {
            return self.mobileBackend.Authorization.getIsAuthorized();
        };

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
