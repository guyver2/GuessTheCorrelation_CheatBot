// basic standard deviation
function std(arr, mean){
  var sum = 0;
  for (i = 0; i < arr.length; i++) sum += Math.pow((arr[i]-mean), 2);
  var variance = sum/arr.length;
  return Math.sqrt(variance);
}



function corr(){

  var maxx = 0
  var maxy = 320


  // get array width
  var axes = document.getElementsByClassName("tick");

  for (i = 0; i < axes.length; i++) {
      var e = axes[i];
      var xforms = e.getAttribute('transform');
      var parts  = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
      var x = parseFloat(parts[1]);
      if (x > maxx) maxx = x;
  }


  // gather all points and scale them in [0;1]^2
  var xs = [];
  var ys = [];
  var xmean = 0;
  var ymean = 0;

  var svgpts = document.getElementsByClassName("nv-point");

  for (i = 0; i < svgpts.length; i++) {
    var e = svgpts[i];
    var xforms = e.getAttribute('transform');
    var parts  = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
    var dx = parseFloat(parts[1]);
    var dy = parseFloat(parts[2]);
    xs.push(dx/maxx);
    ys.push(dy/maxy);
    xmean += dx/maxx;
    ymean += dy/maxy;
  }

  // mean
  xmean = xmean/svgpts.length;
  ymean = ymean/svgpts.length;

  // STD
  var xstd = std(xs, xmean);
  var ystd = std(ys, ymean);

  // actual correlation
  var sum = 0;
  for (i = 0; i < svgpts.length; i++) {
    var zxi = (xs[i] - xmean)/xstd;
    var zyi = (ys[i] - ymean)/ystd;
    sum += zxi*zyi;
  }

  var r = Math.abs(sum / (svgpts.length-1));
  return r;
}
