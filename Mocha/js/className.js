exports.addClass = function(el, newClass) {
  if(el.className.indexOf(newClass) !== -1) {
    return;
  }

  if(el.className !== '') {
    //ensure class names are separated by a space
    newClass = ' ' + newClass;
  }

  el.className += newClass;
}

exports.sum = function(x, y){
    var z = 0;
    z = x+y;
    return z;
}