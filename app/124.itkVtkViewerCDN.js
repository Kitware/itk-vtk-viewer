!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("itkVtkViewer",[],t):"object"==typeof exports?exports.itkVtkViewer=t():e.itkVtkViewer=t()}(self,(()=>(()=>{"use strict";var e={477:e=>{e.exports=function(e,t,r,o){var n=self||window;try{try{var i;try{i=new n.Blob([e])}catch(t){(i=new(n.BlobBuilder||n.WebKitBlobBuilder||n.MozBlobBuilder||n.MSBlobBuilder)).append(e),i=i.getBlob()}var c=n.URL||n.webkitURL,p=c.createObjectURL(i),a=new n[t](p,r);return c.revokeObjectURL(p),a}catch(o){return new n[t]("data:application/javascript,".concat(encodeURIComponent(e)),r)}}catch(e){if(!o)throw Error("Inline worker is not supported");return new n[t](o,r)}}}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,r),i.exports}return r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r(477),{}})()));