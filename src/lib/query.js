'use strict';

export default class Query {

  static httpGet(path, onSuccess, onError) {
    var request = new XMLHttpRequest();
    var url = path;

    request.open('GET', url, true);

    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        console.log(this.response);
        onSuccess => this.response;
      } else {
        onError => 'We reached our target server, but it returned an error';
      }
    };

    request.onerror = function () {
      onError => 'There was a connection error of some sort';
    };

    request.send();
  }

}
