var debug = false;
var popConfig = {
  heder: "This is popup",
  content: "Hello there! I am yor pop, bro!)",
  bgColor: "#fff",
  bgUrl: "https://petrenkodesign.github.io/ipopup/img/bg.jpg",
  bgStyle: "none",
  button: true,
  butRight: false,
  show: true,
  showtimes: 3,
  poptimer: 20,
  siteleave: true,
  css: 'https://petrenkodesign.github.io/ipopup/css/main.css',
  popStyle: 'none',
  headerStyle: 'none',
  contentStyle: 'none',
  form: 'none',
  formButton: 'none'
};

window.onload = function() {
    // cheking if popup status off
    // statusPop();
    timerUp();
    // chrpage(); // iframe load chekout

    if (popConfig.show) {

        // add link to style script on the site
        if(document.createStyleSheet) {
          document.createStyleSheet(popConfig.css);
          if(debug) console.log("Create link to CSS with createStyleSheet");
        }
        else {
          var css_element = document.createElement('link');
          css_element.rel = 'stylesheet';
          css_element.href = popConfig.css;
          document.getElementsByTagName("head")[0].appendChild(css_element);
          if(debug) console.log("Create link to CSS with createElement");
        }

        // create popup append body
        var popBody = document.createElement("div");
            popBody.setAttribute("class", "ipo-overlay");
            popBody.setAttribute("id", "ipopup");
        var popContent = '<div class="ipo-popup" id="ipopContent" style="background-color:'+popConfig.bgColor+'">';
            popContent += '<button id="closepop" class="closepop">&times;</button>';
        if(popConfig.heder) popContent += '<h2 id="ipopContentHeader">'+popConfig.heder+'</h2>';
            popContent += '<div class="content" id="ipopContentBody">';
            popContent += '<div class="block">'+popConfig.content;
        if(popConfig.form!='none') popContent += popConfig.form;
        if(popConfig.formButton!='none') popContent += '<button id="formButton">'+popConfig.formButton+'</button>';
            popContent += '</div></div></div>';
            popBody.innerHTML = popContent;
        document.getElementsByTagName("body")[0].appendChild(popBody);

        var cpo = document.getElementsByClassName("closepop");
        for(var i = 0; i < cpo.length; i++) {
           cpo[i].onclick = function() {
             closePop(this);
           };
        }

        // chek configuration and customize ipopup

        // add custom styles to popup
        if (popConfig.bgStyle=='none') popConfig.bgStyle = '';
        if (popConfig.bgUrl!='none') document.getElementById("ipopContent").style.cssText += '; background-image: url('+popConfig.bgUrl+'); '+popConfig.bgStyle;
        if (popConfig.popStyle!='none') document.getElementById("ipopContent").style.cssText += '; '+popConfig.popStyle;
        if (popConfig.headerStyle!='none') document.getElementById("ipopContentHeader").style.cssText = popConfig.headerStyle;
        if (popConfig.contentStyle!='none') document.getElementById("ipopContentBody").style.cssText = popConfig.contentStyle;

        // add start button
        if (popConfig.button==true) addButton();

        // add form functional
        if(popConfig.formButton!='none') {
          document.getElementById("formButton").addEventListener("click", sendForm);
        }


        // iframe submit listen for esputnik
        // document.getElementById("frame_form").onload = function () {
        //   this.addEventListener("mouseleave", function(e) {
        //     if(debug) console.log("Iam leave frame");
        //   });
        //
        //   var ipop_frame_num = getCookie('ipop_frame_num');
        //   if (ipop_frame_num == false) ipop_frame_num = 1;
        //   else ipop_frame_num++;
        //   setCookie('ipop_frame_num', ipop_frame_num, 1);
        //
        //
        // }

    } // end of cheking popup showin status

} // end of document load

// listen when site leave and show popup
if (popConfig.siteleave && getCookie('statusipop')!=="off") {
  document.addEventListener("mouseleave", function(e) {
    if (popConfig.show) {
      var popel = document.getElementById("ipopup");
      if(popel) popel.className += ' show';
      if(debug) console.log("Site leave!");
    }
  });

}

// function add on site start button for popup
function addButton() {
  var popButton = document.createElement("button");
      popButton.setAttribute("id", "iPopButton");
      popButton.setAttribute("class", "iPopButton");
      if (popConfig.butRight)  {
        popButton.style.cssText = "left: auto; right: 20px; bottom: 120px !important";
      }
      popButton.innerHTML = '<img src="https://petrenkodesign.github.io/ipopup/img/icon.png">';
      popButton.onclick = function() {
        document.getElementById("ipopup").className += ' show';
      }
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
  if (popConfig.show && getCookie('statusipop')!=="off") {
    setTimeout(function() {
      document.getElementById("ipopup").className += ' show';
      if(debug) console.log("20 min left after first load of the site!");
    }, popConfig.poptimer*60000);
  }
}

// function for cheking popup show status
function statusPop() {
  var statusipop = getCookie('statusipop');
  if (statusipop=='off') {
    popConfig.show = false;
    // var ipopup = document.getElementById("ipopup");
    // if(ipopup) ipopup.remove();
    // var ipopup_button = document.getElementById("iPopButton");
    // if(ipopup_button) ipopup_button.remove();
  }
}
// function count of how many time close ipopup
function closePop(e) {
  var ipo = document.getElementsByClassName("show");
  for(var i = 0; i < ipo.length; i++) {
     ipo[i].className = ipo[i].className.replace(/\bshow\b/g, "");
  }

  if(e.id=="closepop") {
      var numofclose = getCookie('ncipop');
      if(numofclose==false) numofclose = 1;
      var ipop_frame_num = getCookie('ipop_frame_num'); // iframe reload count
      if (numofclose >=  popConfig.showtimes || ipop_frame_num >= 2) {
        setCookie('statusipop', 'off');
        statusPop();
      }
      else {
        numofclose++;
        setCookie('ncipop', numofclose);
      }
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
          document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
    document.location.reload();
}

// send data to server function
function sendForm() {
  // remove error selector if exist
  var errorel = document.querySelectorAll('.input-error');
  if(errorel.length) {
    errorel.forEach(function(el) {
      el.classList.remove('input-error');
    });
  }
  // find required filds
  var popForm = document.querySelector('#ipopContent form');
  var elements = popForm.elements;
  var sending_data = {};
  var elements_audit = Array.from(elements).some(function(el, index) {
    var elname = el.getAttribute('name');
    var forminput = document.querySelector('#ipopContent form input[name='+elname+']');

    if(el.required && !el.value) {
      forminput.classList.add('input-error');
      forminput.setAttribute('placeholder', "Error, "+elname+" - is empty!");
      return false;
    }

    if(elname=='email' && !isEmail(el.value)) {
      forminput.classList.add('input-error');
      forminput.value = "";
      forminput.setAttribute('placeholder', "Please enter a valid email!");
      return false;
    }

    sending_data[elname] = el.value;
    if(Object.keys(sending_data).length===elements.length) return true;
  });

  if(!elements_audit) return false;
  sending_data['page'] = window.location.href;
  var loading_img = '<img src="https://petrenkodesign.github.io/ipopup/img/loading.gif">';
  document.querySelector('#ipopContent form').innerHTML = loading_img;

  // send elements to API key
  var url = new URL("https://console.smartfactory.com.ua/api/");
  var api_key = 'Atc9EnPkc4DBQdbFzKSu4T2JsbF26yMpJePPwv7efy';

  var params = { key: api_key, do: "esputnik-subscribe", data: JSON.stringify(sending_data)};
  var query = Object.keys(params).map((key) => {
       return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
  }).join('&');
  url.search = query;

  var xrequest = new XMLHttpRequest();
  xrequest.onload = function() {
    var answer = JSON.parse(this.responseText);
    console.log(answer.id);
    if(answer.id !== undefined) {
      document.querySelector('#ipopContent form').remove();
      document.querySelector('#formButton').remove();
      var done = document.createElement("div");
      done.innerHTML = "<p><b>Підписку оформлено!</b></p>";
      done.style.color = "#8abe43";
      document.querySelector('#ipopContent .block').appendChild(done);
    }
  }
  xrequest.onerror = function(error) {
    console.log(error);
    document.querySelector('#ipopContent form').remove();
    document.querySelector('#formButton').remove();
    var done = document.createElement("div");
    done.innerHTML = "<p><b>Error: "+error+"</b></p>";
    done.style.color = "#FF0000";
    document.querySelector('#ipopContent .block').appendChild(done);
  }
  xrequest.open('GET', url, true);
  xrequest.send();

}

// fields test function
function isEmail(email) {
  return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
}
function isPhone(number) {
  return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(number);
}
