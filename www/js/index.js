(function($){
    var Card = Backbone.Model.extend({
        defaults: {
            type: 'person',
            attack: '0',
            defense: '0',
            special: null
        }
    });

    var Cards = Backbone.Collection.extend({
        model: Card
    });

    var ListView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click button#readBarcode': 'readBarcode'
        },
    
        initialize: function(){
            _.bindAll(this, 'render', 'readBarcode');

            this.collection = new Cards();
            this.collection.bind('readBarcode', this.readBarcode); // collection event binder

            // this.counter = 0;
            this.render();
        },

        render: function(){
            var self = this;
            $(this.el).append("<button id='readBarcode'>Read a Barcode</button>");
            _(this.collection.models).each(function(item){ // in case collection is not empty
                self.appendItem(item);
            }, this);
        },

        readBarcode: function(){
            cordova.plugins.barcodeScanner.scan(function(result){
                alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
                // var card = new Card();
                // card.set({
                    
                // });
                // this.collection.add(card);
            }, function(error){

            });
        }
    });

    var listView = new ListView();
})(jQuery);



// var app = {
//     // Application Constructor
//     initialize: function() {
//         this.bindEvents();
//     },
//     // Bind Event Listeners
//     //
//     // Bind any events that are required on startup. Common events are:
//     // 'load', 'deviceready', 'offline', and 'online'.
//     bindEvents: function() {
//         document.addEventListener('deviceready', this.onDeviceReady, false);
//     },
//     // deviceready Event Handler
//     //
//     // The scope of 'this' is the event. In order to call the 'receivedEvent'
//     // function, we must explicitly call 'app.receivedEvent(...);'
//     onDeviceReady: function() {
//         app.receivedEvent('deviceready');
//     },
//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         var parentElement = document.getElementById(id);
//         var listeningElement = parentElement.querySelector('.listening');
//         var receivedElement = parentElement.querySelector('.received');

//         listeningElement.setAttribute('style', 'display:none;');
//         receivedElement.setAttribute('style', 'display:block;');

//         console.log('Received Event: ' + id);
//     }
// };