(self.webpackChunkitkVtkViewer=self.webpackChunkitkVtkViewer||[]).push([[880],{4559:(e,t,r)=>{e.exports=r(9335)},1786:(e,t,r)=>{"use strict";var n=r(8266),a=r(5608),i=r(159),o=r(9568),s=r(3943),u=r(8201),c=r(1745),l=r(7979);e.exports=function(e){return new Promise((function(t,r){var f=e.data,p=e.headers,d=e.responseType;n.isFormData(f)&&delete p["Content-Type"];var h=new XMLHttpRequest;if(e.auth){var m=e.auth.username||"",y=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";p.Authorization="Basic "+btoa(m+":"+y)}var b=s(e.baseURL,e.url);function g(){if(h){var n="getAllResponseHeaders"in h?u(h.getAllResponseHeaders()):null,i={data:d&&"text"!==d&&"json"!==d?h.response:h.responseText,status:h.status,statusText:h.statusText,headers:n,config:e,request:h};a(t,r,i),h=null}}if(h.open(e.method.toUpperCase(),o(b,e.params,e.paramsSerializer),!0),h.timeout=e.timeout,"onloadend"in h?h.onloadend=g:h.onreadystatechange=function(){h&&4===h.readyState&&(0!==h.status||h.responseURL&&0===h.responseURL.indexOf("file:"))&&setTimeout(g)},h.onabort=function(){h&&(r(l("Request aborted",e,"ECONNABORTED",h)),h=null)},h.onerror=function(){r(l("Network Error",e,null,h)),h=null},h.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(l(t,e,e.transitional&&e.transitional.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",h)),h=null},n.isStandardBrowserEnv()){var w=(e.withCredentials||c(b))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;w&&(p[e.xsrfHeaderName]=w)}"setRequestHeader"in h&&n.forEach(p,(function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete p[t]:h.setRequestHeader(t,e)})),n.isUndefined(e.withCredentials)||(h.withCredentials=!!e.withCredentials),d&&"json"!==d&&(h.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&h.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&h.upload&&h.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){h&&(h.abort(),r(e),h=null)})),f||(f=null),h.send(f)}))}},9335:(e,t,r)=>{"use strict";var n=r(8266),a=r(4345),i=r(7929),o=r(650);function s(e){var t=new i(e),r=a(i.prototype.request,t);return n.extend(r,i.prototype,t),n.extend(r,t),r}var u=s(r(9046));u.Axios=i,u.create=function(e){return s(o(u.defaults,e))},u.Cancel=r(9760),u.CancelToken=r(7510),u.isCancel=r(8825),u.all=function(e){return Promise.all(e)},u.spread=r(4346),u.isAxiosError=r(3276),e.exports=u,e.exports.default=u},9760:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},7510:(e,t,r)=>{"use strict";var n=r(9760);function a(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new n(e),t(r.reason))}))}a.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},a.source=function(){var e;return{token:new a((function(t){e=t})),cancel:e}},e.exports=a},8825:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},7929:(e,t,r)=>{"use strict";var n=r(8266),a=r(9568),i=r(6252),o=r(6029),s=r(650),u=r(123),c=u.validators;function l(e){this.defaults=e,this.interceptors={request:new i,response:new i}}l.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=s(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=e.transitional;void 0!==t&&u.assertOptions(t,{silentJSONParsing:c.transitional(c.boolean,"1.0.0"),forcedJSONParsing:c.transitional(c.boolean,"1.0.0"),clarifyTimeoutError:c.transitional(c.boolean,"1.0.0")},!1);var r=[],n=!0;this.interceptors.request.forEach((function(t){"function"==typeof t.runWhen&&!1===t.runWhen(e)||(n=n&&t.synchronous,r.unshift(t.fulfilled,t.rejected))}));var a,i=[];if(this.interceptors.response.forEach((function(e){i.push(e.fulfilled,e.rejected)})),!n){var l=[o,void 0];for(Array.prototype.unshift.apply(l,r),l.concat(i),a=Promise.resolve(e);l.length;)a=a.then(l.shift(),l.shift());return a}for(var f=e;r.length;){var p=r.shift(),d=r.shift();try{f=p(f)}catch(e){d(e);break}}try{a=o(f)}catch(e){return Promise.reject(e)}for(;i.length;)a=a.then(i.shift(),i.shift());return a},l.prototype.getUri=function(e){return e=s(this.defaults,e),a(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],(function(e){l.prototype[e]=function(t,r){return this.request(s(r||{},{method:e,url:t,data:(r||{}).data}))}})),n.forEach(["post","put","patch"],(function(e){l.prototype[e]=function(t,r,n){return this.request(s(n||{},{method:e,url:t,data:r}))}})),e.exports=l},6252:(e,t,r)=>{"use strict";var n=r(8266);function a(){this.handlers=[]}a.prototype.use=function(e,t,r){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!r&&r.synchronous,runWhen:r?r.runWhen:null}),this.handlers.length-1},a.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},a.prototype.forEach=function(e){n.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=a},3943:(e,t,r)=>{"use strict";var n=r(406),a=r(5027);e.exports=function(e,t){return e&&!n(t)?a(e,t):t}},7979:(e,t,r)=>{"use strict";var n=r(2050);e.exports=function(e,t,r,a,i){var o=new Error(e);return n(o,t,r,a,i)}},6029:(e,t,r)=>{"use strict";var n=r(8266),a=r(2661),i=r(8825),o=r(9046);function s(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return s(e),e.headers=e.headers||{},e.data=a.call(e,e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),n.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||o.adapter)(e).then((function(t){return s(e),t.data=a.call(e,t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(s(e),t&&t.response&&(t.response.data=a.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},2050:e=>{"use strict";e.exports=function(e,t,r,n,a){return e.config=t,r&&(e.code=r),e.request=n,e.response=a,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},650:(e,t,r)=>{"use strict";var n=r(8266);e.exports=function(e,t){t=t||{};var r={},a=["url","method","data"],i=["headers","auth","proxy","params"],o=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],s=["validateStatus"];function u(e,t){return n.isPlainObject(e)&&n.isPlainObject(t)?n.merge(e,t):n.isPlainObject(t)?n.merge({},t):n.isArray(t)?t.slice():t}function c(a){n.isUndefined(t[a])?n.isUndefined(e[a])||(r[a]=u(void 0,e[a])):r[a]=u(e[a],t[a])}n.forEach(a,(function(e){n.isUndefined(t[e])||(r[e]=u(void 0,t[e]))})),n.forEach(i,c),n.forEach(o,(function(a){n.isUndefined(t[a])?n.isUndefined(e[a])||(r[a]=u(void 0,e[a])):r[a]=u(void 0,t[a])})),n.forEach(s,(function(n){n in t?r[n]=u(e[n],t[n]):n in e&&(r[n]=u(void 0,e[n]))}));var l=a.concat(i).concat(o).concat(s),f=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===l.indexOf(e)}));return n.forEach(f,c),r}},5608:(e,t,r)=>{"use strict";var n=r(7979);e.exports=function(e,t,r){var a=r.config.validateStatus;r.status&&a&&!a(r.status)?t(n("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}},2661:(e,t,r)=>{"use strict";var n=r(8266),a=r(9046);e.exports=function(e,t,r){var i=this||a;return n.forEach(r,(function(r){e=r.call(i,e,t)})),e}},9046:(e,t,r)=>{"use strict";var n=r(8266),a=r(1490),i=r(2050),o={"Content-Type":"application/x-www-form-urlencoded"};function s(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var u,c={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(u=r(1786)),u),transformRequest:[function(e,t){return a(t,"Accept"),a(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(s(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)||t&&"application/json"===t["Content-Type"]?(s(t,"application/json"),JSON.stringify(e)):e}],transformResponse:[function(e){var t=this.transitional,r=t&&t.silentJSONParsing,a=t&&t.forcedJSONParsing,o=!r&&"json"===this.responseType;if(o||a&&n.isString(e)&&e.length)try{return JSON.parse(e)}catch(e){if(o){if("SyntaxError"===e.name)throw i(e,this,"E_JSON_PARSE");throw e}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};n.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),n.forEach(["post","put","patch"],(function(e){c.headers[e]=n.merge(o)})),e.exports=c},4345:e=>{"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},9568:(e,t,r)=>{"use strict";var n=r(8266);function a(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var i;if(r)i=r(t);else if(n.isURLSearchParams(t))i=t.toString();else{var o=[];n.forEach(t,(function(e,t){null!=e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,(function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),o.push(a(t)+"="+a(e))})))})),i=o.join("&")}if(i){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}},5027:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},159:(e,t,r)=>{"use strict";var n=r(8266);e.exports=n.isStandardBrowserEnv()?{write:function(e,t,r,a,i,o){var s=[];s.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&s.push("expires="+new Date(r).toGMTString()),n.isString(a)&&s.push("path="+a),n.isString(i)&&s.push("domain="+i),!0===o&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},406:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},3276:e=>{"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}},1745:(e,t,r)=>{"use strict";var n=r(8266);e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function a(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=a(window.location.href),function(t){var r=n.isString(t)?a(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},1490:(e,t,r)=>{"use strict";var n=r(8266);e.exports=function(e,t){n.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}},8201:(e,t,r)=>{"use strict";var n=r(8266),a=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,i,o={};return e?(n.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=n.trim(e.substr(0,i)).toLowerCase(),r=n.trim(e.substr(i+1)),t){if(o[t]&&a.indexOf(t)>=0)return;o[t]="set-cookie"===t?(o[t]?o[t]:[]).concat([r]):o[t]?o[t]+", "+r:r}})),o):o}},4346:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},123:(e,t,r)=>{"use strict";var n=r(8593),a={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){a[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}}));var i={},o=n.version.split(".");function s(e,t){for(var r=t?t.split("."):o,n=e.split("."),a=0;a<3;a++){if(r[a]>n[a])return!0;if(r[a]<n[a])return!1}return!1}a.transitional=function(e,t,r){var a=t&&s(t);function o(e,t){return"[Axios v"+n.version+"] Transitional option '"+e+"'"+t+(r?". "+r:"")}return function(r,n,s){if(!1===e)throw new Error(o(n," has been removed in "+t));return a&&!i[n]&&(i[n]=!0,console.warn(o(n," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(r,n,s)}},e.exports={isOlderVersion:s,assertOptions:function(e,t,r){if("object"!=typeof e)throw new TypeError("options must be an object");for(var n=Object.keys(e),a=n.length;a-- >0;){var i=n[a],o=t[i];if(o){var s=e[i],u=void 0===s||o(s,i,e);if(!0!==u)throw new TypeError("option "+i+" must be "+u)}else if(!0!==r)throw Error("Unknown option "+i)}},validators:a}},8266:(e,t,r)=>{"use strict";var n=r(4345),a=Object.prototype.toString;function i(e){return"[object Array]"===a.call(e)}function o(e){return void 0===e}function s(e){return null!==e&&"object"==typeof e}function u(e){if("[object Object]"!==a.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function c(e){return"[object Function]"===a.call(e)}function l(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),i(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.call(null,e[a],a,e)}e.exports={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===a.call(e)},isBuffer:function(e){return null!==e&&!o(e)&&null!==e.constructor&&!o(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isPlainObject:u,isUndefined:o,isDate:function(e){return"[object Date]"===a.call(e)},isFile:function(e){return"[object File]"===a.call(e)},isBlob:function(e){return"[object Blob]"===a.call(e)},isFunction:c,isStream:function(e){return s(e)&&c(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:l,merge:function e(){var t={};function r(r,n){u(t[n])&&u(r)?t[n]=e(t[n],r):u(r)?t[n]=e({},r):i(r)?t[n]=r.slice():t[n]=r}for(var n=0,a=arguments.length;n<a;n++)l(arguments[n],r);return t},extend:function(e,t,r){return l(t,(function(t,a){e[a]=r&&"function"==typeof t?n(t,r):t})),e},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},6603:e=>{"use strict";var t=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),r=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),Object.defineProperty(this,"__listeners",{value:{},enumerable:!1,writable:!1})}return t(e,[{key:"emit",value:function(e){if(!this.__listeners[e])return this;for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];var a=!0,i=!1,o=void 0;try{for(var s,u=this.__listeners[e][Symbol.iterator]();!(a=(s=u.next()).done);a=!0){var c=s.value;c.apply(void 0,r)}}catch(e){i=!0,o=e}finally{try{!a&&u.return&&u.return()}finally{if(i)throw o}}return this}},{key:"once",value:function(e,t){var r=this;return this.on(e,(function n(){r.off(e,n),t.apply(void 0,arguments)}))}},{key:"on",value:function(e,t){return this.__listeners[e]||(this.__listeners[e]=[]),this.__listeners[e].push(t),this}},{key:"off",value:function(e,t){return this.__listeners[e]=t?this.__listeners[e].filter((function(e){return e!==t})):[],this}}]),e}();e.exports=r},5334:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});const n={Float32:"float32",Float64:"float64",SpacePrecisionType:"float64"}},4712:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});const n={Text:"Text",Binary:"Binary",Image:"Image",Mesh:"Mesh"}},9377:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});const n={Int8:"int8",UInt8:"uint8",Int16:"int16",UInt16:"uint16",Int32:"int32",UInt32:"uint32",Int64:"int64",UInt64:"uint64",SizeValueType:"uint64",IdentifierType:"uint64",IndexValueType:"int64",OffsetValueType:"int64"}},8155:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});const n={TextFile:"InterfaceTextFile",BinaryFile:"InterfaceBinaryFile",TextStream:"InterfaceTextStream",BinaryStream:"InterfaceBinaryStream",Image:"InterfaceImage",Mesh:"InterfaceMesh",PolyData:"InterfacePolyData",JsonObject:"InterfaceJsonObject"}},7008:(e,t,r)=>{"use strict";r.d(t,{Z:()=>i});var n=r(9377),a=r(5334);const i=function(e,t){let r=null;switch(e){case n.Z.UInt8:r=new Uint8Array(t);break;case n.Z.Int8:r=new Int8Array(t);break;case n.Z.UInt16:r=new Uint16Array(t);break;case n.Z.Int16:r=new Int16Array(t);break;case n.Z.UInt32:r=new Uint32Array(t);break;case n.Z.Int32:r=new Int32Array(t);break;case n.Z.UInt64:r="function"==typeof globalThis.BigUint64Array?new BigUint64Array(t):new Uint8Array(t);break;case n.Z.Int64:r="function"==typeof globalThis.BigInt64Array?new BigInt64Array(t):new Uint8Array(t);break;case a.Z.Float32:r=new Float32Array(t);break;case a.Z.Float64:r=new Float64Array(t);break;case"null":case null:r=null;break;default:throw new Error("Type is not supported as a TypedArray")}return r}},602:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});const n="function"==typeof globalThis.SharedArrayBuffer,a=function(e){let t=null;return void 0!==e.buffer?t=e.buffer:void 0!==e.byteLength&&(t=e),t&&n&&t instanceof SharedArrayBuffer?null:t}},1593:(e,t,r)=>{"use strict";r.d(t,{Z:()=>b});var n=r(8155),a=r(4712),i=r(7008),o=r(5334),s=r(9377);const u="function"==typeof globalThis.SharedArrayBuffer,c=new TextEncoder,l=new TextDecoder("utf-8");function f(e,t){const r=e.fs_open(t,"r"),n=e.fs_stat(t).size;let a=null;a=u?new SharedArrayBuffer(n):new ArrayBuffer(n);const i=new Uint8Array(a);return e.fs_read(r,i,0,n,0),e.fs_close(r),i}function p(e,t,r){let n=null;n=u?new SharedArrayBuffer(r):new ArrayBuffer(r);const a=new Uint8Array(n),i=new Uint8Array(e.HEAPU8.buffer,t,r);return a.set(i),a}function d(e,t,r,n){let a=0;return null!==t&&(a=e.ccall("itk_wasm_input_array_alloc","number",["number","number","number","number"],[0,r,n,t.buffer.byteLength]),e.HEAPU8.set(new Uint8Array(t.buffer),a)),a}function h(e,t,r){const n=JSON.stringify(t),a=e.ccall("itk_wasm_input_json_alloc","number",["number","number","number"],[0,r,n.length]);e.writeAsciiToMemory(n,a,!1)}function m(e,t,r,n){const a=e.ccall("itk_wasm_output_array_address","number",["number","number","number"],[0,t,r]),o=e.ccall("itk_wasm_output_array_size","number",["number","number","number"],[0,t,r]),s=p(e,a,o);return(0,i.Z)(n,s.buffer)}function y(e,t){const r=e.ccall("itk_wasm_output_json_address","number",["number","number"],[0,t]),n=e.AsciiToString(r);return JSON.parse(n)}const b=function(e,t,r,u){null!=u&&u.length>0&&u.forEach((function(t,r){switch(t.type){case n.Z.TextStream:{const n=c.encode(t.data.data),a=d(e,n,r,0),i={size:n.buffer.byteLength,data:`data:application/vnd.itk.address,0:${a}`};h(e,i,r);break}case n.Z.BinaryStream:{const n=t.data.data,a=d(e,n,r,0),i={size:n.buffer.byteLength,data:`data:application/vnd.itk.address,0:${a}`};h(e,i,r);break}case n.Z.TextFile:case n.Z.BinaryFile:e.fs_writeFile(t.data.path,t.data.data);break;case n.Z.Image:{const n=t.data,a=d(e,n.data,r,0),i=d(e,n.direction,r,1),o={imageType:n.imageType,name:n.name,origin:n.origin,spacing:n.spacing,direction:`data:application/vnd.itk.address,0:${i}`,size:n.size,data:`data:application/vnd.itk.address,0:${a}`,metadata:JSON.stringify(Array.from(n.metadata.entries()))};h(e,o,r);break}case n.Z.Mesh:{const n=t.data,a=d(e,n.points,r,0),i=d(e,n.cells,r,1),o=d(e,n.pointData,r,2),s=d(e,n.cellData,r,3),u={meshType:n.meshType,name:n.name,numberOfPoints:n.numberOfPoints,points:`data:application/vnd.itk.address,0:${a}`,numberOfCells:n.numberOfCells,cells:`data:application/vnd.itk.address,0:${i}`,cellBufferSize:n.cellBufferSize,numberOfPointPixels:n.numberOfPointPixels,pointData:`data:application/vnd.itk.address,0:${o}`,numberOfCellPixels:n.numberOfCellPixels,cellData:`data:application/vnd.itk.address,0:${s}`};h(e,u,r);break}case n.Z.PolyData:{const n=t.data,a=d(e,n.points,r,0),i=d(e,n.vertices,r,1),o=d(e,n.lines,r,2),s=d(e,n.polygons,r,3),u=d(e,n.triangleStrips,r,4),c=d(e,n.pointData,r,5),l=d(e,n.pointData,r,6),f={polyDataType:n.polyDataType,name:n.name,numberOfPoints:n.numberOfPoints,points:`data:application/vnd.itk.address,0:${a}`,verticesBufferSize:n.verticesBufferSize,vertices:`data:application/vnd.itk.address,0:${i}`,linesBufferSize:n.linesBufferSize,lines:`data:application/vnd.itk.address,0:${o}`,polygonsBufferSize:n.polygonsBufferSize,polygons:`data:application/vnd.itk.address,0:${s}`,triangleStripsBufferSize:n.triangleStripsBufferSize,triangleStrips:`data:application/vnd.itk.address,0:${u}`,numberOfPointPixels:n.numberOfPointPixels,pointData:`data:application/vnd.itk.address,0:${c}`,numberOfCellPixels:n.numberOfCellPixels,cellData:`data:application/vnd.itk.address,0:${l}`};h(e,f,r);break}case a.Z.Text:case a.Z.Binary:e.fs_writeFile(t.path,t.data);break;case a.Z.Image:{const r=t.data,n={imageType:r.imageType,name:r.name,origin:r.origin,spacing:r.spacing,direction:"data:application/vnd.itk.path,data/direction.raw",size:r.size,data:"data:application/vnd.itk.path,data/data.raw"};if(e.fs_mkdirs(`${t.path}/data`),e.fs_writeFile(`${t.path}/index.json`,JSON.stringify(n)),null===r.data)throw Error("image.data is null");e.fs_writeFile(`${t.path}/data/data.raw`,new Uint8Array(r.data.buffer)),e.fs_writeFile(`${t.path}/data/direction.raw`,new Uint8Array(r.direction.buffer));break}case a.Z.Mesh:{const r=t.data,n={meshType:r.meshType,name:r.name,numberOfPoints:r.numberOfPoints,points:"data:application/vnd.itk.path,data/points.raw",numberOfPointPixels:r.numberOfPointPixels,pointData:"data:application/vnd.itk.path,data/pointData.raw",numberOfCells:r.numberOfCells,cells:"data:application/vnd.itk.path,data/cells.raw",numberOfCellPixels:r.numberOfCellPixels,cellData:"data:application/vnd.itk.path,data/cellData.raw",cellBufferSize:r.cellBufferSize};if(e.fs_mkdirs(`${t.path}/data`),e.fs_writeFile(`${t.path}/index.json`,JSON.stringify(n)),n.numberOfPoints>0){if(null===r.points)throw Error("mesh.points is null");e.fs_writeFile(`${t.path}/data/points.raw`,new Uint8Array(r.points.buffer))}if(n.numberOfPointPixels>0){if(null===r.pointData)throw Error("mesh.pointData is null");e.fs_writeFile(`${t.path}/data/pointData.raw`,new Uint8Array(r.pointData.buffer))}if(n.numberOfCells>0){if(null===r.cells)throw Error("mesh.cells is null");e.fs_writeFile(`${t.path}/data/cells.raw`,new Uint8Array(r.cells.buffer))}if(n.numberOfCellPixels>0){if(null===r.cellData)throw Error("mesh.cellData is null");e.fs_writeFile(`${t.path}/data/cellData.raw`,new Uint8Array(r.cellData.buffer))}break}default:throw Error("Unsupported input InterfaceType")}})),e.resetModuleStdout(),e.resetModuleStderr();let b=0;try{b=e.callMain(t.slice())}catch(t){throw"number"==typeof t&&(console.log("Exception while running pipeline:"),console.log("stdout:",e.getModuleStdout()),console.error("stderr:",e.getModuleStderr()),void 0!==e.getExceptionMessage?console.error("exception:",e.getExceptionMessage(t)):console.error("Build module in Debug mode for exception message information.")),t}const g=e.getModuleStdout(),w=e.getModuleStderr(),v=[];return null!=r&&r.length>0&&0===b&&r.forEach((function(t,r){let u=null;switch(t.type){case n.Z.TextStream:{const t=e.ccall("itk_wasm_output_array_address","number",["number","number","number"],[0,r,0]),n=e.ccall("itk_wasm_output_array_size","number",["number","number","number"],[0,r,0]),a=new Uint8Array(e.HEAPU8.buffer,t,n);u={data:l.decode(a)};break}case n.Z.JsonObject:{const t=e.ccall("itk_wasm_output_array_address","number",["number","number","number"],[0,r,0]),n=e.ccall("itk_wasm_output_array_size","number",["number","number","number"],[0,r,0]),a=new Uint8Array(e.HEAPU8.buffer,t,n);u={data:JSON.parse(l.decode(a))};break}case n.Z.BinaryStream:{const t=e.ccall("itk_wasm_output_array_address","number",["number","number","number"],[0,r,0]),n=e.ccall("itk_wasm_output_array_size","number",["number","number","number"],[0,r,0]);u={data:p(e,t,n)};break}case n.Z.TextFile:u={path:t.data.path,data:e.fs_readFile(t.data.path,{encoding:"utf8"})};break;case n.Z.BinaryFile:u={path:t.data.path,data:f(e,t.data.path)};break;case n.Z.Image:{const t=y(e,r);t.data=m(e,r,0,t.imageType.componentType),t.direction=m(e,r,1,o.Z.Float64),t.metadata=new Map(t.metadata),u=t;break}case n.Z.Mesh:{const t=y(e,r);t.numberOfPoints>0?t.points=m(e,r,0,t.meshType.pointComponentType):t.points=(0,i.Z)(t.meshType.pointComponentType,new ArrayBuffer(0)),t.numberOfCells>0?t.cells=m(e,r,1,t.meshType.cellComponentType):t.cells=(0,i.Z)(t.meshType.cellComponentType,new ArrayBuffer(0)),t.numberOfPointPixels>0?t.pointData=m(e,r,2,t.meshType.pointPixelComponentType):t.pointData=(0,i.Z)(t.meshType.pointPixelComponentType,new ArrayBuffer(0)),t.numberOfCellPixels>0?t.cellData=m(e,r,3,t.meshType.cellPixelComponentType):t.cellData=(0,i.Z)(t.meshType.cellPixelComponentType,new ArrayBuffer(0)),u=t;break}case n.Z.PolyData:{const t=y(e,r);t.numberOfPoints>0?t.points=m(e,r,0,o.Z.Float32):t.points=new Float32Array,t.verticesBufferSize>0?t.vertices=m(e,r,1,s.Z.UInt32):t.vertices=new Uint32Array,t.linesBufferSize>0?t.lines=m(e,r,2,s.Z.UInt32):t.lines=new Uint32Array,t.polygonsBufferSize>0?t.polygons=m(e,r,3,s.Z.UInt32):t.polygons=new Uint32Array,t.triangleStripsBufferSize>0?t.triangleStrips=m(e,r,4,s.Z.UInt32):t.triangleStrips=new Uint32Array,t.numberOfPointPixels>0?t.pointData=m(e,r,5,t.polyDataType.pointPixelComponentType):t.pointData=(0,i.Z)(t.polyDataType.pointPixelComponentType,new ArrayBuffer(0)),t.numberOfCellPixels>0?t.cellData=m(e,r,6,t.polyDataType.cellPixelComponentType):t.cellData=(0,i.Z)(t.polyDataType.cellPixelComponentType,new ArrayBuffer(0)),u=t;break}case a.Z.Text:if(void 0===t.path)throw new Error("output.path not defined");u=e.fs_readFile(t.path,{encoding:"utf8"});break;case a.Z.Binary:if(void 0===t.path)throw new Error("output.path not defined");u=f(e,t.path);break;case a.Z.Image:{if(void 0===t.path)throw new Error("output.path not defined");const r=e.fs_readFile(`${t.path}/index.json`,{encoding:"utf8"}),n=JSON.parse(r),a=f(e,`${t.path}/data/data.raw`);n.data=(0,i.Z)(n.imageType.componentType,a.buffer);const s=f(e,`${t.path}/data/direction.raw`);n.direction=(0,i.Z)(o.Z.Float64,s.buffer),u=n;break}case a.Z.Mesh:{if(void 0===t.path)throw new Error("output.path not defined");const r=e.fs_readFile(`${t.path}/index.json`,{encoding:"utf8"}),n=JSON.parse(r);if(n.numberOfPoints>0){const r=f(e,`${t.path}/data/points.raw`);n.points=(0,i.Z)(n.meshType.pointComponentType,r.buffer)}else n.points=(0,i.Z)(n.meshType.pointComponentType,new ArrayBuffer(0));if(n.numberOfPointPixels>0){const r=f(e,`${t.path}/data/pointData.raw`);n.pointData=(0,i.Z)(n.meshType.pointPixelComponentType,r.buffer)}else n.pointData=(0,i.Z)(n.meshType.pointPixelComponentType,new ArrayBuffer(0));if(n.numberOfCells>0){const r=f(e,`${t.path}/data/cells.raw`);n.cells=(0,i.Z)(n.meshType.cellComponentType,r.buffer)}else n.cells=(0,i.Z)(n.meshType.cellComponentType,new ArrayBuffer(0));if(n.numberOfCellPixels>0){const r=f(e,`${t.path}/data/cellData.raw`);n.cellData=(0,i.Z)(n.meshType.cellPixelComponentType,r.buffer)}else n.cellData=(0,i.Z)(n.meshType.cellPixelComponentType,new ArrayBuffer(0));u=n;break}default:throw Error("Unsupported output InterfaceType")}const c={type:t.type,data:u};v.push(c)})),{returnValue:b,stdout:g,stderr:w,outputs:v}}},8593:e=>{"use strict";e.exports=JSON.parse('{"name":"axios","version":"0.21.2","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://axios-http.com","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"jsdelivr":"dist/axios.min.js","unpkg":"dist/axios.min.js","typings":"./index.d.ts","dependencies":{"follow-redirects":"^1.14.0"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}]}')}}]);