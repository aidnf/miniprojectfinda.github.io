// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

require({cache:{"url:widgets/CostAnalysis/project-attribute.html":'\x3cdiv style\x3d"height: 100%; width: 100%"\x3e\r\n  \x3cdiv class\x3d"esriCTContentSection"\x3e\r\n    \x3cdiv class\x3d"esriCTProjectAttributeTitle"\x3e\r\n      ${nls.projectAttribute.projectAttributeTitle}\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"projectAttributeNode"\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"esriCTPageFooter"\x3e\r\n    \x3cdiv class\x3d"jimu-btn esriCTEllipsis" data-dojo-attach-point\x3d"okButton" tabindex\x3d"0" role\x3d"button" aria-label\x3d"${nls.common.ok}"\x3e${nls.common.ok}\x3c/div\x3e\r\n    \x3cdiv class\x3d"jimu-btn esriCTEllipsis" data-dojo-attach-point\x3d"cancelButton" tabindex\x3d"0" role\x3d"button" aria-label\x3d"${nls.common.cancel}"\x3e${nls.common.cancel}\x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare jimu/BaseWidget jimu/utils dojo/Evented dijit/layout/ContentPane dijit/_WidgetsInTemplateMixin dojo/text!./project-attribute.html dojo/_base/lang dojo/_base/array dojo/dom-style dojo/on dojo/dom-construct dojo/dom-class esri/dijit/AttributeInspector esri/layers/FeatureLayer esri/tasks/query dojo/query dijit/registry dijit/focus dojo/keys dojo/_base/event dojo/dom-attr".split(" "),function(r,t,l,u,v,w,x,e,g,y,h,m,p,z,A,B,C,n,D,k,q,f){return r([t,u,w],{templateString:x,baseClass:"jimu-widget-cost-analysis-project-attribute",
projectInfo:null,_projectLayerInfo:null,_updatedFeature:null,_attributeInspector:null,postCreate:function(){this.inherited(arguments);this.onProjectLoad(this.projectInfo)},startup:function(){this.inherited(arguments);this.own(h(this.okButton,"click",e.hitch(this,function(){this._onOkButtonClicked()})));this.own(h(this.okButton,"keydown",e.hitch(this,function(b){if(b.keyCode===k.ENTER||b.keyCode===k.SPACE)q.stop(b),this._onOkButtonClicked()})));this.own(h(this.cancelButton,"click",e.hitch(this,function(){this.emit("onCancelButtonClicked")})));
this.own(h(this.cancelButton,"keydown",e.hitch(this,function(b){if(b.keyCode===k.ENTER||b.keyCode===k.SPACE)q.stop(b),this.emit("onCancelButtonClicked")})))},_onOkButtonClicked:function(){this._updatedFeature&&this._updatedFeature.getLayer().applyEdits(null,[this._updatedFeature],null,e.hitch(this,function(b,c,a){c[0].success&&this.emit("onProjectInfoUpdate",this._updatedFeature)}));this.emit("onOkButtonClicked")},onProjectLoad:function(b){this.projectInfo=b;b=this.config.projectSettings.projectLayer;
this.projectInfo.projectId&&b&&(this._projectLayerInfo=this.layerInfosObj.getLayerInfoById(b),this._loadAttributeInspector())},editProjectAttributes:function(){var b="";if(this._projectLayerInfo){this.loadingIndicator.show();var c=Date.now();this._updatedFeature=null;var a=new B;(b=this._projectLayerInfo.layerObject.getDefinitionExpression())&&this._projectLayerInfo.layerObject.setDefinitionExpression("");a.where=this._projectLayerInfo.layerObject.globalIdField+" \x3d '"+this.projectInfo.projectId+
"' AND "+c+" \x3d "+c;this._projectLayerInfo.layerObject.selectFeatures(a,A.SELECTION_NEW,e.hitch(this,function(d){this._updatedFeature=d[0];this._attributeInspector&&(this._attributeInspector.refresh(),y.set(this._attributeInspector.attributeTable,"display",""),this._attributeInspector.attributeTable&&this._attributeInspector.attributeTable.childNodes&&0<this._attributeInspector.attributeTable.childNodes.length&&f.set(this._attributeInspector.attributeTable.childNodes[0],"cellspacing","1"));this.loadingIndicator.hide();
b&&this._projectLayerInfo.layerObject.setDefinitionExpression(b);this._add508SupportToATI()}))}},mergeFirstToLast:function(){for(var b={},c=arguments.length-1,a;0<=c;c--)for(a in arguments[c])arguments[c].hasOwnProperty(a)&&(b[a]=arguments[c][a]);return b},_getFieldInfosFromLayer:function(b){var c=[];b&&b.layerObject&&g.forEach(b.layerObject.fields,function(a){var d=l.getDefaultPortalFieldInfo(a);d=this.mergeFirstToLast(d,a);d.format&&d.format.dateFormat&&d.format.dateFormat.toLowerCase()&&0<=d.format.dateFormat.toLowerCase().indexOf("time")&&
(d.format.time=!0);d.visible=!0;c.push(d)},this);return c},_createFieldInfos:function(){var b=this._projectLayerInfo.controlPopupInfo&&this._projectLayerInfo.controlPopupInfo.enablePopup&&this._projectLayerInfo.controlPopupInfo.infoTemplate?e.clone(this._projectLayerInfo.controlPopupInfo.infoTemplate.info.fieldInfos):this._getFieldInfosFromLayer(this._projectLayerInfo);var c=[];g.forEach(b,e.hitch(this,function(a){if(a.visible){if("projectname"===a.fieldName.toLowerCase()||"totalassetcost"===a.fieldName.toLowerCase()||
"grossprojectcost"===a.fieldName.toLowerCase())a.isEditable=!1;c.push(a)}}));return c},_loadAttributeInspector:function(){if(this._projectLayerInfo){var b=this._createFieldInfos();m.empty(this.projectAttributeNode);var c=new v({style:{padding:"0"}},m.create("div",{},this.projectAttributeNode));this._attributeInspector=new z({layerInfos:[{featureLayer:this._projectLayerInfo.layerObject,showAttachments:!1,isEditable:!0,fieldInfos:b}]},m.create("div"));this._attributeInspector.on("attribute-change",
e.hitch(this,function(a){this._updatedFeature.attributes[a.fieldName]=a.fieldValue}));p.add(this._attributeInspector.layerName,"esriCTHidden");p.add(this._attributeInspector.editButtons,"esriCTHidden");c.setContent(this._attributeInspector.domNode)}},_add508SupportToATI:function(){var b;if(this._attributeInspector&&this._attributeInspector.domNode){var c=n.findWidgets(this._attributeInspector.domNode);g.forEach(c,e.hitch(this,function(a){a.focusNode&&!b&&(b=a.focusNode,l.initFirstFocusNode(this.widgetDomNode,
a.focusNode),D.focus(a.focusNode));a.hasOwnProperty("focusNode")&&a.focusNode.disabled&&(f.set(a.focusNode,"disabled",!1),f.set(a.focusNode,"tabindex",0),f.set(a.focusNode,"readOnly",!0),f.set(a.focusNode,"aria-disabled","true"))}));(c=C("td.atiLabel",this._attributeInspector.domNode))&&g.forEach(c,e.hitch(this,function(a){var d=this._getAttrInspectorRowInfo(a);d&&(d[0].set("aria-label",d[1]),1<a.parentNode.childNodes[1].childNodes.length&&(a=a.parentNode.childNodes[1].childNodes[1],a=n.getEnclosingWidget(a),
a.set("aria-label",d[1])))}))}l.initLastFocusNode(this.widgetDomNode,this.cancelButton)},_getAttrInspectorRowInfo:function(b){try{if(b&&b.parentNode){var c=b.parentNode.childNodes[1].childNodes[0];return[n.getEnclosingWidget(c),b.childNodes[0].data,c]}return null}catch(a){return console.log(a),null}}})});