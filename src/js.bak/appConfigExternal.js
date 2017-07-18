/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
// app configuration for public release

define([], function () {
  return {
    appId: 'com.jet.FixItFast',
    appVersion: '3.0',
    // ReadOnly MBE
    backendName: 'fixitfastclient',
    backendUrl: 'https://mcsoraclejet-busanuniv.mobileenv.us2.oraclecloud.com:443',
    backendHeaders: {
      'Oracle-Mobile-Backend-Id': '6bc24297-621c-4242-856b-d6efd8f27d67',
      'Authorization': 'Basic QlVTQU5VTklWX01DU09SQUNMRUpFVF9NT0JJTEVfQU5PTllNT1VTX0FQUElEOmg5dC5Ra2w0Y3l6bmZv'
    },
    registrationUrl: 'https://mcssvc1dev-mcsidd1.mobileenv.us2.oraclecloud.com:443/mobile/platform/devices/register',
    senderID: 'XXXXXXX' // Where the XXXXXXX maps to the project number in the Google Developer Console.
  }
})
