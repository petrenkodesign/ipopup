var debug = true;
var popConfig = {
  heder:"This is popup",
  content:"Hello there! I am yor pop, bro!)",
  bgColor:"#fff",
  bgUrl:"https://petrenkodesign.github.io/ipopup/img/bg.jpg"
};

window.onload = function() {
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
        popContent +='<a class="close" href="#">&times;</a>';
        popContent +='<div class="content">'+popConfig.content+'</div>';
        popContent +='</div>';
        popBody.innerHTML = popContent;
    document.getElementsByTagName("body")[0].appendChild(popBody);

    // add custom styles to popup
    if (popConfig.bgUrl!='none') document.getElementById("ipopContent").style.cssText += '; background-image: url('+popConfig.bgUrl+'); background-position: 50% 50%; background-repeat: no-repeat; background-size: cover';
}
// end of document load
