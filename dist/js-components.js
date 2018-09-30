/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/whatwg-fetch/fetch.js":
/*!********************************************!*\
  !*** ./node_modules/whatwg-fetch/fetch.js ***!
  \********************************************/
/*! exports provided: Headers, Request, Response, DOMException, fetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Headers", function() { return Headers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Response", function() { return Response; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMException", function() { return DOMException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });
var support = {
  searchParams: 'URLSearchParams' in self,
  iterable: 'Symbol' in self && 'iterator' in Symbol,
  blob:
    'FileReader' in self &&
    'Blob' in self &&
    (function() {
      try {
        new Blob()
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in self,
  arrayBuffer: 'ArrayBuffer' in self
}

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ]

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name)
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
    throw new TypeError('Invalid character in header field name')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift()
      return {done: value === undefined, value: value}
    }
  }

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    }
  }

  return iterator
}

function Headers(headers) {
  this.map = {}

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value)
    }, this)
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      this.append(header[0], header[1])
    }, this)
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name])
    }, this)
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name)
  value = normalizeValue(value)
  var oldValue = this.map[name]
  this.map[name] = oldValue ? oldValue + ', ' + value : value
}

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)]
}

Headers.prototype.get = function(name) {
  name = normalizeName(name)
  return this.has(name) ? this.map[name] : null
}

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
}

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value)
}

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this)
    }
  }
}

Headers.prototype.keys = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push(name)
  })
  return iteratorFor(items)
}

Headers.prototype.values = function() {
  var items = []
  this.forEach(function(value) {
    items.push(value)
  })
  return iteratorFor(items)
}

Headers.prototype.entries = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push([name, value])
  })
  return iteratorFor(items)
}

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.onerror = function() {
      reject(reader.error)
    }
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsArrayBuffer(blob)
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsText(blob)
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf)
  var chars = new Array(view.length)

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i])
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength)
    view.set(new Uint8Array(buf))
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false

  this._initBody = function(body) {
    this._bodyInit = body
    if (!body) {
      this._bodyText = ''
    } else if (typeof body === 'string') {
      this._bodyText = body
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString()
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer)
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer])
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body)
    } else {
      this._bodyText = body = Object.prototype.toString.call(body)
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8')
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type)
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
      }
    }
  }

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    }

    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
      } else {
        return this.blob().then(readBlobAsArrayBuffer)
      }
    }
  }

  this.text = function() {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  }

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    }
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  }

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

function normalizeMethod(method) {
  var upcased = method.toUpperCase()
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  options = options || {}
  var body = options.body

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url
    this.credentials = input.credentials
    if (!options.headers) {
      this.headers = new Headers(input.headers)
    }
    this.method = input.method
    this.mode = input.mode
    this.signal = input.signal
    if (!body && input._bodyInit != null) {
      body = input._bodyInit
      input.bodyUsed = true
    }
  } else {
    this.url = String(input)
  }

  this.credentials = options.credentials || this.credentials || 'same-origin'
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers)
  }
  this.method = normalizeMethod(options.method || this.method || 'GET')
  this.mode = options.mode || this.mode || null
  this.signal = options.signal || this.signal
  this.referrer = null

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body)
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
}

function decode(body) {
  var form = new FormData()
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers()
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
  preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
    var parts = line.split(':')
    var key = parts.shift().trim()
    if (key) {
      var value = parts.join(':').trim()
      headers.append(key, value)
    }
  })
  return headers
}

Body.call(Request.prototype)

function Response(bodyInit, options) {
  if (!options) {
    options = {}
  }

  this.type = 'default'
  this.status = options.status === undefined ? 200 : options.status
  this.ok = this.status >= 200 && this.status < 300
  this.statusText = 'statusText' in options ? options.statusText : 'OK'
  this.headers = new Headers(options.headers)
  this.url = options.url || ''
  this._initBody(bodyInit)
}

Body.call(Response.prototype)

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
}

Response.error = function() {
  var response = new Response(null, {status: 0, statusText: ''})
  response.type = 'error'
  return response
}

var redirectStatuses = [301, 302, 303, 307, 308]

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
}

var DOMException = self.DOMException
try {
  new DOMException()
} catch (err) {
  DOMException = function(message, name) {
    this.message = message
    this.name = name
    var error = Error(message)
    this.stack = error.stack
  }
  DOMException.prototype = Object.create(Error.prototype)
  DOMException.prototype.constructor = DOMException
}

function fetch(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init)

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest()

    function abortXhr() {
      xhr.abort()
    }

    xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
      var body = 'response' in xhr ? xhr.response : xhr.responseText
      resolve(new Response(body, options))
    }

    xhr.onerror = function() {
      reject(new TypeError('Network request failed'))
    }

    xhr.ontimeout = function() {
      reject(new TypeError('Network request failed'))
    }

    xhr.onabort = function() {
      reject(new DOMException('Aborted', 'AbortError'))
    }

    xhr.open(request.method, request.url, true)

    if (request.credentials === 'include') {
      xhr.withCredentials = true
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false
    }

    if ('responseType' in xhr && support.blob) {
      xhr.responseType = 'blob'
    }

    request.headers.forEach(function(value, name) {
      xhr.setRequestHeader(name, value)
    })

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr)

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr)
        }
      }
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
  })
}

fetch.polyfill = true

if (!self.fetch) {
  self.fetch = fetch
  self.Headers = Headers
  self.Request = Request
  self.Response = Response
}


/***/ }),

/***/ "./src/components/count.js":
/*!*********************************!*\
  !*** ./src/components/count.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(/*! ../lib/component.js */ "./src/lib/component.js");

var _component2 = _interopRequireDefault(_component);

var _index = __webpack_require__(/*! ../todo/index.js */ "./src/todo/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Count = function (_Component) {
    _inherits(Count, _Component);

    function Count() {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Count);

        return _possibleConstructorReturn(this, (Count.__proto__ || Object.getPrototypeOf(Count)).call(this, {
            items: _index2.default,
            element: document.querySelector(props.componentElement)
        }));
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */


    _createClass(Count, [{
        key: 'render',
        value: function render() {
            var createString = __webpack_require__(/*! ../templates/count-template */ "./src/templates/count-template.js");
            this.element.innerHTML = createString(_index2.default.state);
        }
    }]);

    return Count;
}(_component2.default);

exports.default = Count;

/***/ }),

/***/ "./src/components/list.js":
/*!********************************!*\
  !*** ./src/components/list.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(/*! ../lib/component.js */ "./src/lib/component.js");

var _component2 = _interopRequireDefault(_component);

var _index = __webpack_require__(/*! ../todo/index.js */ "./src/todo/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = function (_Component) {
    _inherits(List, _Component);

    // Pass our items instance and the HTML element up to the parent Component
    function List() {
        _classCallCheck(this, List);

        return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, {
            items: _index2.default,
            element: document.querySelector('.js-items')
        }));
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */


    _createClass(List, [{
        key: 'render',
        value: function render() {
            var self = this;

            // If there are no items to show, render a little status instead
            if (_index2.default.state.items.length === 0) {
                self.element.innerHTML = '<p class="no-items">You\'ve done nothing yet \uD83D\uDE22</p>';
                return;
            }

            // Loop the items and generate a list of elements
            self.element.innerHTML = '\n            <ul class="app__items">\n                ' + _index2.default.state.items.map(function (item) {
                return '\n                        <li>' + item + '<button aria-label="Delete this item">\xD7</button></li>\n                    ';
            }).join('') + '\n            </ul>\n        ';

            // Find all the buttons in the list and when they are clicked, we dispatch a
            // `clearItem` action which we pass the current item's index to
            self.element.querySelectorAll('button').forEach(function (button, index) {
                button.addEventListener('click', function () {
                    _index2.default.dispatch('clearItem', { index: index });
                });
            });
        }
    }]);

    return List;
}(_component2.default);

exports.default = List;
;

/***/ }),

/***/ "./src/components/roomslist.js":
/*!*************************************!*\
  !*** ./src/components/roomslist.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(/*! ../lib/component.js */ "./src/lib/component.js");

var _component2 = _interopRequireDefault(_component);

var _whatwgFetch = __webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");

var _whatwgFetch2 = _interopRequireDefault(_whatwgFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Roomslist = function (_Component) {
  _inherits(Roomslist, _Component);

  function Roomslist() {
    _classCallCheck(this, Roomslist);

    var _this = _possibleConstructorReturn(this, (Roomslist.__proto__ || Object.getPrototypeOf(Roomslist)).call(this, {
      element: document.querySelector('[room-listing]')
    }));

    _this.rooms = new Promise(function (resolve, reject) {
      fetch('https://rt3api-prd.ttaws.com/hotels/rooms.json?hotel_id=KEY24N&portal_id=24northhotel&locale=en&currency=USD&ip_address=124.123.57.31&arrival_date_0=2018-09-30&departure_date_0=2018-10-01&adults_0=2&children_0=0&rooms=1').then(function (response) {
        return response.json();
      }).then(function (json) {
        return resolve(json);
      }).catch(function (ex) {
        console.log('parsing failed', ex);
      });
    });
    return _this;
  }

  // /**
  //  * React to state changes and render the component's HTML
  //  *
  //  * @returns {void}
  //  */


  _createClass(Roomslist, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.rooms.then(function (successMessage) {
        var createString = __webpack_require__(/*! ../templates/roomlist-template */ "./src/templates/roomlist-template.js");
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = successMessage.rooms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var value = _step.value;

            _this2.element.innerHTML = _this2.element.innerHTML + createString(value);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
    }
  }]);

  return Roomslist;
}(_component2.default);

exports.default = Roomslist;

/***/ }),

/***/ "./src/components/status.js":
/*!**********************************!*\
  !*** ./src/components/status.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(/*! ../lib/component.js */ "./src/lib/component.js");

var _component2 = _interopRequireDefault(_component);

var _index = __webpack_require__(/*! ../todo/index.js */ "./src/todo/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Status = function (_Component) {
    _inherits(Status, _Component);

    function Status() {
        _classCallCheck(this, Status);

        return _possibleConstructorReturn(this, (Status.__proto__ || Object.getPrototypeOf(Status)).call(this, {
            items: _index2.default,
            element: document.querySelector('.js-status')
        }));
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */


    _createClass(Status, [{
        key: 'render',
        value: function render() {
            var self = this;
            var suffix = _index2.default.state.items.length !== 1 ? 's' : '';

            self.element.innerHTML = _index2.default.state.items.length + ' item' + suffix;
        }
    }]);

    return Status;
}(_component2.default);

exports.default = Status;

/***/ }),

/***/ "./src/lib/component.js":
/*!******************************!*\
  !*** ./src/lib/component.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _items = __webpack_require__(/*! ../todo/items.js */ "./src/todo/items.js");

var _items2 = _interopRequireDefault(_items);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // We're importing the store Class here so we can test against it in the constructor


var Component = function Component() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Component);

    var self = this;

    // We're setting a render function as the one set by whatever inherits this base
    // class or setting it to an empty by default. This is so nothing breaks if someone
    // forgets to set it.
    this.render = this.render || function () {};

    // If there's a store passed in, subscribe to the state change
    if (props.items instanceof _items2.default) {
        props.items.events.subscribe('stateChange', function () {
            return self.render();
        });
    }

    // Store the HTML element to attach the render to if set
    if (props.hasOwnProperty('element')) {
        this.element = props.element;
    }
};

exports.default = Component;

/***/ }),

/***/ "./src/lib/pubsub.js":
/*!***************************!*\
  !*** ./src/lib/pubsub.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PubSub = function () {
    function PubSub() {
        _classCallCheck(this, PubSub);

        this.events = {};
    }

    /**
     * Either create a new event instance for passed `event` name
     * or push a new callback into the existing collection
     *
     * @param {string} event
     * @param {function} callback
     * @returns {number} A count of callbacks for this event
     * @memberof PubSub
     */


    _createClass(PubSub, [{
        key: "subscribe",
        value: function subscribe(event, callback) {

            var self = this;

            // If there's not already an event with this name set in our collection
            // go ahead and create a new one and set it with an empty array, so we don't
            // have to type check it later down-the-line
            if (!self.events.hasOwnProperty(event)) {
                self.events[event] = [];
            }

            // We know we've got an array for this event, so push our callback in there with no fuss
            return self.events[event].push(callback);
        }

        /**
         * If the passed event has callbacks attached to it, loop through each one
         * and call it
         *
         * @param {string} event
         * @param {object} [data={}]
         * @returns {array} The callbacks for this event, or an empty array if no event exits
         * @memberof PubSub
         */

    }, {
        key: "publish",
        value: function publish(event) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var self = this;

            // There's no event to publish to, so bail out
            if (!self.events.hasOwnProperty(event)) {
                return [];
            }

            // Get each subscription and call its callback with the passed data
            return self.events[event].map(function (callback) {
                return callback(data);
            });
        }
    }]);

    return PubSub;
}();

exports.default = PubSub;

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./todo/index.js */ "./src/todo/index.js");

var _index2 = _interopRequireDefault(_index);

var _count = __webpack_require__(/*! ./components/count.js */ "./src/components/count.js");

var _count2 = _interopRequireDefault(_count);

var _list = __webpack_require__(/*! ./components/list.js */ "./src/components/list.js");

var _list2 = _interopRequireDefault(_list);

var _status = __webpack_require__(/*! ./components/status.js */ "./src/components/status.js");

var _status2 = _interopRequireDefault(_status);

var _roomslist = __webpack_require__(/*! ./components/roomslist.js */ "./src/components/roomslist.js");

var _roomslist2 = _interopRequireDefault(_roomslist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Load up some DOM elements


// Load up components
var formElement = document.querySelector('.js-form');
var inputElement = document.querySelector('#new-item-field');

// Add a submit event listener to the form and prevent it from posting back
formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();

    // Grab the text value of the textbox and trim any whitespace off it
    var value = inputElement.value.trim();

    // If there's some content, trigger the action and clear the field, ready for the next item
    if (value.length) {
        _index2.default.dispatch('addItem', value);
        inputElement.value = '';
        inputElement.focus();
    }
});

// Instantiate components
var countInstance = new _count2.default({ 'componentElement': '[data-count]' });
var listInstance = new _list2.default();
var statusInstance = new _status2.default();

var rooms = new _roomslist2.default({ 'componentElement': '[room-listing]' });

// Initial renders
countInstance.render();
listInstance.render();
statusInstance.render();
rooms.render();
//
// setInterval(() => {
//     this.age++; // |this| properly refers to the Person object
//   }, 1000);

/***/ }),

/***/ "./src/templates/count-template.js":
/*!*****************************************!*\
  !*** ./src/templates/count-template.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (storeState) {
  return '<small>You\'ve done</small><span>' + storeState.items.length + '</span><small>thing' + (storeState.items.length !== 1 ? 's' : '') + ' today ' + (storeState.items.length > 0 ? '🙌' : '😢') + '</small>';
};

/***/ }),

/***/ "./src/templates/roomlist-template.js":
/*!********************************************!*\
  !*** ./src/templates/roomlist-template.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (room) {
  return "" + room.name;
};

/***/ }),

/***/ "./src/todo/actions.js":
/*!*****************************!*\
  !*** ./src/todo/actions.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    addItem: function addItem(context, payload) {
        context.commit('addItem', payload);
    },
    clearItem: function clearItem(context, payload) {
        context.commit('clearItem', payload);
    }
};

/***/ }),

/***/ "./src/todo/index.js":
/*!***************************!*\
  !*** ./src/todo/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = __webpack_require__(/*! ./actions.js */ "./src/todo/actions.js");

var _actions2 = _interopRequireDefault(_actions);

var _mutations = __webpack_require__(/*! ./mutations.js */ "./src/todo/mutations.js");

var _mutations2 = _interopRequireDefault(_mutations);

var _state = __webpack_require__(/*! ./state.js */ "./src/todo/state.js");

var _state2 = _interopRequireDefault(_state);

var _items = __webpack_require__(/*! ./items.js */ "./src/todo/items.js");

var _items2 = _interopRequireDefault(_items);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _items2.default({
    actions: _actions2.default,
    mutations: _mutations2.default,
    state: _state2.default
});

/***/ }),

/***/ "./src/todo/items.js":
/*!***************************!*\
  !*** ./src/todo/items.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pubsub = __webpack_require__(/*! ../lib/pubsub.js */ "./src/lib/pubsub.js");

var _pubsub2 = _interopRequireDefault(_pubsub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Items = function () {
    function Items(params) {
        _classCallCheck(this, Items);

        var self = this;

        // Add some default objects to hold our actions, mutations and state
        self.actions = {};
        self.mutations = {};
        self.state = {};

        // A status enum to set during actions and mutations
        self.status = 'resting';

        // Attach our PubSub module as an `events` element
        self.events = new _pubsub2.default();

        // Look in the passed params object for actions and mutations
        // that might have been passed in
        if (params.hasOwnProperty('actions')) {
            self.actions = params.actions;
        }

        if (params.hasOwnProperty('mutations')) {
            self.mutations = params.mutations;
        }

        // Set our state to be a Proxy. We are setting the default state by
        // checking the params and defaulting to an empty object if no default
        // state is passed in
        self.state = new Proxy(params.state || {}, {
            set: function set(state, key, value) {

                // Set the value as we would normally
                state[key] = value;

                // Trace out to the console. This will be grouped by the related action
                console.log('stateChange: ' + key + ': ' + value);

                // Publish the change event for the components that are listening
                self.events.publish('stateChange', self.state);

                // Give the user a little telling off if they set a value directly
                if (self.status !== 'mutation') {
                    console.warn('You should use a mutation to set ' + key);
                }

                // Reset the status ready for the next operation
                self.status = 'resting';

                return true;
            }
        });
    }

    /**
     * A dispatcher for actions that looks in the actions
     * collection and runs the action if it can find it
     *
     * @param {string} actionKey
     * @param {mixed} payload
     * @returns {boolean}
     * @memberof Store
     */


    _createClass(Items, [{
        key: 'dispatch',
        value: function dispatch(actionKey, payload) {

            var self = this;

            // Run a quick check to see if the action actually exists
            // before we try to run it
            if (typeof self.actions[actionKey] !== 'function') {
                console.error('Action "' + actionKey + ' doesn\'t exist.');
                return false;
            }

            // Create a console group which will contain the logs from our Proxy etc
            console.groupCollapsed('ACTION: ' + actionKey);

            // Let anything that's watching the status know that we're dispatching an action
            self.status = 'action';

            // Actually call the action and pass it the Store context and whatever payload was passed
            self.actions[actionKey](self, payload);

            // Close our console group to keep things nice and neat
            console.groupEnd();

            return true;
        }

        /**
         * Look for a mutation and modify the state object
         * if that mutation exists by calling it
         *
         * @param {string} mutationKey
         * @param {mixed} payload
         * @returns {boolean}
         * @memberof Store
         */

    }, {
        key: 'commit',
        value: function commit(mutationKey, payload) {
            var self = this;

            // Run a quick check to see if this mutation actually exists
            // before trying to run it
            if (typeof self.mutations[mutationKey] !== 'function') {
                console.log('Mutation "' + mutationKey + '" doesn\'t exist');
                return false;
            }

            // Let anything that's watching the status know that we're mutating state
            self.status = 'mutation';

            // Get a new version of the state by running the mutation and storing the result of it
            var newState = self.mutations[mutationKey](self.state, payload);

            // Merge the old and new together to create a new state and set it
            self.state = Object.assign(self.state, newState);

            return true;
        }
    }]);

    return Items;
}();

exports.default = Items;

/***/ }),

/***/ "./src/todo/mutations.js":
/*!*******************************!*\
  !*** ./src/todo/mutations.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    addItem: function addItem(state, payload) {
        state.items.push(payload);

        return state;
    },
    clearItem: function clearItem(state, payload) {
        state.items.splice(payload.index, 1);

        return state;
    }
};

/***/ }),

/***/ "./src/todo/state.js":
/*!***************************!*\
  !*** ./src/todo/state.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    items: ['I made this', 'Another thing']
};

/***/ })

/******/ });
//# sourceMappingURL=js-components.js.map