/**
 * We dont use in this tutorial any
 * extended library. But in production i recommend
 * use a stable framework. Like React.js or Angularjs
 * with webpack or any builder
 */
HTMLCollection.prototype.map = function(callback) {
    var l = this.length-1;
    x=0;
    while(x <= l) {
        callback.call(this.item(x), this.item(x), x);
        x++;
    }
};

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
    this.onlineState=navigator.onLine;
    this.init();
};

app.prototype.init=function() {
    var source   = document.getElementById("entry-template").innerHTML;
    this.template = Handlebars.compile(source);
    this.pageContainers = document.getElementById('overview');
    this._addEvents();
    this._render();
};

app.prototype._addEvents = function(){
    //we register here our service worker
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./serviceWorker.js')
        .then(function() {
            //promise resolved when the serviceworker is registerd
        });
    }
    //add a eventListener when we are online or offline
    window.addEventListener('online', function() {
        this.onlineState=true;
        this.switchOfflineStates();
    }.bind(this));
    window.addEventListener('offline', function() {
        this.onlineState=false;
        this.switchOfflineStates();
    }.bind(this));
};

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

/**
 * @param <boolean> mode switch true display false hide
 */
app.prototype.toggleOffline = function(mode) {
    this.offlineElements.map(function(nodeItem) {
        this._switchItem(nodeItem,mode);
    }.bind(this));
};

/**
 * @param <boolean> mode switch true display false hide
 */
app.prototype.toggleOnline = function(mode) {
    this.onlineElements.map(function(nodeItem) {
        this._switchItem(nodeItem,mode);
    }.bind(this));
};

app.prototype._switchItem = function(item, mode) {
    item.style.display=(mode ? 'block' : 'none');
};

app.prototype._render=function() {
    this.pages.map(function(item) {
        this._html = this._html + this.template(item);
    }.bind(this));
    this.pageContainers.innerHTML=this._html;
    this.offlineElements = document.getElementsByClassName('showoffline');
    this.onlineElements =  document.getElementsByClassName('showonline');
    this.switchOfflineStates();
};



var startPage = new app();

