App.BrowserDetect = Ember.Object.extend();
App.BrowserDetect.reopenClass({
  browser: null,
  browserVersion: null,
  os: null,
  osVersion: null,
  detect: function () {
    var browserItem = this.searchString(this._dataBrowser);
    if (Ember.isNone(browserItem)){
      return;
    }
    this.browser = browserItem.identity;

    var versionSearchString = browserItem.versionSearch || browserItem.identity;
    this.browserVersion = this.searchVersion(versionSearchString);

    var osItem = this.searchString(this._dataOS);
    if (Ember.isNone(osItem)){
      return;
    }
    this.os = osItem.identity;

    //if (this.os == 'Android'){
      var ua = navigator.userAgent;
      //this.osVersion = parseFloat(ua.slice(ua.indexOf("Android") + 8));
      this.osVersion = this.getOSVersion(osItem.versionSearch || osItem.identity);
    //}
  },
  getOSVersion: function(searchString){
    var ua = navigator.userAgent;
    var version = parseFloat(ua.slice(ua.indexOf(searchString) + searchString.length + 1).replace(/_/g, '.'));
    if (searchString == 'Windows NT') {
      switch(version)
      {
        case 5:
          version = 'Windows 2000'; 
        break;
        case 5.1:
          version = 'Windows XP'; 
        break;
        case 5.2:
          version = 'Windows Server 2003; Windows XP x64 Edition';
        break;
        case 6:
          version = 'Windows Vista';
        break;
        case 6.1:
          version = 'Windows 7';
        break;
        case 6.2:
          version = 'Windows 8';
        break;
        case 6.3:
          version = 'Windows 8.1 Preview';
        break;
        default:
          version = null;
      }
    } 
    return version;
  },
  searchString: function (data) {
    return (data.find(function(item){
      if (item.string) {
        if (item.string.indexOf(item.subString) != -1)
          return true;
      }
      else if (item.prop)
        return true;
    }));
  },
  searchVersion: function (versionSearchString) {
    var index = -1;
    var searchIn = [navigator.userAgent, navigator.appVersion].find(function(item){
      index = item.indexOf(versionSearchString);
      return (index != -1);
    });
    if (Ember.isNone(searchIn)){
      return null;
    }
    return parseFloat(searchIn.substring(index + versionSearchString.length + 1));
  },
  _dataBrowser: [
    {
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "Chrome"
    },
    {
      string: navigator.userAgent,
      subString: "OmniWeb",
      versionSearch: "OmniWeb/",
      identity: "OmniWeb"
    },
    {
      string: navigator.vendor,
      subString: "Apple",
      identity: "Safari",
      versionSearch: "Version"
    },
    {
      prop: window.opera,
      identity: "Opera",
      versionSearch: "Version"
    },
    {
      string: navigator.vendor,
      subString: "iCab",
      identity: "iCab"
    },
    {
      string: navigator.vendor,
      subString: "KDE",
      identity: "Konqueror"
    },
    {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox"
    },
    {
      string: navigator.vendor,
      subString: "Camino",
      identity: "Camino"
    },
    {   // for newer Netscapes (6+)
      string: navigator.userAgent,
      subString: "Netscape",
      identity: "Netscape"
    },
    {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "Explorer",
      versionSearch: "MSIE"
    },
    {
      string: navigator.userAgent,
      subString: "Gecko",
      identity: "Mozilla",
      versionSearch: "rv"
    },
    {     // for older Netscapes (4-)
      string: navigator.userAgent,
      subString: "Mozilla",
      identity: "Netscape",
      versionSearch: "Mozilla"
    }
  ],
  _dataOS : [
    {
      string: navigator.userAgent,
      subString: "Win",
      identity: "Windows",
      versionSearch: "Windows NT"
    },
    {
      string: navigator.userAgent,
      subString: "iPad",
      identity: "iPad",
      versionSearch: "CPU OS"
    },
    {
      string: navigator.userAgent,
      subString: "iPhone",
      identity: "iPhone/iPod",
      versionSearch: "iPhone OS"
    },
    {
      string: navigator.userAgent,
      subString: "Android",
      identity: "Android"
    },
    {
      string: navigator.platform,
      subString: "Mac",
      identity: "Mac",
      versionSearch: "Mac OS X"
    },
    {
      string: navigator.platform,
      subString: "Linux",
      identity: "Linux"
    }
  ]

});

App.BrowserDetect.detect();
