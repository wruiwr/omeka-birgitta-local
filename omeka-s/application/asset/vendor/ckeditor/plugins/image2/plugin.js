/*
 Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function(){function E(a){function b(){this.deflated||(a.widgets.focused==this.widget&&(this.focused=!0),a.widgets.destroy(this.widget),this.deflated=!0)}function h(){var d=a.editable(),c=a.document;if(this.deflated)this.widget=a.widgets.initOn(this.element,"image",this.widget.data),this.widget.inline&&!(new CKEDITOR.dom.elementPath(this.widget.wrapper,d)).block&&(d=c.createElement(a.activeEnterMode==CKEDITOR.ENTER_P?"p":"div"),d.replace(this.widget.wrapper),this.widget.wrapper.move(d)),this.focused&&
(this.widget.focus(),delete this.focused),delete this.deflated;else{var f=this.widget,d=e,c=f.wrapper,b=f.data.align,f=f.data.hasCaption;if(d){for(var x=3;x--;)c.removeClass(d[x]);"center"==b?f&&c.addClass(d[1]):"none"!=b&&c.addClass(d[q[b]])}else"center"==b?(f?c.setStyle("text-align","center"):c.removeStyle("text-align"),c.removeStyle("float")):("none"==b?c.removeStyle("float"):c.setStyle("float",b),c.removeStyle("text-align"))}}var e=a.config.image2_alignClasses,g=a.config.image2_captionedClass;
return{allowedContent:F(a),requiredContent:"img[src,alt]",features:G(a),styleableElements:"img figure",contentTransformations:[["img[width]: sizeToAttribute"]],editables:{caption:{selector:"figcaption",allowedContent:"br em strong sub sup u s; a[!href,target]"}},parts:{image:"img",caption:"figcaption"},dialog:"image2",template:'\x3cimg alt\x3d"" src\x3d"" /\x3e',data:function(){var d=this.features;this.data.hasCaption&&!a.filter.checkFeature(d.caption)&&(this.data.hasCaption=!1);"none"==this.data.align||
a.filter.checkFeature(d.align)||(this.data.align="none");this.shiftState({widget:this,element:this.element,oldData:this.oldData,newData:this.data,deflate:b,inflate:h});this.data.link?this.parts.link||(this.parts.link=this.parts.image.getParent()):this.parts.link&&delete this.parts.link;this.parts.image.setAttributes({src:this.data.src,"data-cke-saved-src":this.data.src,alt:this.data.alt});if(this.oldData&&!this.oldData.hasCaption&&this.data.hasCaption)for(var c in this.data.classes)this.parts.image.removeClass(c);
if(a.filter.checkFeature(d.dimension)){d=this.data;d={width:d.width,height:d.height};c=this.parts.image;for(var e in d)d[e]?c.setAttribute(e,d[e]):c.removeAttribute(e)}this.oldData=CKEDITOR.tools.extend({},this.data)},init:function(){var d=CKEDITOR.plugins.image2,c=this.parts.image,b={hasCaption:!!this.parts.caption,src:c.getAttribute("src"),alt:c.getAttribute("alt")||"",width:c.getAttribute("width")||"",height:c.getAttribute("height")||"",lock:this.ready?d.checkHasNaturalRatio(c):!0},h=c.getAscendant("a");
h&&this.wrapper.contains(h)&&(this.parts.link=h);b.align||(c=b.hasCaption?this.element:c,e?(c.hasClass(e[0])?b.align="left":c.hasClass(e[2])&&(b.align="right"),b.align?c.removeClass(e[q[b.align]]):b.align="none"):(b.align=c.getStyle("float")||"none",c.removeStyle("float")));a.plugins.link&&this.parts.link&&(b.link=d.getLinkAttributesParser()(a,this.parts.link),(c=b.link.advanced)&&c.advCSSClasses&&(c.advCSSClasses=CKEDITOR.tools.trim(c.advCSSClasses.replace(/cke_\S+/,""))));this.wrapper[(b.hasCaption?
"remove":"add")+"Class"]("cke_image_nocaption");this.setData(b);a.filter.checkFeature(this.features.dimension)&&!0!==a.config.image2_disableResizer&&H(this);this.shiftState=d.stateShifter(this.editor);this.on("contextMenu",function(a){a.data.image=CKEDITOR.TRISTATE_OFF;if(this.parts.link||this.wrapper.getAscendant("a"))a.data.link=a.data.unlink=CKEDITOR.TRISTATE_OFF});this.on("dialog",function(a){a.data.widget=this},this)},addClass:function(a){m(this).addClass(a)},hasClass:function(a){return m(this).hasClass(a)},
removeClass:function(a){m(this).removeClass(a)},getClasses:function(){var a=new RegExp("^("+[].concat(g,e).join("|")+")$");return function(){var c=this.repository.parseElementClasses(m(this).getAttribute("class")),b;for(b in c)a.test(b)&&delete c[b];return c}}(),upcast:I(a),downcast:J(a),getLabel:function(){return this.editor.lang.widget.label.replace(/%1/,(this.data.alt||"")+" "+this.pathName)}}}function I(a){var b=n(a),h=a.config.image2_captionedClass;return function(a,g){var d={width:1,height:1},
c=a.name,f;if(!a.attributes["data-cke-realelement"]&&(b(a)?("div"==c&&(f=a.getFirst("figure"))&&(a.replaceWith(f),a=f),g.align="center",f=a.getFirst("img")||a.getFirst("a").getFirst("img")):"figure"==c&&a.hasClass(h)?f=a.find(function(a){return"img"===a.name&&-1!==CKEDITOR.tools.array.indexOf(["figure","a"],a.parent.name)},!0)[0]:r(a)&&(f="a"==a.name?a.children[0]:a),f)){for(var D in d)(d=f.attributes[D])&&d.match(K)&&delete f.attributes[D];return a}}}function J(a){var b=a.config.image2_alignClasses;
return function(a){var e="a"==a.name?a.getFirst():a,g=e.attributes,d=this.data.align;if(!this.inline){var c=a.getFirst("span");c&&c.replaceWith(c.getFirst({img:1,a:1}))}d&&"none"!=d&&(c=CKEDITOR.tools.parseCssText(g.style||""),"center"==d&&"figure"==a.name?a=a.wrapWith(new CKEDITOR.htmlParser.element("div",b?{"class":b[1]}:{style:"text-align:center"})):d in{left:1,right:1}&&(b?e.addClass(b[q[d]]):c["float"]=d),b||CKEDITOR.tools.isEmpty(c)||(g.style=CKEDITOR.tools.writeCssText(c)));return a}}function n(a){var b=
a.config.image2_captionedClass,h=a.config.image2_alignClasses,e={figure:1,a:1,img:1};return function(g){if(!(g.name in{div:1,p:1}))return!1;var d=g.children;if(1!==d.length)return!1;d=d[0];if(!(d.name in e))return!1;if("p"==g.name){if(!r(d))return!1}else if("figure"==d.name){if(!d.hasClass(b))return!1}else if(a.enterMode==CKEDITOR.ENTER_P||!r(d))return!1;return(h?g.hasClass(h[1]):"center"==CKEDITOR.tools.parseCssText(g.attributes.style||"",!0)["text-align"])?!0:!1}}function r(a){return"img"==a.name?
!0:"a"==a.name?1==a.children.length&&a.getFirst("img"):!1}function H(a){var b=a.editor,h=b.editable(),e=b.document,g=a.resizer=e.createElement("span");g.addClass("cke_image_resizer");g.setAttribute("title",b.lang.image2.resizer);g.append(new CKEDITOR.dom.text("​",e));if(a.inline)a.wrapper.append(g);else{var d=a.parts.link||a.parts.image,c=d.getParent(),f=e.createElement("span");f.addClass("cke_image_resizer_wrapper");f.append(d);f.append(g);a.element.append(f,!0);c.is("span")&&c.remove()}g.on("mousedown",
function(c){function d(a,c,b){var x=CKEDITOR.document,l=[];e.equals(x)||l.push(x.on(a,c));l.push(e.on(a,c));if(b)for(a=l.length;a--;)b.push(l.pop())}function t(){u=m+B*y;v=Math.round(u/w)}function l(){v=q-p;u=Math.round(v*w)}var f=a.parts.image,B="right"==a.data.align?-1:1,k=c.data.$.screenX,L=c.data.$.screenY,m=f.$.clientWidth,q=f.$.clientHeight,w=m/q,n=[],r="cke_image_s"+(~B?"e":"w"),C,u,v,A,y,p,z;b.fire("saveSnapshot");d("mousemove",function(a){C=a.data.$;y=C.screenX-k;p=L-C.screenY;z=Math.abs(y/
p);1==B?0>=y?0>=p?t():z>=w?t():l():0>=p?z>=w?l():t():l():0>=y?0>=p?z>=w?l():t():l():0>=p?t():z>=w?t():l();15<=u&&15<=v?(f.setAttributes({width:u,height:v}),A=!0):A=!1},n);d("mouseup",function(){for(var c;c=n.pop();)c.removeListener();h.removeClass(r);g.removeClass("cke_image_resizing");A&&(a.setData({width:u,height:v}),b.fire("saveSnapshot"));A=!1},n);h.addClass(r);g.addClass("cke_image_resizing")});a.on("data",function(){g["right"==a.data.align?"addClass":"removeClass"]("cke_image_resizer_left")})}
function M(a){var b=[],h;return function(e){var g=a.getCommand("justify"+e);if(g){b.push(function(){g.refresh(a,a.elementPath())});if(e in{right:1,left:1,center:1})g.on("exec",function(d){var c=k(a);if(c){c.setData("align",e);for(c=b.length;c--;)b[c]();d.cancel()}});g.on("refresh",function(b){var c=k(a),g={right:1,left:1,center:1};c&&(void 0===h&&(h=a.filter.checkFeature(a.widgets.registered.image.features.align)),h?this.setState(c.data.align==e?CKEDITOR.TRISTATE_ON:e in g?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED):
this.setState(CKEDITOR.TRISTATE_DISABLED),b.cancel())})}}}function N(a){if(a.plugins.link){var b=CKEDITOR.on("dialogDefinition",function(b){b=b.data;if("link"==b.name){b=b.definition;var e=b.onShow,g=b.onOk;b.onShow=function(){var b=k(a),c=this.getContentElement("info","linkDisplayText").getElement().getParent().getParent();b&&(b.inline?!b.wrapper.getAscendant("a"):1)?(this.setupContent(b.data.link||{}),c.hide()):(c.show(),e.apply(this,arguments))};b.onOk=function(){var b=k(a);if(b&&(b.inline?!b.wrapper.getAscendant("a"):
1)){var c={};this.commitContent(c);b.setData("link",c)}else g.apply(this,arguments)}}});a.on("destroy",function(){b.removeListener()});a.getCommand("unlink").on("exec",function(b){var e=k(a);e&&e.parts.link&&(e.setData("link",null),this.refresh(a,a.elementPath()),b.cancel())});a.getCommand("unlink").on("refresh",function(b){var e=k(a);e&&(this.setState(e.data.link||e.wrapper.getAscendant("a")?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED),b.cancel())})}}function k(a){return(a=a.widgets.focused)&&
"image"==a.name?a:null}function F(a){var b=a.config.image2_alignClasses;a={div:{match:n(a)},p:{match:n(a)},img:{attributes:"!src,alt,width,height"},figure:{classes:"!"+a.config.image2_captionedClass},figcaption:!0};b?(a.div.classes=b[1],a.p.classes=a.div.classes,a.img.classes=b[0]+","+b[2],a.figure.classes+=","+a.img.classes):(a.div.styles="text-align",a.p.styles="text-align",a.img.styles="float",a.figure.styles="float,display");return a}function G(a){a=a.config.image2_alignClasses;return{dimension:{requiredContent:"img[width,height]"},
align:{requiredContent:"img"+(a?"("+a[0]+")":"{float}")},caption:{requiredContent:"figcaption"}}}function m(a){return a.data.hasCaption?a.element:a.parts.image}var O=new CKEDITOR.template('\x3cfigure class\x3d"{captionedClass}"\x3e\x3cimg alt\x3d"" src\x3d"" /\x3e\x3cfigcaption\x3e{captionPlaceholder}\x3c/figcaption\x3e\x3c/figure\x3e'),q={left:0,center:1,right:2},K=/^\s*(\d+\%)\s*$/i;CKEDITOR.plugins.add("image2",{lang:"af,ar,az,bg,bn,bs,ca,cs,cy,da,de,de-ch,el,en,en-au,en-ca,en-gb,eo,es,es-mx,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,oc,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn",
requires:"widget,dialog",icons:"image",hidpi:!0,onLoad:function(){CKEDITOR.addCss('.cke_image_nocaption{line-height:0}.cke_editable.cke_image_sw, .cke_editable.cke_image_sw *{cursor:sw-resize !important}.cke_editable.cke_image_se, .cke_editable.cke_image_se *{cursor:se-resize !important}.cke_image_resizer{display:none;position:absolute;width:10px;height:10px;bottom:-5px;right:-5px;background:#000;outline:1px solid #fff;line-height:0;cursor:se-resize;}.cke_image_resizer_wrapper{position:relative;display:inline-block;line-height:0;}.cke_image_resizer.cke_image_resizer_left{right:auto;left:-5px;cursor:sw-resize;}.cke_widget_wrapper:hover .cke_image_resizer,.cke_image_resizer.cke_image_resizing{display:block}.cke_editable[contenteditable\x3d"false"] .cke_image_resizer{display:none;}.cke_widget_wrapper\x3ea{display:inline-block}')},
init:function(a){if(!a.plugins.detectConflict("image2",["easyimage"])){var b=a.config,h=a.lang.image2,e=E(a);b.filebrowserImage2BrowseUrl=b.filebrowserImageBrowseUrl;b.filebrowserImage2UploadUrl=b.filebrowserImageUploadUrl;e.pathName=h.pathName;e.editables.caption.pathName=h.pathNameCaption;a.widgets.add("image",e);a.ui.addButton&&a.ui.addButton("Image",{label:a.lang.common.image,command:"image",toolbar:"insert,10"});a.contextMenu&&(a.addMenuGroup("image",10),a.addMenuItem("image",{label:h.menu,command:"image",
group:"image"}));CKEDITOR.dialog.add("image2",this.path+"dialogs/image2.js")}},afterInit:function(a){var b={left:1,right:1,center:1,block:1},h=M(a),e;for(e in b)h(e);N(a)}});CKEDITOR.plugins.image2={stateShifter:function(a){function b(a,b){var c={};g?c.attributes={"class":g[1]}:c.styles={"text-align":"center"};c=e.createElement(a.activeEnterMode==CKEDITOR.ENTER_P?"p":"div",c);h(c,b);b.move(c);return c}function h(b,d){if(d.getParent()){var e=a.createRange();e.moveToPosition(d,CKEDITOR.POSITION_BEFORE_START);
d.remove();c.insertElementIntoRange(b,e)}else b.replace(d)}var e=a.document,g=a.config.image2_alignClasses,d=a.config.image2_captionedClass,c=a.editable(),f=["hasCaption","align","link"],k={align:function(c,d,e){var f=c.element;c.changed.align?c.newData.hasCaption||("center"==e&&(c.deflate(),c.element=b(a,f)),c.changed.hasCaption||"center"!=d||"center"==e||(c.deflate(),d=f.findOne("a,img"),d.replace(f),c.element=d)):"center"==e&&c.changed.hasCaption&&!c.newData.hasCaption&&(c.deflate(),c.element=
b(a,f));!g&&f.is("figure")&&("center"==e?f.setStyle("display","inline-block"):f.removeStyle("display"))},hasCaption:function(b,c,l){b.changed.hasCaption&&(c=b.element.is({img:1,a:1})?b.element:b.element.findOne("a,img"),b.deflate(),l?(l=CKEDITOR.dom.element.createFromHtml(O.output({captionedClass:d,captionPlaceholder:a.lang.image2.captionPlaceholder}),e),h(l,b.element),c.replace(l.findOne("img")),b.element=l):(c.replace(b.element),b.element=c))},link:function(b,c,d){if(b.changed.link){var f=b.element.is("img")?
b.element:b.element.findOne("img"),g=b.element.is("a")?b.element:b.element.findOne("a"),h=b.element.is("a")&&!d||b.element.is("img")&&d,k;h&&b.deflate();d?(c||(k=e.createElement("a",{attributes:{href:b.newData.link.url}}),k.replace(f),f.move(k)),d=CKEDITOR.plugins.image2.getLinkAttributesGetter()(a,d),CKEDITOR.tools.isEmpty(d.set)||(k||g).setAttributes(d.set),d.removed.length&&(k||g).removeAttributes(d.removed)):(d=g.findOne("img"),d.replace(g),k=d);h&&(b.element=k)}}};return function(a){var b,c;
a.changed={};for(c=0;c<f.length;c++)b=f[c],a.changed[b]=a.oldData?a.oldData[b]!==a.newData[b]:!1;for(c=0;c<f.length;c++)b=f[c],k[b](a,a.oldData?a.oldData[b]:null,a.newData[b]);a.inflate()}},checkHasNaturalRatio:function(a){var b=a.$;a=this.getNatural(a);return Math.round(b.clientWidth/a.width*a.height)==b.clientHeight||Math.round(b.clientHeight/a.height*a.width)==b.clientWidth},getNatural:function(a){if(a.$.naturalWidth)a={width:a.$.naturalWidth,height:a.$.naturalHeight};else{var b=new Image;b.src=
a.getAttribute("src");a={width:b.width,height:b.height}}return a},getLinkAttributesGetter:function(){return CKEDITOR.plugins.link.getLinkAttributes},getLinkAttributesParser:function(){return CKEDITOR.plugins.link.parseLinkAttributes}}})();CKEDITOR.config.image2_captionedClass="image";