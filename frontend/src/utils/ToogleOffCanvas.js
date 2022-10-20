 function ToogleOffCanvas(e) {
    var e = document.getElementById( e.target.dataset.toogle)
    e.classList.toggle("show");
  }
  
  export default ToogleOffCanvas