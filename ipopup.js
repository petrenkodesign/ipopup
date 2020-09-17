var debug = false;
var popConfig = {
  heder:"This is popup",
  content:"Hello there! I am yor pop, bro!)",
  bgColor:"#fff",
  bgUrl:"https://petrenkodesign.github.io/ipopup/img/bg.jpg",
  button: true,
  show: true,
  showtimes: 3,
  poptimer: 20,
  siteleave: true
};

window.onload = function() {
    // cheking if popup status off
    statusPop();
    timerUp();
    chrpage(); // iframe load chekout

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

        // iframe submit listen for esputnik
        document.getElementById("frame_form").onload = function () {
          this.addEventListener("mouseleave", function(e) {
            if(debug) console.log("Iam leave frame");
          });

          var ipop_frame_num = getCookie('ipop_frame_num');
          if (ipop_frame_num == false) ipop_frame_num = 1;
          else ipop_frame_num++;
          setCookie('ipop_frame_num', ipop_frame_num, 1);
        }

    } // end of cheking popup showin status

} // end of document load

// listen when site leave and show popup
if (popConfig.siteleave) {
  document.addEventListener("mouseleave", function(e) {
    if (popConfig.show) {
      window.location.hash="ipopup";
      if(debug) console.log("Site leave!");
    }
  });
}

// function add on site start button for popup
function addButton() {
  var popButton = document.createElement("a");
      popButton.setAttribute("id", "iPopButton");
      popButton.setAttribute("href", "#ipopup");
      popButton.innerHTML = '<img src="https://petrenkodesign.github.io/ipopup/img/icon.png">';
  document.getElementsByTagName("body")[0].appendChild(popButton);
}

// user rections algorithms

// function for ceking when 20 min left from first site load
function firstStartLoad() {
  var popStart = getCookie('ipop_start');
  if (popStart==false) {
    setCookie('ipop_start', Date()); //set first start date
  }
  else {
    var alarmtime = new Date(popStart);
    alarmtime.setMinutes(alarmtime.getMinutes() + popConfig.poptimer);
    if (Date.parse(Date()) > Date.parse(alarmtime)) {
      console.log("20 min left after first load of the site!");
    }
  }
}

// chek reload page
function chrpage() {
  if (getCookie('chrpage') == false) {
    setCookie('chrpage', 1);
    setCookie('ipop_frame_num', false, -1);
  }
  else {
    setCookie('chrpage', false, -1);
    setCookie('ipop_frame_num', false, -1);
  }
}

// function start popup time from first start
function timerUp() {
  if (popConfig.show) {
    setTimeout(function() {
      window.location.hash="ipopup";
      if(debug) console.log("20 min left after first load of the site!");
    }, popConfig.poptimer*60000);
  }
}

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
  var ipop_frame_num = getCookie('ipop_frame_num'); // iframe reload count
  if (numofclose >=  popConfig.showtimes || ipop_frame_num >= 2) {
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
function setCookie(name, value, exdays=3650) {
    exdays = exdays || 1;
    d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
}

// delete all cookies
function deleteAllCookies() {
    var cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
      var index = cookie.indexOf('=');
        var name = ~index
          ? cookie.substr(0, index)
          : cookie;
          document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
}
