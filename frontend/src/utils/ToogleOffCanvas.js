function ToogleOffCanvas(e) {
  var e = document.getElementById(e.target.dataset.toogle)
  e.classList.toggle("show");
}

function ToogleProperty(e) {
  var e = document.getElementById(e.target.dataset.toogle)
  e.classList.toggle(e.target.dataset.class);
}

export default ToogleOffCanvas