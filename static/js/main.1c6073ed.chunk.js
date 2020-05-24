(this.webpackJsonppatchpalapp=this.webpackJsonppatchpalapp||[]).push([[0],{10:function(e,t,a){e.exports=a(16)},15:function(e,t,a){},16:function(e,t,a){"use strict";a.r(t);var r=a(3),n=a(4),l=a(1),i=a(6),c=a(5),o=a(0),s=a.n(o),u=a(8),h=a.n(u),d=(a(15),a(9));function m(e){var t={number:Math.ceil(e),unit:""};return e>1e3&&(t={number:(e/1e3).toFixed(1),unit:"k"}),t}function p(e){var t,a,r,n;if(e.apparentPower)t=e.apparentPower;else if(e.realPower&&e.powerFactor)t=e.realPower/e.powerFactor;else if(e.realPower)switch(e.lampType){case"LED":case"Discharge":t=e.realPower/.96,a=!0;break;case"Conventional":t=e.realPower;break;case"LED-Strobe":t=e.realPower/.96,a=!0;break;default:t=e.realPower,a=!0}return e.realPower?r=e.realPower:e.apparentPower&&e.powerFactor?t=e.apparentPower*e.powerFactor:e.apparentPower&&(r=e.apparentPower,n=!0),{apparentPower:t,apparentPowerEstimated:a,realPower:r,realPowerEstimated:n}}var f=a(2),v=function(e){Object(i.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).handleFixtureChange=n.handleFixtureChange.bind(Object(l.a)(n)),n.handleMinus=n.handleMinus.bind(Object(l.a)(n)),n.handlePlus=n.handlePlus.bind(Object(l.a)(n)),n}return Object(n.a)(a,[{key:"handleFixtureChange",value:function(e){this.props.onFixtureChange(this.props.fixture.id,e.target.value)}},{key:"handleMinus",value:function(){var e=this.props.fixture.quantity>0?this.props.fixture.quantity-=1:0;this.props.onFixtureChange(this.props.fixture.id,e)}},{key:"handlePlus",value:function(){var e=this.props.fixture.quantity;Number(e)&&Number(e)<99?e=Number(e)+1:99!==Number(e)&&(e=1),this.props.onFixtureChange(this.props.fixture.id,e)}},{key:"render",value:function(){var e=this.props.fixture,t="",a=s.a.createElement("div",null),r=s.a.createElement("div",null);return(e.quantity||0===e.quantity)&&(t=e.quantity,a=s.a.createElement("div",{onClick:this.handleMinus},s.a.createElement(f.e,{className:"plus-minus-icon"})),r=s.a.createElement("form",{className:"quantity-input",onKeyPress:function(e){"Enter"===e.key&&e.preventDefault()}},s.a.createElement("input",{type:"text",pattern:"\\d*",maxLength:"2",value:t,onChange:this.handleFixtureChange,onKeyDown:function(e){return["e","E","+","-"].includes(e.key)&&e.preventDefault()}}))),s.a.createElement("div",{className:"fixture-change"},a,r,s.a.createElement("div",{onClick:this.handlePlus},s.a.createElement(f.a,{className:"plus-minus-icon"})))}}]),a}(s.a.Component),E=function(e){Object(i.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).handleFixtureChange=n.handleFixtureChange.bind(Object(l.a)(n)),n.handleRemoveButtonClick=n.handleRemoveButtonClick.bind(Object(l.a)(n)),n.handleFixtureClick=n.handleFixtureClick.bind(Object(l.a)(n)),n}return Object(n.a)(a,[{key:"handleFixtureChange",value:function(e,t){this.props.onFixtureChange(e,t)}},{key:"handleRemoveButtonClick",value:function(){this.props.onRemoveButtonClick(this.props.fixture.id)}},{key:"handleFixtureClick",value:function(e){this.props.onFixtureClick(this.props.fixture)}},{key:"render",value:function(){var e,t=this.props.fixture,a="";return t.selected&&(a=s.a.createElement("button",{className:"remove-button",type:"button",onClick:this.handleRemoveButtonClick},s.a.createElement(f.k,{className:"remove-button-x"}))),p(t).apparentPower&&(e=Math.ceil(Number(p(t).apparentPower))+"VA"),s.a.createElement("div",{className:"fixture-row"},s.a.createElement("div",{className:"remove-button-container"},a),s.a.createElement("div",null,s.a.createElement("div",null,s.a.createElement("span",{className:"fixture-row-title",onClick:this.handleFixtureClick},t.manufacturer," ",t.name)),s.a.createElement("div",{className:"fixture-in-row-details"},Math.ceil(t.weight),"kg \xb7 ",e)),s.a.createElement(v,{onFixtureChange:this.handleFixtureChange,fixture:this.props.fixture}))}}]),a}(s.a.Component),x=function(e){Object(i.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).handleFixtureChange=n.handleFixtureChange.bind(Object(l.a)(n)),n.handleRemoveButtonClick=n.handleRemoveButtonClick.bind(Object(l.a)(n)),n.handleFixtureClick=n.handleFixtureClick.bind(Object(l.a)(n)),n}return Object(n.a)(a,[{key:"handleFixtureChange",value:function(e,t){this.props.onFixtureChange(e,t)}},{key:"handleRemoveButtonClick",value:function(e){this.props.onRemoveButtonClick(e)}},{key:"handleFixtureClick",value:function(e){this.props.onFixtureClick(e)}},{key:"render",value:function(){var e=this,t=this.props.filterText,a=[];return this.props.fixtures.forEach((function(r){if(function(e,t){var a=!0;return e.split(" ").forEach((function(e){t.manufacturer.toLowerCase().includes(e.toLowerCase())||t.name.toLowerCase().includes(e.toLowerCase())||(a=!1)})),a}(t,r)){var n=r;e.props.selectedFixtures&&e.props.selectedFixtures.forEach((function(e){e.id!==r.id||(n=e)})),a.push(s.a.createElement(E,{fixture:n,key:r.id,onFixtureChange:e.handleFixtureChange,onRemoveButtonClick:e.handleRemoveButtonClick,onFixtureClick:e.handleFixtureClick}))}})),0===a.length?"build"===this.props.mode?s.a.createElement("div",{className:"search-fail-text"},"No matches :("):"review"===this.props.mode?s.a.createElement("div",{className:"search-fail-text"},"No fixtures selected!"):s.a.createElement("div",null):s.a.createElement("div",{className:"fixture-table"},a)}}]),a}(s.a.Component);function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function C(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var k=s.a.createElement("path",{d:"M12.64 23.06a3 3 0 113.84-1.8 3 3 0 01-3.84 1.8zM17.45 28.59a3 3 0 11-4.18-.74 3 3 0 014.18.74z"}),g=s.a.createElement("circle",{cx:24,cy:35,r:3}),w=s.a.createElement("path",{d:"M35.47 32a3 3 0 11-.74-4.18 3 3 0 01.74 4.18zM35.36 23.06a3 3 0 111.8-3.85 3 3 0 01-1.8 3.85z"}),O=s.a.createElement("path",{d:"M24 4a20 20 0 1020 20A20 20 0 0024 4zm0 37a17 17 0 1117-17 17 17 0 01-17 17z"}),y=function(e){var t=e.svgRef,a=e.title,r=C(e,["svgRef","title"]);return s.a.createElement("svg",b({viewBox:"0 0 48 48",ref:t},r),a?s.a.createElement("title",null,a):null,k,g,w,O)},F=s.a.forwardRef((function(e,t){return s.a.createElement(y,b({svgRef:t},e))}));a.p;function j(){return(j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function N(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var P=s.a.createElement("path",{d:"M24 7a17 17 0 1017 17A17 17 0 0024 7zM10.84 19.21a3 3 0 111.8 3.85 3 3 0 01-1.8-3.85zm5.87 13.56a3 3 0 11.74-4.18 3 3 0 01-.74 4.18zM24 38a3 3 0 113-3 3 3 0 01-3 3zm11.47-6a3 3 0 11-.74-4.18 3 3 0 01.74 4.18zm-.11-9a3 3 0 111.8-3.85 3 3 0 01-1.8 3.91z"}),R=s.a.createElement("path",{d:"M24 2a22 22 0 1022 22A22 22 0 0024 2zm0 42a20 20 0 1120-20 20 20 0 01-20 20z"}),M=s.a.createElement("path",{d:"M24 7a17 17 0 1017 17A17 17 0 0024 7zM10.84 19.21a3 3 0 111.8 3.85 3 3 0 01-1.8-3.85zm5.87 13.56a3 3 0 11.74-4.18 3 3 0 01-.74 4.18zM24 38a3 3 0 113-3 3 3 0 01-3 3zm11.47-6a3 3 0 11-.74-4.18 3 3 0 01.74 4.18zm-.11-9a3 3 0 111.8-3.85 3 3 0 01-1.8 3.91z"}),T=s.a.createElement("path",{d:"M24 7a17 17 0 1017 17A17 17 0 0024 7zM10.84 19.21a3 3 0 111.8 3.85 3 3 0 01-1.8-3.85zm5.87 13.56a3 3 0 11.74-4.18 3 3 0 01-.74 4.18zM24 38a3 3 0 113-3 3 3 0 01-3 3zm11.47-6a3 3 0 11-.74-4.18 3 3 0 01.74 4.18zm-.11-9a3 3 0 111.8-3.85 3 3 0 01-1.8 3.91z"}),B=function(e){var t=e.svgRef,a=e.title,r=N(e,["svgRef","title"]);return s.a.createElement("svg",j({viewBox:"0 0 48 48",ref:t},r),a?s.a.createElement("title",null,a):null,P,R,M,T)},S=s.a.forwardRef((function(e,t){return s.a.createElement(B,j({svgRef:t},e))}));a.p;function z(){return(z=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function D(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var V=s.a.createElement("path",{d:"M18.09 25a4 4 0 11-4.63-3.24A4 4 0 0118.09 25z"}),A=s.a.createElement("circle",{cx:24,cy:34,r:4}),q=s.a.createElement("path",{d:"M37.79 26.43a4 4 0 11-3.25-4.63 4 4 0 013.25 4.63z"}),I=s.a.createElement("path",{d:"M24 4a20 20 0 1020 20A20 20 0 0024 4zm0 37a17 17 0 1117-17 17 17 0 01-17 17z"}),L=function(e){var t=e.svgRef,a=e.title,r=D(e,["svgRef","title"]);return s.a.createElement("svg",z({viewBox:"0 0 48 48",ref:t},r),a?s.a.createElement("title",null,a):null,V,A,q,I)},W=s.a.forwardRef((function(e,t){return s.a.createElement(L,z({svgRef:t},e))}));a.p;function U(){return(U=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function X(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var J=s.a.createElement("path",{d:"M24 7a17 17 0 1017 17A17 17 0 0024 7zm-9.15 22.68A4 4 0 1118.09 25a4 4 0 01-3.24 4.68zM24 38a4 4 0 114-4 4 4 0 01-4 4zm9.15-8.32a4 4 0 114.64-3.25 4 4 0 01-4.64 3.25z"}),K=s.a.createElement("path",{d:"M24 2a22 22 0 1022 22A22 22 0 0024 2zm0 42a20 20 0 1120-20 20 20 0 01-20 20z"}),_=function(e){var t=e.svgRef,a=e.title,r=X(e,["svgRef","title"]);return s.a.createElement("svg",U({viewBox:"0 0 48 48",ref:t},r),a?s.a.createElement("title",null,a):null,J,K)},G=s.a.forwardRef((function(e,t){return s.a.createElement(_,U({svgRef:t},e))}));a.p;function H(){return(H=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function Q(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var Y,Z=s.a.createElement("path",{d:"M24 2a22 22 0 1022 22A22 22 0 0024 2zm0 42a20 20 0 1120-20 20 20 0 01-20 20z"}),$=s.a.createElement("path",{d:"M24 7a17 17 0 1017 17A17 17 0 0024 7zm12 24h-6v4h-2v2h-8v-2h-2v-4h-6V17h24z"}),ee=function(e){var t=e.svgRef,a=e.title,r=Q(e,["svgRef","title"]);return s.a.createElement("svg",H({viewBox:"0 0 48 48",ref:t},r),a?s.a.createElement("title",null,a):null,Z,$)},te=s.a.forwardRef((function(e,t){return s.a.createElement(ee,H({svgRef:t},e))})),ae=(a.p,function(e){Object(i.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).componentDidMount=function(){return n.handleScroll()},n.handleScroll=function(){var e=n.props;e.index===e.selected&&n.childDiv.current.scrollIntoView({behavior:"auto"})},n.childDiv=s.a.createRef(),n}return Object(n.a)(a,[{key:"render",value:function(){var e=function(e,t){var a=0,r=0;return e&&e.forEach((function(e){e.quantity>=1&&(p(e).apparentPower&&(a+=Number(p(e).apparentPower)*Number(e.quantity)),r+=Number(e.weight)*Number(e.quantity))})),{power:a,weight:r,current:a/t}}(this.props.selectedFixtures,230);return s.a.createElement("div",{ref:this.childDiv,className:"totals"},s.a.createElement("div",{className:"review-power"},s.a.createElement("span",{className:"review-total"},m(e.power).number),s.a.createElement("span",{className:"review-unit"},m(e.power).unit,"VA")),s.a.createElement("div",{className:"review-weight"},s.a.createElement("span",{className:"review-total"},Math.ceil(e.weight)),s.a.createElement("span",{className:"review-unit"},"kg")),s.a.createElement("div",{className:"review-amps"},s.a.createElement("span",{className:"review-total "},Math.ceil(e.current)),s.a.createElement("span",{className:"review-unit"},"A",s.a.createElement("sup",null,"(",230,"v)"))))}}]),a}(s.a.Component)),re=function(e){Object(i.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).handleFixtureChange=n.handleFixtureChange.bind(Object(l.a)(n)),n.handleRemoveButtonClick=n.handleRemoveButtonClick.bind(Object(l.a)(n)),n.handleFilterTextChange=n.handleFilterTextChange.bind(Object(l.a)(n)),n.handleFixtureClick=n.handleFixtureClick.bind(Object(l.a)(n)),n}return Object(n.a)(a,[{key:"handleFilterTextChange",value:function(e){this.props.onFilterTextChange(e)}},{key:"handleFixtureClick",value:function(e){this.props.onFixtureClick(e)}},{key:"handleFixtureChange",value:function(e,t){this.props.onFixtureChange(e,t)}},{key:"handleRemoveButtonClick",value:function(e){this.props.onRemoveButtonClick(e)}},{key:"render",value:function(){var e=0;return this.props.selectedFixtures.forEach((function(t){Number(t.quantity)&&(e+=Number(t.quantity))})),s.a.createElement("div",null,s.a.createElement(ae,{selectedFixtures:this.props.selectedFixtures,name:"Totals"}),s.a.createElement("div",{className:"selected-heading"},s.a.createElement("h2",null,"Selected Fixtures (",e,")")),s.a.createElement(x,{mode:this.props.mode,fixtures:this.props.selectedFixtures,filterText:"",onFixtureChange:this.handleFixtureChange,onRemoveButtonClick:this.handleRemoveButtonClick,onFixtureClick:this.handleFixtureClick}))}}]),a}(s.a.Component),ne=function(e){Object(i.a)(a,e);var t=Object(c.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){var e,t=this.props.fixture,a=(p(t).realPower,p(t).apparentPower);p(t).realPowerEstimated;a&&(e=a/230);return p(t).apparentPowerEstimated&&"(est)",s.a.createElement("div",{className:"totals"},s.a.createElement("div",{className:"review-power"},s.a.createElement("span",{className:"review-total"},Math.ceil(a)),s.a.createElement("span",{className:"review-unit"},"VA")),s.a.createElement("div",{className:"review-weight"},s.a.createElement("span",{className:"review-total"},Math.ceil(t.weight)),s.a.createElement("span",{className:"review-unit"},"kg")),s.a.createElement("div",{className:"review-amps"},s.a.createElement("span",{className:"review-total "},e.toFixed(1)),s.a.createElement("span",{className:"review-unit"},"A",s.a.createElement("sup",null,"(",230,"V)"))))}}]),a}(s.a.Component),le=function(e){Object(i.a)(a,e);var t=Object(c.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){var e=this.props.fixture,t=[];return"TRUE1"===e.powerIn?t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(f.l,{className:"details-icon true1"}),s.a.createElement("div",null,"TRUE1"))):"PowerCon"===e.powerIn&&t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(f.l,{className:"details-icon powercon"}),s.a.createElement("div",null,"PCon"))),"TRUE1"===e.powerOut?t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(f.l,{className:"details-icon"}),s.a.createElement("div",null,"TRUE1"))):"PowerCon"===e.powerOut&&t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(f.l,{className:"details-icon"}),s.a.createElement("div",null,"PCon"))),e.RDM&&t.push(s.a.createElement("div",{className:"details-top-tile"},s.a.createElement(f.g,{className:"details-icon"}),s.a.createElement("div",null,"RDM"))),e.IP&&t.push(s.a.createElement("div",{className:"details-top-tile"},s.a.createElement(f.m,{className:"details-icon"}),s.a.createElement("div",null,"IP",e.IP))),e.wireless&&t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(f.h,{className:"details-icon"}),s.a.createElement("div",null,"Optional"===e.wireless?"(Option)":"Wireless"))),s.a.createElement("div",{className:"icon-callout"},t)}}]),a}(s.a.Component),ie=function(e){Object(i.a)(a,e);var t=Object(c.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){var e=this.props.fixture,t=[];return e.DMX5in&&t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(F,{className:"details-icon smaller-connector"}),s.a.createElement("div",null,"5-pin in"))),e.DMX5out&&t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(S,{className:"details-icon"}),s.a.createElement("div",null,"5-pin out"))),e.DMX3in&&t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(W,{className:"details-icon  smaller-connector"}),s.a.createElement("div",null,"3-pin in"))),e.DMX3out&&t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(G,{className:"details-icon"}),s.a.createElement("div",null,"3-pin out"))),e.ethernetIn&&t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(te,{className:"details-icon"}),s.a.createElement("div",null,"EtherCon"))),e.ethernetOut&&t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(te,{className:"details-icon"}),s.a.createElement("div",null,"EtherCon"))),s.a.createElement("div",{className:"icon-callout"},t)}}]),a}(s.a.Component),ce=function(e){Object(i.a)(a,e);var t=Object(c.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){var e,t,a,r,n,l,i=this.props.fixture.manual?s.a.createElement("a",{href:this.props.fixture.manual,target:"_blank",rel:"noopener noreferrer"},"Manual"):"",c=this.props.fixture.specSheet?s.a.createElement("a",{href:this.props.fixture.specSheet,target:"_blank",rel:"noopener noreferrer"},"Spec Sheet"):"",o=this.props.fixture.webpage?s.a.createElement("a",{href:this.props.fixture.webpage,target:"_blank",rel:"noopener noreferrer"},"Web Page"):"",u=i||c||o?s.a.createElement("div",null,i," ",c," ",o):s.a.createElement("div",null);if(this.props.fixture.realPower&&(e=s.a.createElement("div",null,"Real Power:"),t=s.a.createElement("div",null,this.props.fixture.realPower+"W")),this.props.fixture.apparentPower&&(a=s.a.createElement("div",null,"Apparent Power:"),r=s.a.createElement("div",null,this.props.fixture.apparentPower+"VA")),this.props.fixture.powerFactor)l=s.a.createElement("div",null,"Power Factor:"),n=s.a.createElement("div",null,""+this.props.fixture.powerFactor);else switch(this.props.fixture.lampType){case"LED":case"Discharge":n=s.a.createElement("div",null,"0.96"),l=s.a.createElement("div",null,"Power Factor (est):");break;case"Conventional":n=s.a.createElement("div",null,"1"),l=s.a.createElement("div",null,"Power Factor:");break;case"LED-Strobe":n=s.a.createElement("div",null,"0.96"),l=s.a.createElement("div",null,"Power Factor (est):");break;default:n=s.a.createElement("div",null,"1"),l=s.a.createElement("div",null,"Power Factor (est):")}var h="";this.props.fixture.protocols&&this.props.fixture.protocols.forEach((function(e){h&&(h+=", "),h+=e}));var d=[];if(this.props.fixture.realPower){var m=this.props.fixture.realPower+"W";d.push(s.a.createElement("div",null,"Real Power:")),d.push(s.a.createElement("div",null,m))}var p={};return Object.assign(p,this.props.fixture),p.quantity=1,s.a.createElement("div",{className:"fixture-details"},s.a.createElement(le,{fixture:this.props.fixture}),s.a.createElement(ne,{fixture:this.props.fixture}),s.a.createElement(ie,{fixture:this.props.fixture}),s.a.createElement("div",{class:"detail-table"},s.a.createElement("div",null,"Manufacturer:"),s.a.createElement("div",null,this.props.fixture.manufacturer),s.a.createElement("div",null,"Type:"),s.a.createElement("div",null,this.props.fixture.type),s.a.createElement("div",null,"Light Source:"),s.a.createElement("div",null,this.props.fixture.lampType),s.a.createElement("div",null,"Protocols:"),s.a.createElement("div",null,h),e,t,l,n,a,r,s.a.createElement("div",null,"Documents:"),s.a.createElement("div",null,u)))}}]),a}(s.a.Component),oe=function(e){Object(i.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).handleFilterTextChange=n.handleFilterTextChange.bind(Object(l.a)(n)),n.handleProdCoChange=n.handleProdCoChange.bind(Object(l.a)(n)),n}return Object(n.a)(a,[{key:"handleFilterTextChange",value:function(e){this.props.onFilterTextChange(e.target.value)}},{key:"handleProdCoChange",value:function(e){this.props.onProdCoChange(e.target.value)}},{key:"render",value:function(){var e=this.props.filterText;return s.a.createElement("form",{onKeyPress:function(e){"Enter"===e.key&&e.preventDefault()}},s.a.createElement("input",{autoFocus:!0,className:"search",type:"text",placeholder:"Search",value:e,onChange:this.handleFilterTextChange}))}}]),a}(s.a.Component),se=function(e){Object(i.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).state={projectFixtures:[]},n.handleFixtureChange=n.handleFixtureChange.bind(Object(l.a)(n)),n.handleRemoveButtonClick=n.handleRemoveButtonClick.bind(Object(l.a)(n)),n.handleFilterTextChange=n.handleFilterTextChange.bind(Object(l.a)(n)),n.handleFixtureClick=n.handleFixtureClick.bind(Object(l.a)(n)),n.scroller=s.a.createRef(),n}return Object(n.a)(a,[{key:"handleFilterTextChange",value:function(e){this.props.onFilterTextChange(e)}},{key:"handleFixtureClick",value:function(e){this.props.onFixtureClick(e)}},{key:"handleFixtureChange",value:function(e,t){t=parseInt(t);var a=this.state.projectFixtures.slice(),r=function(e,t,a){var r;return e.forEach((function(e){e[t]!==a||(r=Object(d.a)({},e))})),r}(Y.fixtures,"id",e);if(r){var n=!1;a.forEach((function(a){if(a.id===e)return a.quantity=t,void(n=!0)})),n||(r.quantity=t,r.selected=!0,a.push(r))}this.setState({projectFixtures:a})}},{key:"handleRemoveButtonClick",value:function(e){var t=this.state.projectFixtures.filter((function(t){return e!==t.id}));this.setState({projectFixtures:t})}},{key:"render",value:function(){var e;return e=this.props.fixtureView?s.a.createElement("div",{ref:this.scroller},s.a.createElement(ce,{fixture:this.props.selectedFixture})):"build"===this.props.mode?s.a.createElement("div",{ref:this.scroller},s.a.createElement(x,{mode:this.props.mode,fixtures:Y.fixtures,selectedFixtures:this.state.projectFixtures,filterText:this.props.filterText,onFixtureChange:this.handleFixtureChange,onRemoveButtonClick:this.handleRemoveButtonClick,onFixtureClick:this.handleFixtureClick})):s.a.createElement("div",{ref:this.scroller},s.a.createElement(re,{mode:this.props.mode,fixtures:Y.fixtures,selectedFixtures:this.state.projectFixtures,filterText:this.props.filterText,onFixtureChange:this.handleFixtureChange,onRemoveButtonClick:this.handleRemoveButtonClick,onFixtureClick:this.handleFixtureClick})),s.a.createElement("div",null,e)}}]),a}(s.a.Component),ue=function(e){Object(i.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).state={searchExtended:!1},n.handleFilterTextChange=n.handleFilterTextChange.bind(Object(l.a)(n)),n.handleBackClick=n.handleBackClick.bind(Object(l.a)(n)),n.handleSearchClick=n.handleSearchClick.bind(Object(l.a)(n)),n.handleClearSearch=n.handleClearSearch.bind(Object(l.a)(n)),n}return Object(n.a)(a,[{key:"handleFilterTextChange",value:function(e){this.props.onFilterTextChange(e)}},{key:"handleBackClick",value:function(e){this.state.searchExtended&&!this.props.fixtureView?(this.props.onFilterTextChange(""),this.setState({searchExtended:!1})):this.state.searchExtended&&this.props.fixtureView?this.props.onBackClick(e):(this.props.onFilterTextChange(""),this.props.onBackClick(e),this.setState({searchExtended:!1}))}},{key:"handleSearchClick",value:function(e){this.setState({searchExtended:!0})}},{key:"handleClearSearch",value:function(e){this.props.onFilterTextChange("")}},{key:"render",value:function(){var e,t,a;console.log(this.props.filterText);var r="header";switch(this.props.mode){case"build":switch(this.state.searchExtended){case!0:a=s.a.createElement("div",null,s.a.createElement(oe,{filterText:this.props.filterText,onFilterTextChange:this.handleFilterTextChange})),e=s.a.createElement("div",{className:"left-icon-div",onClick:this.handleBackClick},s.a.createElement(f.b,{className:"left-icon"})),r="header-search",t=s.a.createElement("div",null);break;default:a=s.a.createElement("h1",{className:"title",onClick:this.handleSearchClick},"PatchPal"),e=s.a.createElement("div",{className:"left-icon-div",onClick:this.handleSearchClick},s.a.createElement(f.f,{className:"left-icon"})),t=s.a.createElement("div",null),r="header"}break;case"review":a=s.a.createElement("h1",{className:"title"},"Summary"),e=s.a.createElement("div",null),r="header-review";break;default:e=s.a.createElement("div",null),t=s.a.createElement("div",null),a=s.a.createElement("h1",null,"PatchPal")}return this.props.fixtureView&&(e=s.a.createElement("div",{className:"left-icon-div",onClick:this.handleBackClick},s.a.createElement(f.b,{className:"left-icon"})),a=s.a.createElement("h1",null,this.props.selectedFixture.name),t=s.a.createElement("div",null),r="header"),s.a.createElement("div",{className:"header-container-container"},s.a.createElement("div",{className:"header-container"},s.a.createElement("div",{className:r},e,a,t)))}}]),a}(s.a.Component),he=function(e){Object(i.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).handleBuildMode=n.handleBuildMode.bind(Object(l.a)(n)),n}return Object(n.a)(a,[{key:"handleBuildMode",value:function(e){this.props.onModeChange(e)}},{key:"render",value:function(){var e="review"===this.props.mode?{fontWeight:"bold"}:{fontWeight:"lighter"},t="build"===this.props.mode?{fontWeight:"bold"}:{fontWeight:"lighter"},a="build"===this.props.mode?s.a.createElement(f.i,{className:"footer-icon"}):s.a.createElement(f.j,{className:"footer-icon"}),r="review"===this.props.mode?s.a.createElement(f.d,{className:"footer-icon"}):s.a.createElement(f.c,{className:"footer-icon"});return s.a.createElement("div",{className:"footer-container-container"},s.a.createElement("div",{className:"footer-container"},s.a.createElement("div",{id:"footer"},s.a.createElement("div",null),s.a.createElement("div",{className:"child-clicks-this",style:t,onClick:this.handleBuildMode,"data-mode":"build"},a),s.a.createElement("div",null),s.a.createElement("div",{className:"child-clicks-this",style:e,onClick:this.handleBuildMode,"data-mode":"review"},r),s.a.createElement("div",null))))}}]),a}(s.a.Component),de=function(e){Object(i.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).handleScroll=function(){var e=n.props;e.index===e.selected&&n.mainScroller.current.scrollIntoView({behavior:"auto"})},n.state={mode:"build",projectFixtures:[],filterText:"",selectedFixture:{},fixtureView:!1},n.handleFixtureClick=n.handleFixtureClick.bind(Object(l.a)(n)),n.handleBuildMode=n.handleBuildMode.bind(Object(l.a)(n)),n.handleFilterTextChange=n.handleFilterTextChange.bind(Object(l.a)(n)),n.handleBackClick=n.handleBackClick.bind(Object(l.a)(n)),n.mainScroller=s.a.createRef(),n}return Object(n.a)(a,[{key:"handleBuildMode",value:function(e){var t=e.target.dataset.mode;this.setState({fixtureView:!1}),this.state.mode!==t&&this.setState({mode:e.target.dataset.mode}),this.handleScroll()}},{key:"handleFilterTextChange",value:function(e){this.setState({filterText:e}),this.handleScroll()}},{key:"handleFixtureClick",value:function(e){this.setState({fixtureView:!0,selectedFixture:e}),this.handleScroll()}},{key:"handleBackClick",value:function(e){this.setState({fixtureView:!1,selectedFixture:""})}},{key:"render",value:function(){return s.a.createElement("div",{className:"app"},s.a.createElement(ue,{fixtureView:this.state.fixtureView,mode:this.state.mode,selectedFixture:this.state.selectedFixture,onFilterTextChange:this.handleFilterTextChange,onBackClick:this.handleBackClick,filterText:this.state.filterText}),s.a.createElement("div",{className:"page"},s.a.createElement("div",{ref:this.mainScroller}),s.a.createElement(se,{fixtureView:this.state.fixtureView,mode:this.state.mode,selectedFixture:this.state.selectedFixture,onFilterTextChange:this.handleFilterTextChange,filterText:this.state.filterText,onFixtureClick:this.handleFixtureClick})),s.a.createElement(he,{mode:this.state.mode,onModeChange:this.handleBuildMode}))}}]),a}(s.a.Component);fetch("fixtureData.json").then((function(e){return console.log(e),e.ok||console.error("Database not found."),e.text()})).then((function(e){Y=JSON.parse(e),h.a.render(s.a.createElement(de,null),document.querySelector("#root"))}))}},[[10,1,2]]]);
//# sourceMappingURL=main.1c6073ed.chunk.js.map