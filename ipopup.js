var debug = true;
var popConfig = {
  heder:"This is popup",
  content:"Hello there! I am yor pop, bro!)",
  bgColor:"#fff",
  bgUrl:"https://petrenkodesign.github.io/ipopup/img/bg.jpg",
  button: true,
  show: true,
  showtimes: 3
};

window.onload = function() {
    // cheking if popup status off
    statusPop();

    if (popConfig.show) {

        // add link to style script on the site
        if(document.createStyleSheet) {
          document.createStyleSheet('https://petrenkodesign.github.io/ipopup/css/main.css');
          if(debug) console.log("Create link to CSS with createStyleSheet");
        }
        else {
          var css_element = document.createElement('link');
          css_element.rel='stylesheet';
          css_element.href='https://petrenkodesign.github.io/ipopup/css/main.css';
          document.getElementsByTagName("head")[0].appendChild(css_element);
          if(debug) console.log("Create link to CSS with createElement");
        }

        // create popup append body
        var popBody = document.createElement("div");
            popBody.setAttribute("class", "overlay");
            popBody.setAttribute("id", "ipopup");
        var popContent = '<div class="popup" id="ipopContent" style="background-color:'+popConfig.bgColor+'">';
            popContent +='<h2>'+popConfig.heder+'</h2>';
            popContent +='<a id="closepop" href="#">&times;</a>';
            popContent +='<div class="content">'+popConfig.content+'</div>';
            popContent +='</div>';
            popBody.innerHTML = popContent;
        document.getElementsByTagName("body")[0].appendChild(popBody);
        document.getElementById("closepop").onclick = function() { closePop() };

        // chek configuration and customize ipopup

        // add custom styles to popup
        if (popConfig.bgUrl!='none') document.getElementById("ipopContent").style.cssText += '; background-image: url('+popConfig.bgUrl+'); background-position: 50% 50%; background-repeat: no-repeat; background-size: cover';

        // add start button
        if (popConfig.button==true) addButton();

    } // end of cheking popup showin status

} // end of document load

// function add on site start button for popup
function addButton() {
  var popButton = document.createElement("a");
      popButton.setAttribute("id", "iPopButton");
      popButton.setAttribute("href", "#ipopup");
      popButton.innerHTML = '<img src="https://petrenkodesign.github.io/ipopup/img/icon.png">';
  document.getElementsByTagName("body")[0].appendChild(popButton);
}

// user rections algorithms

// function for cheking popup show status
function statusPop() {
  var statusipop = getCookie('statusipop');
  if (statusipop=='off') {
    popConfig.show = false;
    var ipopup = document.getElementById("ipopup");
    if(ipopup) ipopup.remove();
    var ipopup_button = document.getElementById("iPopButton");
    if(ipopup_button) ipopup_button.remove();
  }
}
// function count of how many time close ipopup
function closePop() {
  var numofclose = getCookie('ncipop');
  if (numofclose >  popConfig.showtimes) {
    setCookie('statusipop', 'off');
    statusPop();
  }
  else {
    if(numofclose==false) numofclose = 1;
    numofclose++;
    setCookie('ncipop', numofclose);
  }
}

// get cookie by name
function getCookie(name) {
    var cookies, one_cookie;
    cookies = document.cookie.split(';');
    for (var i=0; i < cookies.length; i++) {
        one_cookie = cookies[i].trim().split('=');
        if (one_cookie[0] == name) {
          return one_cookie[1];
        }
    }
    return false;
}
// set cookie, simply function
function setCookie(name, value, exdays) {
    exdays = exdays || 3650;
    d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
}
