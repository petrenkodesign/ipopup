var debug = true;

// add link to style script on the site
if(document.createStyleSheet) {
  document.createStyleSheet('http://server/stylesheet.css');
  if(debug) console.log("Create link to CSS with createStyleSheet");
}
else {
  var styles = "@import url(' http://server/stylesheet.css ');";
  var newSS=document.createElement('link');
  newSS.rel='stylesheet';
  newSS.href='data:text/css,'+escape(styles);
  document.getElementsByTagName("head")[0].appendChild(newSS);
}





<div id="popup1" class="overlay">
	<div class="popup">
		<h2>Here i am</h2>
		<a class="close" href="#">&times;</a>
		<div class="content">
			Thank to pop me out of that button, but now i'm done so you can close this window.
		</div>
	</div>
</div>
