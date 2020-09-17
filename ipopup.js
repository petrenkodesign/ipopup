var debug = true;

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
        popBody.setAttribute("id", "popup1");
    var popContent = '<div class="popup">';
        popContent +='<h2>Popup heder</h2>';
        popContent +='<a class="close" href="#">&times;</a>';
        popContent +='<div class="content">Popup body here.</div>';
        popContent +='</div>';
        popBody.innerHTML = popContent;
    document.getElementsByTagName("body")[0].appendChild(popBody);
}
// end of document load
