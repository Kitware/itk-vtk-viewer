(self.webpackChunkitkVtkViewer=self.webpackChunkitkVtkViewer||[]).push([[159],{4264:(t,e,r)=>{t.exports=r(7588)},7588:t=>{var e=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function c(t,e,r,n){var o=e&&e.prototype instanceof v?e:v,i=Object.create(o.prototype),a=new T(n||[]);return i._invoke=function(t,e,r){var n=f;return function(o,i){if(n===p)throw new Error("Generator is already running");if(n===y){if("throw"===o)throw i;return A()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var s=j(a,r);if(s){if(s===d)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=y,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var u=l(t,e,r);if("normal"===u.type){if(n=r.done?y:h,u.arg===d)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=y,r.method="throw",r.arg=u.arg)}}}(t,r,a),i}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var f="suspendedStart",h="suspendedYield",p="executing",y="completed",d={};function v(){}function g(){}function m(){}var w={};w[i]=function(){return this};var b=Object.getPrototypeOf,k=b&&b(b(I([])));k&&k!==r&&n.call(k,i)&&(w=k);var _=m.prototype=v.prototype=Object.create(w);function x(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function O(t,e){function r(o,i,a,s){var u=l(t[o],t,i);if("throw"!==u.type){var c=u.arg,f=c.value;return f&&"object"==typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,a,s)}),(function(t){r("throw",t,a,s)})):e.resolve(f).then((function(t){c.value=t,a(c)}),(function(t){return r("throw",t,a,s)}))}s(u.arg)}var o;this._invoke=function(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}}function j(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,j(t,r),"throw"===r.method))return d;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var o=l(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,d;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,d):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,d)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function I(t){if(t){var r=t[i];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:A}}function A(){return{value:e,done:!0}}return g.prototype=_.constructor=m,m.constructor=g,g.displayName=u(m,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,u(t,s,"GeneratorFunction")),t.prototype=Object.create(_),t},t.awrap=function(t){return{__await:t}},x(O.prototype),O.prototype[a]=function(){return this},t.AsyncIterator=O,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new O(c(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(_),u(_,s,"Generator"),_[i]=function(){return this},_.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=I,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(L),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return s.type="throw",s.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),c=n.call(a,"finallyLoc");if(u&&c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:I(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),d}},t}(t.exports);try{regeneratorRuntime=e}catch(t){Function("r","regeneratorRuntime = r")(e)}},474:(t,e,r)=>{"use strict";var n=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var r=[],n=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(t){o=!0,i=t}finally{try{!n&&s.return&&s.return()}finally{if(o)throw i}}return r}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},o=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=function t(e,r,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,r);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,r,n)}if("value"in o)return o.value;var a=o.get;return void 0!==a?a.call(n):void 0};function a(t){if(Array.isArray(t)){for(var e=0,r=Array(t.length);e<t.length;e++)r[e]=t[e];return r}return Array.from(t)}var s=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var r=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return r._messageId=1,r._messages=new Map,r._worker=t,r._worker.onmessage=r._onMessage.bind(r),r._id=Math.ceil(1e7*Math.random()),r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),o(e,[{key:"terminate",value:function(){this._worker.terminate()}},{key:"isFree",value:function(){return 0===this._messages.size}},{key:"jobsLength",value:function(){return this._messages.size}},{key:"exec",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],o=arguments[3];return new Promise((function(i,a){var s=r._messageId++;r._messages.set(s,[i,a,o]),r._worker.postMessage([s,e,t],n||[])}))}},{key:"postMessage",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments[2];return new Promise((function(o,i){var a=e._messageId++;e._messages.set(a,[o,i,n]),e._worker.postMessage([a,t],r||[])}))}},{key:"emit",value:function(t){for(var e=arguments.length,r=Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];this._worker.postMessage({eventName:t,args:r})}},{key:"_onMessage",value:function(t){var r;if(!Array.isArray(t.data)&&t.data.eventName)return(r=i(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"emit",this)).call.apply(r,[this,t.data.eventName].concat(a(t.data.args)));var n,o=(n=t.data,Array.isArray(n)?n:Array.from(n)),s=o[0],u=o.slice(1);if(1===s)this._onEvent.apply(this,a(u));else{if(0!==s)throw new Error("Wrong message type '"+s+"'");this._onResult.apply(this,a(u))}}},{key:"_onResult",value:function(t,e,r){var o=this._messages.get(t),i=n(o,2),a=i[0],s=i[1];return this._messages.delete(t),1===e?a(r):s(r)}},{key:"_onEvent",value:function(t,e,r){var o=this._messages.get(t),i=n(o,3)[2];i&&i(e,r)}}]),e}(r(6603));t.exports=s},8211:(t,e,r)=>{"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.d(e,{Z:()=>n})},5754:(t,e,r)=>{"use strict";function n(t){if(Array.isArray(t))return t}r.d(e,{Z:()=>n})},3218:(t,e,r)=>{"use strict";r.d(e,{Z:()=>o});var n=r(8211);function o(t){if(Array.isArray(t))return(0,n.Z)(t)}},4390:(t,e,r)=>{"use strict";function n(t,e,r,n,o,i,a){try{var s=t[i](a),u=s.value}catch(t){return void r(t)}s.done?e(u):Promise.resolve(u).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function s(t){n(a,o,i,s,u,"next",t)}function u(t){n(a,o,i,s,u,"throw",t)}s(void 0)}))}}r.d(e,{Z:()=>o})},8270:(t,e,r)=>{"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,{Z:()=>n})},7012:(t,e,r)=>{"use strict";function n(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}r.d(e,{Z:()=>n})},5683:(t,e,r)=>{"use strict";function n(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i=[],a=!0,s=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);a=!0);}catch(t){s=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(s)throw o}}return i}}r.d(e,{Z:()=>n})},514:(t,e,r)=>{"use strict";function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}r.d(e,{Z:()=>n})},4773:(t,e,r)=>{"use strict";function n(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}r.d(e,{Z:()=>n})},4641:(t,e,r)=>{"use strict";r.d(e,{Z:()=>s});var n=r(5754),o=r(5683),i=r(1883),a=r(514);function s(t,e){return(0,n.Z)(t)||(0,o.Z)(t,e)||(0,i.Z)(t,e)||(0,a.Z)()}},3486:(t,e,r)=>{"use strict";r.d(e,{Z:()=>s});var n=r(3218),o=r(7012),i=r(1883),a=r(4773);function s(t){return(0,n.Z)(t)||(0,o.Z)(t)||(0,i.Z)(t)||(0,a.Z)()}},1883:(t,e,r)=>{"use strict";r.d(e,{Z:()=>o});var n=r(8211);function o(t,e){if(t){if("string"==typeof t)return(0,n.Z)(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?(0,n.Z)(t,e):void 0}}},16:(t,e,r)=>{"use strict";r.d(e,{Z:()=>n});const n=class{constructor(t,e){this.fcn=e,this.workerQueue=new Array(t),this.workerQueue.fill(null),this.runInfo=[]}runTasks(t,e=null){const r={taskQueue:[],results:[],addingTasks:!1,postponed:!1,runningWorkers:0,index:0,completedTasks:0,progressCallback:e,canceled:!1};return this.runInfo.push(r),r.index=this.runInfo.length-1,{promise:new Promise(((e,n)=>{r.resolve=e,r.reject=n,r.results=new Array(t.length),r.completedTasks=0,r.addingTasks=!0,t.forEach(((t,e)=>{this.addTask(r.index,e,t)})),r.addingTasks=!1})),runId:r.index}}terminateWorkers(){for(let t=0;t<this.workerQueue.length;t++){const e=this.workerQueue[t];null!=e&&e.terminate(),this.workerQueue[t]=null}}cancel(t){const e=this.runInfo[t];null!=e&&(e.canceled=!0)}addTask(t,e,r){const n=this.runInfo[t];if(!0===(null==n?void 0:n.canceled))return n.reject("Remaining tasks canceled"),void this.clearTask(n.index);if(this.workerQueue.length>0){const o=this.workerQueue.pop();n.runningWorkers++,this.fcn(o,...r).then((r=>{var{webWorker:o}=r,i=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(t);o<n.length;o++)e.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(t,n[o])&&(r[n[o]]=t[n[o]])}return r}(r,["webWorker"]);if(this.workerQueue.push(o),null!==this.runInfo[t])if(n.runningWorkers--,n.results[e]=i,n.completedTasks++,null!=n.progressCallback&&n.progressCallback(n.completedTasks,n.results.length),n.taskQueue.length>0){const e=n.taskQueue.shift();this.addTask(t,e[0],e[1])}else if(!n.addingTasks&&0===n.runningWorkers){const t=n.results;n.resolve(t),this.clearTask(n.index)}})).catch((t=>{n.reject(t),this.clearTask(n.index)}))}else 0!==n.runningWorkers||n.postponed?n.taskQueue.push([e,r]):(n.postponed=!0,setTimeout((()=>{n.postponed=!1,this.addTask(n.index,e,r)}),50))}clearTask(t){this.runInfo[t].results=[],this.runInfo[t].taskQueue=[],this.runInfo[t].progressCallback=null,this.runInfo[t].canceled=null,this.runInfo[t].reject=()=>{},this.runInfo[t].resolve=()=>{}}}}}]);