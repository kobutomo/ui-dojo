(window["webpackJsonpui-dojo"]=window["webpackJsonpui-dojo"]||[]).push([[0],[,function(e,t,a){e.exports={slider01:"slider_slider01__1Jedr",eyecatch:"slider_eyecatch__29dtS",eyecatchActive:"slider_eyecatchActive__2StEn",thumbnails:"slider_thumbnails__vyuaf",thumbnailActive:"slider_thumbnailActive__2W3Yy",input:"slider_input__1hc2d",drag:"slider_drag__emvih",slider01_editable:"slider_slider01_editable__1JeY5",remove:"slider_remove__19IR2"}},function(e,t,a){e.exports={tabs:"tabs_tabs__3u88I",item:"tabs_item__3LwEo",current:"tabs_current__1oumv",fromLeft:"tabs_fromLeft__2ICN2",fromRight:"tabs_fromRight__3Dugv",toLeft:"tabs_toLeft__nrvNT",toRight:"tabs_toRight__1eRec"}},function(e,t,a){e.exports={ratingStar01:"ratingStar_ratingStar01__L3KFR",active:"ratingStar_active__PZOO6",num:"ratingStar_num__1P0z5",ratingStar02:"ratingStar_ratingStar02__QcaBB"}},,,,function(e,t,a){e.exports={switch01:"switch_switch01__2IDmt",ball:"switch_ball__3AnAE",active:"switch_active__3Pokn"}},,,,function(e,t,a){e.exports=a.p+"static/media/slider01.521b16f7.jpg"},function(e,t,a){e.exports=a.p+"static/media/slider02.c97a47a1.jpg"},function(e,t,a){e.exports=a.p+"static/media/slider03.21341982.jpg"},function(e,t,a){e.exports=a(22)},,,,,function(e,t,a){},,function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(9),i=a.n(r),l=(a(19),a(10)),s=a(4),o=a(11),u=a.n(o),m=a(12),f=a.n(m),p=a(13),d=a.n(p),v=a(3),E=a.n(v),g=function(e){var t=e.rating,a=Math.floor(t);return c.a.createElement("div",{className:E.a.ratingStar02},c.a.createElement("span",{onTouchEnd:function(t){e.changeRating(1),t.preventDefault()},onClick:function(){return e.changeRating(1)}},c.a.createElement("span",null,"\u2605"),c.a.createElement("span",{className:a>=1?E.a.active:void 0},"\u2605")),c.a.createElement("span",{onTouchEnd:function(t){e.changeRating(2),t.preventDefault()},onClick:function(){return e.changeRating(2)}},c.a.createElement("span",null,"\u2605"),c.a.createElement("span",{className:a>=2?E.a.active:void 0},"\u2605")),c.a.createElement("span",{onTouchEnd:function(t){e.changeRating(3),t.preventDefault()},onClick:function(){return e.changeRating(3)}},c.a.createElement("span",null,"\u2605"),c.a.createElement("span",{className:a>=3?E.a.active:void 0},"\u2605")),c.a.createElement("span",{onTouchEnd:function(t){e.changeRating(4),t.preventDefault()},onClick:function(){return e.changeRating(4)}},c.a.createElement("span",null,"\u2605"),c.a.createElement("span",{className:a>=4?E.a.active:void 0},"\u2605")),c.a.createElement("span",{onTouchEnd:function(t){e.changeRating(5),t.preventDefault()},onClick:function(){return e.changeRating(5)}},c.a.createElement("span",null,"\u2605"),c.a.createElement("span",{className:a>=5?E.a.active:void 0},"\u2605")),c.a.createElement("p",{className:E.a.num},t))},h=function(e){var t=e.rating,a=Math.floor(t),n=t-a,r=0===n?0:.5+.5*(n-.5);return c.a.createElement("div",{className:E.a.ratingStar01},c.a.createElement("span",null,c.a.createElement("span",null,"\u2605"),c.a.createElement("span",{className:a>=0?E.a.active:void 0},"\u2605")),c.a.createElement("span",null,c.a.createElement("span",null,"\u2605"),c.a.createElement("span",{className:a>=1?E.a.active:void 0,style:1===a?{width:100*r+"%"}:void 0},"\u2605")),c.a.createElement("span",null,c.a.createElement("span",null,"\u2605"),c.a.createElement("span",{className:a>=2?E.a.active:void 0,style:2===a?{width:100*r+"%"}:void 0},"\u2605")),c.a.createElement("span",null,c.a.createElement("span",null,"\u2605"),c.a.createElement("span",{className:a>=3?E.a.active:void 0,style:3===a?{width:100*r+"%"}:void 0},"\u2605")),c.a.createElement("span",null,c.a.createElement("span",null,"\u2605"),c.a.createElement("span",{className:a>=4?E.a.active:void 0,style:4===a?{width:100*r+"%"}:void 0},"\u2605")),c.a.createElement("p",{className:E.a.num},t))},b=a(5),_=a.n(b),y=a(6),w=a(1),N=a.n(w),T=function(e){return new Promise(function(t){return setTimeout(t,e)})},O=function(e){var t=e.images[0],a=Object(n.useState)(t),r=Object(s.a)(a,2),i=r[0],l=r[1],o=Object(n.useRef)(null);function u(e){return m.apply(this,arguments)}function m(){return(m=Object(y.a)(_.a.mark(function e(t){var a;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a=o.current)){e.next=7;break}return a.classList.remove(N.a.eyecatchActive),e.next=5,T(230);case 5:l(t),a.classList.add(N.a.eyecatchActive);case 7:case"end":return e.stop()}},e)}))).apply(this,arguments)}return c.a.createElement("div",{className:N.a.slider01},c.a.createElement("div",{className:N.a.eyecatch+" "+N.a.eyecatchActive,ref:o},c.a.createElement("img",{src:i,alt:""})),c.a.createElement("ul",{className:N.a.thumbnails},e.images.map(function(e){return c.a.createElement("li",{className:e===i?N.a.thumbnailActive:void 0,key:e,onTouchEnd:function(t){t.preventDefault(),u(e)},onClick:function(){u(e)}},c.a.createElement("img",{src:e,alt:""}))})))},j=function(e){return new Promise(function(t){return setTimeout(t,e)})},x=function(e){var t=e.images[0]||"",a=Object(n.useState)(t),r=Object(s.a)(a,2),i=r[0],l=r[1],o=i.length>0,u=Object(n.useState)(o),m=Object(s.a)(u,2),f=m[0],p=m[1],d=Object(n.useRef)(null);function v(e){return E.apply(this,arguments)}function E(){return(E=Object(y.a)(_.a.mark(function e(t){var a;return _.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a=d.current)){e.next=7;break}return a.classList.remove(N.a.eyecatchActive),e.next=5,j(230);case 5:l(t),a.classList.add(N.a.eyecatchActive);case 7:case"end":return e.stop()}},e)}))).apply(this,arguments)}function g(e){return h.apply(this,arguments)}function h(){return(h=Object(y.a)(_.a.mark(function t(a){var n,c;return _.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return(n=e.images.concat()).splice(a,1),t.next=4,e.setState(n);case 4:c=0===a?1:a-1,0===n.length?p(!1):v(e.images[c]);case 6:case"end":return t.stop()}},t)}))).apply(this,arguments)}return c.a.createElement("div",{className:N.a.slider01+" "+N.a.slider01_editable},c.a.createElement("div",{className:N.a.eyecatch+" "+N.a.eyecatchActive,ref:d},function(){if(f)return c.a.createElement("img",{src:i,alt:""})}()),c.a.createElement("ul",{className:N.a.thumbnails},e.images.map(function(e,t){return c.a.createElement("li",{className:e===i?N.a.thumbnailActive:void 0,key:e,onTouchEnd:function(t){t.preventDefault(),v(e)},onClick:function(){v(e)}},c.a.createElement("img",{src:e,alt:""}),c.a.createElement("div",{className:N.a.remove,onTouchEnd:function(e){e.preventDefault(),g(t)},onClick:function(){g(t)}}))}),function(){if(3!==e.images.length)return c.a.createElement("li",{className:N.a.input},c.a.createElement("label",{onDragOver:function(e){e.currentTarget.classList.add(N.a.drag)},onDragLeave:function(e){e.currentTarget.classList.remove(N.a.drag)},onDrop:function(e){e.currentTarget.classList.remove(N.a.drag)}},c.a.createElement("input",{type:"file",onChange:function(t){t.target.files&&function(t){for(var a=e.images.concat(),n=0;n<t.length;n++){var c=new FileReader,r=t[n];c.onload=function(){this.result&&(a.push(this.result.toString()),e.setState(a),1===a.length&&(v(this.result.toString()),p(!0)))},c.readAsDataURL(r)}}(t.target.files)}}),c.a.createElement("span",null,"\u753b\u50cf\u3092\u8ffd\u52a0")))}()))},S=a(7),k=a.n(S),A=function(){var e=Object(n.useState)(!1),t=Object(s.a)(e,2),a=t[0],r=t[1],i=function(){r(function(e){return!e})},l=a?k.a.switch01+" "+k.a.active:k.a.switch01;return c.a.createElement("div",null,c.a.createElement("div",{className:l,onClick:function(e){return i()},onTouchEnd:function(e){e.preventDefault(),i()}},c.a.createElement("div",{className:k.a.ball})))},R=a(2),D=a.n(R),I=function(){var e=Object(n.useState)({prevTabIndex:0,currentTabIndex:0}),t=Object(s.a)(e,2),a=t[0],r=t[1],i=[c.a.createElement("p",null,"TAB01\u306e\u4e2d\u8eab",c.a.createElement("span",{role:"img","aria-label":"face"},"\ud83d\ude0c")),c.a.createElement("p",null,"TAB02\u306e\u4e2d\u8eab",c.a.createElement("span",{role:"img","aria-label":"face"},"\ud83d\ude19")),c.a.createElement("p",null,"TAB03\u306e\u4e2d\u8eab",c.a.createElement("span",{role:"img","aria-label":"face"},"\ud83d\ude01")),c.a.createElement("p",null,"TAB04\u306e\u4e2d\u8eab",c.a.createElement("span",{role:"img","aria-label":"face"},"\ud83d\ude0e"),c.a.createElement("span",{role:"img","aria-label":"hands"},"\ud83d\ude4c"))],l=function(e){var t=a.currentTabIndex;r({prevTabIndex:t,currentTabIndex:e})},o=function(e){return e===a.currentTabIndex?e>a.prevTabIndex?"".concat(D.a.item," ").concat(D.a.current," ").concat(D.a.fromLeft):e<a.prevTabIndex?"".concat(D.a.item," ").concat(D.a.current," ").concat(D.a.fromRight):"".concat(D.a.item," ").concat(D.a.current," ").concat(D.a.fromLeft):e===a.prevTabIndex?e>a.currentTabIndex?"".concat(D.a.item," ").concat(D.a.toLeft):e<a.currentTabIndex?"".concat(D.a.item," ").concat(D.a.toRight):D.a.item:D.a.item};return c.a.createElement("div",null,c.a.createElement("ul",{className:D.a.tabs},["TAB01","TAB02","TAB03","TAB04"].map(function(e,t){return c.a.createElement("li",{className:o(t),key:t,onClick:function(e){l(t)},onTouchEnd:function(e){e.preventDefault(),l(t)}},c.a.createElement("span",null,e))})),c.a.createElement("div",{className:D.a.content},i[a.currentTabIndex]))};function L(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function P(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?L(a,!0).forEach(function(t){Object(l.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):L(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var B=function(){var e=Object(n.useState)({rating:0,images:[]}),t=Object(s.a)(e,2),a=t[0],r=t[1];return c.a.createElement("div",{id:"container"},c.a.createElement("h2",null,"\u753b\u50cf\u30ae\u30e3\u30e9\u30ea\u30fc(readonly)"),c.a.createElement(O,{images:[u.a,f.a,d.a]}),c.a.createElement("h2",null,"\u753b\u50cf\u30ae\u30e3\u30e9\u30ea\u30fc(\u7de8\u96c6\u7528)"),c.a.createElement(x,{images:a.images,setState:function(e){r(P({},a,{images:e}))}}),c.a.createElement("h2",null,"\u30bf\u30d6\u5207\u308a\u66ff\u3048"),c.a.createElement(I,null),c.a.createElement("h2",null,"\u7d30\u304b\u3044\u30d1\u30fc\u30c4"),c.a.createElement("div",{className:"flex"},c.a.createElement("div",{className:"star1"},c.a.createElement("p",{className:"subTit"},"\u2606\u306e\u3084\u3064\uff08readonly\uff09"),c.a.createElement(h,{rating:3.5})),c.a.createElement("div",{className:"star2"},c.a.createElement("p",null,"\u7de8\u96c6\u7528"),c.a.createElement(g,{rating:a.rating,changeRating:function(e){r(P({},a,{rating:e}))}})),c.a.createElement("div",null,c.a.createElement("p",{className:"subTit"},"iOS\u306e\u30a2\u30ec"),c.a.createElement(A,null))))},C=(a(21),function(){return c.a.createElement("div",{className:"App"},c.a.createElement("header",null,c.a.createElement("h1",null,"\u30d5\u30eb\u30b9\u30af\u30e9\u30c3\u30c1UI\u9053\u5834"),c.a.createElement("p",{className:"lead"},"\u3044\u308d\u3093\u306aUI\uff08react\u30b3\u30f3\u30dd\u30fc\u30cd\u30f3\u30c8\uff09\u3092\u4f5c\u3063\u3066\u30e0\u30ad\u30e0\u30ad\u306b\u306a\u308d\u3046\uff01")),c.a.createElement(B,null))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(c.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[14,1,2]]]);
//# sourceMappingURL=main.a9c590f2.chunk.js.map