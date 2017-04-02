/**
 * We dont use in this tutorial any
 * extended library. But in production i recommend
 * use a stable framework. Like React.js or Angularjs
 * with webpack or any builder
 */
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
    this.init();
};

app.prototype.init=function() {
    var source   = document.getElementById("entry-template").innerHTML;
    this.template = Handlebars.compile(source);
    this.pageContainers = document.getElementById('overview');
    this._render();
};

app.prototype._addEvents = function(){

};

app.prototype._render=function() {
    this.pages.map(function(item) {
        this._html = this._html + this.template(item);
    }.bind(this));
    console.log(this._html);
    this.pageContainers.innerHTML=this._html;
};

var startPage = new app();
