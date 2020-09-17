var debug = true;

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


var popBody = document.createElement("div");
    popBody.setAttribute("class", "overlay");
    popBody.setAttribute("id", "popup1");
    popBody.innerHTML = '<div class="popup"><h2>Popup heder</h2><a class="close" href="#">&times;</a><div class="content">Popup body here.</div></div>';

document.getElementsByTagName("head")[0].appendChild(popBody);


// <div id="popup1" class="overlay">
// 	<div class="popup">
// 		<h2>Here i am</h2>
// 		<a class="close" href="#">&times;</a>
// 		<div class="content">
// 			Thank to pop me out of that button, but now i'm done so you can close this window.
// 		</div>
// 	</div>
// </div>
