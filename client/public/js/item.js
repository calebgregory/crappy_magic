function getItem(slug, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `${ITEM_API_URL}/item/${slug}`);
  xhr.responseType = 'json';

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      cb(null, xhr.response);
    } else {
      cb('request went wrong');
    }
  }

  xhr.send();
}

function addItemDetails(err, json) {
  if (err) {
    console.log(err);
    return;
  }

  var item = document.getElementById("item");
  var ul = document.createElement('UL');
  for (field in json) {
    var li = genFieldElement(field, json[field]);
    ul.appendChild(li);
  }

  item.appendChild(ul);
}

function genFieldElement(field, value) {
  var li = document.createElement('LI');
  var text = `${field}: ${value}`;
  var textNode = document.createTextNode(text)

  li.appendChild(textNode);
  return li;
}

function genVideo() {
  var video = document.createElement('VIDEO');
  video.autoplay = true;
  video.controls = true;
  var source = document.createElement('SOURCE');
  source.src = `${VIDEO_API_URL}/videos/12345`;
  source.type = "video/mp4";

  video.appendChild(source);
  const vid = document.getElementById("vid");
  vid.appendChild(video);
}
