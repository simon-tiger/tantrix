window.onload = pageLoaded;

function pageLoaded() {
  var settings = {
    key: 'https://docs.google.com/spreadsheets/d/1DF19x791Lbzn7WwFjv5ds0E7R5GEKbY5UXvOiaLRX5U/edit#gid=1191258178',
    callback: dataLoaded,
    simpleSheet: true
  };
  Tabletop.init(settings);
}

function dataLoaded(data) {
  data.forEach((elt, index) => {
    var newElt1 = elt['Link 1 Start & End'].split(' ').sort().join(' ');
    var newElt2 = elt['Link 2 Start & End'].split(' ').sort().join(' ');
    var newElt3 = elt['Link 3 Start & End'].split(' ').sort().join(' ');

    var links = [newElt1, newElt2, newElt3];
    links.sort();

    newElt1 = links[0];
    newElt2 = links[1];
    newElt3 = links[2];

    data[index]['Link 1 Start & End'] = newElt1;
    data[index]['Link 2 Start & End'] = newElt2;
    data[index]['Link 3 Start & End'] = newElt3;
  });

  downloadFile(data, 'tiles.json');
}

function downloadFile(data, filename) {
  if (typeof data === 'object') {
    data = JSON.stringify(data, null, 2);
  }

  var elt = document.createElement('a');

  elt.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
  elt.setAttribute('download', filename);
  elt.style.display = 'none';
  document.body.appendChild(elt);

  elt.click();

  document.body.removeChild(elt);
}
