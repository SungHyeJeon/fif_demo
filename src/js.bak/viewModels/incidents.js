/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'mbe',
    'ojs/ojlistview', 'ojs/ojarraytabledatasource', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojDialog'],
 function(oj, ko, $, app, mbe) {

    function IncidentsViewModel() {
      var self = this;
  //    var self = this;
      self.handleOpen = $("#buttonOpener").click(function() {
          $("#modalDialog1").ojDialog("open"); });

      self.handleOKClose = $("#okButton").click(function() {
          $("#modalDialog1").ojDialog("close");
        });


      self.buttonClick = function(data, event){
        //  self.clickedButton(event.currentTarget.id);
          var url = "FIF_CustomerAPI/incidents" ;

          mbe.invokeCustomAPI(url, "POST", null, function(statusCode, data) {
            console.log("statusCode: ", statusCode);
            console.log("result: ", data);
          }, function(error) {
            console.log("error", error);
          }) ;

          return true;
      }
      self.incidents = ko.observableArray([]);
      self.dataSource = new oj.ArrayTableDataSource(self.incidents, {idAttribute: "Id"})

      // Header Config
      self.headerConfig = {'viewName': 'header', 'viewModelFactory': app.getHeaderModel()};

      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.

      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
      self.handleActivated = function(info) {
        console.log("incidents. handleActivated");
        // Implement if needed

        var url = "FIF_CustomerAPI/incidents?customerId=joe_fif_technician"// + encodeURIComponent (mbe.getUsername());

        mbe.invokeCustomAPI(url, "GET", null, function(statusCode, data) {
          console.log("statusCode: ", statusCode);
          console.log("result: ", data);
          self.incidents(data);
        }, function(error) {
          console.log("error", error);
        }) ;
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View.
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new IncidentsViewModel();
  }
);
