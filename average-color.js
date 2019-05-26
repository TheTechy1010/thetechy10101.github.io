function addImage(file) {
  var element = document.createElement('div');
  element.className = 'row';
  element.innerHTML =
    '<div class="cell image">' +
    '  <img />' +

    '</div>' +
    '<div class="cell color">' +
    '  <div class="box"></div>' +
    '  <ul>' +
    '    <li class="hex"></li>' +
    '    <li class="hsl"></li>' +
    '   <li class="nlevel"></li> ' +
    ' <li class="filename"></li> '+
    '  </ul>' +
    '</div>';

  var img = element.querySelector('img');
  img.src = URL.createObjectURL(file);
  img.onload = function() {
    var rgb = getAverageColor(img);
    var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    var rgbStr = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';

    element.querySelector('.red').textContent = rgb.r;

    element.querySelector('.green').textContent = rgb.g;

    element.querySelector('.blue').textContent = rgb.b;

    element.querySelector('.phex').textContent = hexStr;
    var hexStr = '#' + ('0'+rgb.r.toString(16)).slice(-2) + ('0'+rgb.g.toString(16)).slice(-2) + ('0'+rgb.b.toString(16)).slice(-2);
    //alert(hexStr);
    var hslStr = 'hsl(' + Math.round(hsl.h * 360) + ', ' + Math.round(hsl.s * 100) + '%, ' + Math.round(hsl.l * 100) + '%)';
    //move();
    //element.querySelector('.myBar').style.width = 20;
    //elem.style.width = 70;
    //var width = 1;
    //elem.style.width = width +10;

    var box = element.querySelector('.box');
    box.style.backgroundColor = rgbStr;

    element.querySelector('.rgb').textContent = rgbStr;
    element.querySelector('.hex').textContent = hexStr;
    var hexStr1 = ('0'+rgb.r.toString(16)).slice(-2) + ('0'+rgb.g.toString(16)).slice(-2) + ('0'+rgb.b.toString(16)).slice(-2);
    var new_str = GetNitroLevel(hexStr1);
    element.querySelector('.nlevel').textContent = new_str;
    var nstr = img.src;
    element.querySelector('.filename').textContent = nstr;

    var width = GetCloseLevel(hexStr1);
    var elem = document.getElementById("myBar");
    elem.style.width = width;
    //move(hexStr1);
    //element.querySelector('.nlevel').textContent = N_Status;
    //element.querySelector('.hsl').textContent = hslStr;
  };

  document.getElementById('images').appendChild(element);
}

function GetCloseLevel(hexcode1) {
  wd = 0;
  if (( hexToDec("657321")-hexToDec(hexcode1)) > (hexToDec("506622")-hexToDec(hexcode1))) {
    wd = 10;
    //alert('Close to swap1');
  }
  else {
    wd = 70;
    //alert('Close to swap2');
  }
  return wd +'%';
}

function move() {
  var elem = document.getElementById("myBar");
  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + '%';
    }
  }
}

function getImageName(image) {
  var name = image.src;
  return name;
}
function GetNitroLevel(hexcode) {
  var dec = hexToDec(hexcode);
  str = "";
  if (dec >= hexToDec("657321")) {
    str = "Nitrogen Deficient(Very Less Conc.)" + "<br/>" +"Less than SWAP_1";
  }
  else if (dec <= hexToDec("657321") && dec > hexToDec("506622")) {
    str = "Less Nitrogen Concentration"  + "SWAP_1 & SWAP_2";
  }
  else if (dec <= hexToDec("506622") && dec > hexToDec("495D25")) {
    str = "Average Nitrogen Concentration" + "SWAP_2 & SWAP_3";
  }
  else if (dec <= hexToDec("495D25") && dec > hexToDec("3B4A2D")) {
    str = "More than Average Nitrogen Concentration" + "SWAP_3 & SWAP_4";
  }
  else if (dec <= hexToDec("384A2D") && dec >= hexToDec("3F4C35")) {
    str = "Sufficient Nitrogen Concentration"  +"SWAP_4 & SWAP_5";
  }
else if (dec <= hexToDec("3F4C35")) {
  str = "More than SWAP_5"
}
  else {
    str = "Not Awesome";
  }
  return str;
}





function hexToDec(hex) {
    var result = 0, digitValue;
    hex = hex.toLowerCase();
    for (var i = 0; i < hex.length; i++) {
        digitValue = '0123456789abcdefgh'.indexOf(hex[i]);
        result = result * 16 + digitValue;
    }
    return result;
}

function getAverageColor(img) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var width = canvas.width = img.naturalWidth;
  var height = canvas.height = img.naturalHeight;

  ctx.drawImage(img, 0, 0);

  var imageData = ctx.getImageData(0, 0, width, height);
  var data = imageData.data;
  var r = 0;
  var g = 0;
  var b = 0;

  for (var i = 0, l = data.length; i < l; i += 4) {
    r += data[i];
    g += data[i+1];
    b += data[i+2];
  }

  r = Math.floor(r / (data.length / 4));
  g = Math.floor(g / (data.length / 4));
  b = Math.floor(b / (data.length / 4));

  return { r: r, g: g, b: b };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h, s: s, l: l };
}

function handleImages(files) {
  document.getElementById('images').innerHTML = '';

  for (var i = 0; i < files.length; i++) {
    addImage(files[i]);
  }
}

document.ondragover = function(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
};

document.ondrop = function(event) {
  event.preventDefault();
  var img = document,createElement("img").src = "https://www.gstatic.com/webp/gallery/1.jpg";
  handleImages(img);
};

(function() {
  var upload = document.getElementById('upload');
  var target = document.getElementById('target');
  var button = document.getElementById('button1');

  upload.onchange = function() {
    handleImages("https://www.gstatic.com/webp/gallery/1.jpg")
    //handleImages(this.files);
  };
  button.onclick = function () {
    var img = document,createElement("img").src = "https://www.gstatic.com/webp/gallery/1.jpg";
    handleImages(img);
  }
  target.onclick = function() {
    upload.click();
  };
})();

function myFunction2() {
  var img = document,createElement("img").src = "https://www.gstatic.com/webp/gallery/1.jpg";
  handleImages(img);
}
