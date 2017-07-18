/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */

define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'mbe','ojs/ojchart', 'ojs/ojselectcombobox', 'ojs/ojinputtext', 'ojs/ojinputnumber'
,'ojs/ojpictochart', 'ojs/ojlegend'],
 function(oj, ko, $, app,mbe) {
    function dashboardViewModel() {

      var pieGroups = ["Group A"];
      var colorHandler = new oj.ColorAttributeGroupHandler();
      var legendItems = [];
      var colors = ["267db3", "47bdef", "6ddbdb", "a2bf39", "fad55c", "ffb54d ", "ed6647", "ed6647"];
var isAdmin = false;
      var self = this;
      self.hello = 'wow';
      var data = {};
      var pieSeries = [];
      var temp = [];
      var string = null;
      var getPictoItems = function (month, monthIndex){
        var pictoItems = [];
        var values = data[month];
        var firstDay = (new Date(2015, monthIndex, 1)).getDay();
        var pointer = 0;
        for (var i = 0; i < values.length; i++) {
          var val = values[i];
          if(pointer < firstDay){
            pictoItems.push({name: '', color: 'rgba(0,0,0,0)'});
            pointer++;
            i--;
          }
          else
            pictoItems.push({name: month+' '+(i+1)+" ("+val+")", color: "#"+colors[Math.floor(val/10)-1]});
        }
        return pictoItems;
      }


       this.tooltipFunction = function (dataContext) {
         return dataContext.name;
       }

      self.handleActivated = function(info) {

      //  console.log(self.hello);

        //TODO :  SET VALUE
        if(isAdmin){
          console.log("this is admin");
          pieSeries = [{name: ": Joe", items: [42]},
                           {name: ": Lauren", items: [55]},
                           {name: ": Komung ", items: [36]},
                           {name: ": Polar", items: [22]},
                           {name: ": PB", items: [22]}];

           temp = ["100-200","200-300","300-400","400-500","500-600","600-700","700-800"];
           data = {
            "January" :  [39,42,42,64,49,22,23,21,33,23,37,39,36,32,35,43,32,42,42,40,36,40,39,39,42,31,30,34,36,38,26],
            "February" :  [36,34,26,43,42,27,40,37,29,40,34,40,21,32,25,21,27,33,27,19,32,43,38,24,37,32,30,29],
            "March": [31,39,37,45,40,27,38,49,54,53,59,47,43,51,44,52,57,39,43,38,47,43,38,45,49,62,46,40,46,54,47],
            "April": [51,67,64,60,61,63,62,45,43,56,57,66,68,65,72,64,71,80,64,57,65,69,52,52,62,64,62,71,78,67]};
        }else {
          console.log("This user is not admin");
          pieSeries = [];
          temp = [];
          data = {
           "January" :  [],
           "February" :  [],
           "March": [],
           "April": []};
        }


        self.headerConfig = {'viewName': 'header', 'viewModelFactory': app.getHeaderModel()};
        self.incidents = ko.observableArray([]);
        self.innerRadius = 0.5;
        this.pieSeriesValue = pieSeries;
        this.pieGroupsValue = pieGroups;
        // Below are a subset of the ViewModel methods invoked by the ojModule binding
        // Please reference the ojModule jsDoc for additionaly available methods.


         for (var i = 0; i < temp.length; i++) {
           legendItems.push({text: temp[i] , color: "#"+colors[i]});
         };

         this.janItems = ko.observableArray(getPictoItems('January', 0));
         this.febItems = ko.observableArray(getPictoItems('February', 1));
         this.marItems = ko.observableArray(getPictoItems('March', 2));
         this.aprilItems = ko.observableArray(getPictoItems('April', 3));
         this.legendSections = ko.observableArray([{items: legendItems}]);

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
        var url = "FIF_CustomerAPI/dashboard";

        mbe.invokeCustomAPI(url, "GET", null, function(statusCode, data) {
          console.log("This user is able to access **Dashboard api** ");
          isAdmin = true;

          console.log("asdjflskdf" + isAdmin);
        }, function(error) {
          console.log("error", error);
        }) ;

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

  //   var chartModel = new dashboardViewModel();

// $(
// function(){
//         ko.applyBindings(chartModel, document.getElementById('chart-container'));
// }
// );
    return new dashboardViewModel();
  }
);
