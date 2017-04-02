/**
 * We dont use in this tutorial any
 * extended library. But in production i recommend
 * use a stable framework. Like React.js or Angularjs
 * with webpack or any builder
 */
//this containes an HTMLCollection item and dont have an map function... we add an simple one
HTMLCollection.prototype.map = function(callback) {
    //dont use this in production !:D Its missing too much 
    var l = this.length-1;
    x=0;
    while(x <= l) {
        callback.call(this.item(x), this.item(x), x);
        x++;
    }
}

var app = function() {
    this.pages= [
        {
            title:'youtube',
            description:'watch videos',
            image: '/images/youtubeLogo.png',
            url:'https://youtube.com'
        },
        {
            title:'facebook',
            description:'stay in contact with friends',
            image: '/images/facebookLogo.png',
            url:'https://facebook.com'
        },
        {
            title:'Amazon',
            description:'Buy new things',
            image: '/images/amazonLogo.png',
            url:'https://amazon.com'
        },     
    ];
    this._html="";
    this.onlineState=navigator.onLine;//check the browsers current online state(true/false)
    this.init();
};

app.prototype.init=function() {
    var source   = document.getElementById("entry-template").innerHTML;
    this.template = Handlebars.compile(source);
    this.pageContainers = document.getElementById('overview');
    this._addEvents(); //dont forget to call it :D
    this._render();
};

app.prototype._addEvents = function(){
    //we register here the service worker
    if('serviceWorker' in navigator) { //we check if the feature is available
        navigator.serviceWorker.register('./serviceWorker.js')
        .then(function() {
            //it returns an promise 
        });
    }
    //we add here events for on- and offline
    window.addEventListener('online', function() {
        this.onlineState=true;
        this.switchOfflineStates();
    }.bind(this));
    window.addEventListener('offline', function() {
        this.onlineState=false;
        this.switchOfflineStates();
    }.bind(this));
};

/**
 * This method toggles the showonline/offline elements based on online state
 */
app.prototype.switchOfflineStates = function() {
    switch(this.onlineState) {
        case true:
            this.toggleOnline(true);
            this.toggleOffline(false);
        break;
        case false:
            this.toggleOnline(false);
            this.toggleOffline(true);
        break;
    }
};

app.prototype.toggleOffline = function(mode) {
    this.offlineElements.map(function(nodeItem){
        this._switchItem(nodeItem, mode);
    }.bind(this));
};

app.prototype.toggleOnline = function(mode) {
    this.onlineElements.map(function(nodeItem){
        this._switchItem(nodeItem, mode);
    }.bind(this));
};

/**
 * little helper to change display mode
 */
app.prototype._switchItem = function(item, mode) {
    item.style.display = (mode ? 'block' : 'none');
};

app.prototype._render=function() {
    /**
     * we render the page simply with Handlebars 
     * for more information take a look at:
     * http://handlebarsjs.com/
     */
    this.pages.map(function(item) {
        this._html = this._html + this.template(item);
    }.bind(this));
    this.pageContainers.innerHTML=this._html;
    //we take the elements contains online or offline classes
    this.offlineElements = document.getElementsByClassName('showoffline');
    this.onlineElements = document.getElementsByClassName('showonline');
    //now we call here also the toggleOffline function
    this.switchOfflineStates();
};

var startPage = new app();
