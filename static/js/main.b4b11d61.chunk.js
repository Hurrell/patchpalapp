(this.webpackJsonppatchpalapp=this.webpackJsonppatchpalapp||[]).push([[0],[,,,,,,,,,,function(e,t,a){e.exports=a(28)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(2),r=a(3),i=a(1),l=a(5),c=a(4),o=a(0),s=a.n(o),u=a(8),h=a.n(u),d=(a(15),a(16),a(6)),p=function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).handleBuildMode=r.handleBuildMode.bind(Object(i.a)(r)),r}return Object(r.a)(a,[{key:"handleBuildMode",value:function(e){this.props.onModeChange(e)}},{key:"render",value:function(){var e="review"===this.props.mode?{fontWeight:"bold"}:{fontWeight:"lighter"},t="build"===this.props.mode?{fontWeight:"bold"}:{fontWeight:"lighter"},a="build"===this.props.mode?s.a.createElement(d.i,{className:"footer-button-icon"}):s.a.createElement(d.j,{className:"footer-button-icon"}),n="review"===this.props.mode?s.a.createElement(d.d,{className:"footer-button-icon"}):s.a.createElement(d.c,{className:"footer-button-icon"});return s.a.createElement("footer",null,s.a.createElement("div",{className:"footer-button-left",style:t,onClick:this.handleBuildMode,"data-mode":"build"},a),s.a.createElement("div",{className:"footer-button-right",style:e,onClick:this.handleBuildMode,"data-mode":"review"},n))}}]),a}(s.a.Component),m=(a(17),a(18),function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).handleFilterTextChange=r.handleFilterTextChange.bind(Object(i.a)(r)),r.handleProdCoChange=r.handleProdCoChange.bind(Object(i.a)(r)),r}return Object(r.a)(a,[{key:"handleFilterTextChange",value:function(e){this.props.onFilterTextChange(e.target.value)}},{key:"handleProdCoChange",value:function(e){this.props.onProdCoChange(e.target.value)}},{key:"render",value:function(){var e=this.props.filterText;return s.a.createElement("form",{className:"search-form",onKeyPress:function(e){"Enter"===e.key&&e.preventDefault()}},s.a.createElement("input",{autoFocus:!0,className:"search",type:"text",placeholder:"Search",value:e,onChange:this.handleFilterTextChange}))}}]),a}(s.a.Component)),f=function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).state={searchExtended:!1},r.handleFilterTextChange=r.handleFilterTextChange.bind(Object(i.a)(r)),r.handleBackClick=r.handleBackClick.bind(Object(i.a)(r)),r.handleSearchClick=r.handleSearchClick.bind(Object(i.a)(r)),r.handleClearSearch=r.handleClearSearch.bind(Object(i.a)(r)),r}return Object(r.a)(a,[{key:"handleFilterTextChange",value:function(e){this.props.onFilterTextChange(e)}},{key:"handleBackClick",value:function(e){this.state.searchExtended&&!this.props.fixtureView?(this.props.onFilterTextChange(""),this.setState({searchExtended:!1})):this.state.searchExtended&&this.props.fixtureView?this.props.onBackClick(e):(this.props.onFilterTextChange(""),this.props.onBackClick(e),this.setState({searchExtended:!1}))}},{key:"handleSearchClick",value:function(e){this.setState({searchExtended:!0})}},{key:"handleClearSearch",value:function(e){this.props.onFilterTextChange("")}},{key:"render",value:function(){var e,t;switch(console.log(this.props.filterText),this.props.mode){case"build":switch(this.state.searchExtended){case!0:t=s.a.createElement(m,{filterText:this.props.filterText,onFilterTextChange:this.handleFilterTextChange}),e=s.a.createElement("div",{className:"left-icon-div",onClick:this.handleBackClick},s.a.createElement(d.b,{className:"left-icon"}));break;default:t=s.a.createElement("h1",{className:"title",onClick:this.handleSearchClick},"PatchPal"),e=s.a.createElement("div",{className:"left-icon-div",onClick:this.handleSearchClick},s.a.createElement(d.f,{className:"left-icon"}))}break;case"review":t=s.a.createElement("h1",{className:"title"},"Summary"),e=s.a.createElement("div",null);break;default:e=s.a.createElement("div",null),t=s.a.createElement("h1",null,"PatchPal")}return this.props.fixtureView&&(e=s.a.createElement("div",{className:"left-icon-div",onClick:this.handleBackClick},s.a.createElement(d.b,{className:"left-icon"})),t=s.a.createElement("h1",null,this.props.selectedFixture.name)),s.a.createElement("header",null,e,t)}}]),a}(s.a.Component),v=(a(19),a(9));function x(e){var t={number:Math.ceil(e),unit:""};return e>1e3&&(t={number:(e/1e3).toFixed(1),unit:"k"}),t}function b(e){var t,a,n,r;if(e.apparentPower)t=e.apparentPower;else if(e.realPower&&e.powerFactor)t=e.realPower/e.powerFactor;else if(e.realPower)switch(e.lampType){case"LED":case"Discharge":t=e.realPower/.96,a=!0;break;case"Conventional":t=e.realPower;break;case"LED-Strobe":t=e.realPower/.96,a=!0;break;default:t=e.realPower,a=!0}return e.realPower?n=e.realPower:e.apparentPower&&e.powerFactor?t=e.apparentPower*e.powerFactor:e.apparentPower&&(n=e.apparentPower,r=!0),{apparentPower:t,apparentPowerEstimated:a,realPower:n,realPowerEstimated:r}}a(20),a(21);var E=function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).handleFixtureChange=r.handleFixtureChange.bind(Object(i.a)(r)),r.handleMinus=r.handleMinus.bind(Object(i.a)(r)),r.handlePlus=r.handlePlus.bind(Object(i.a)(r)),r}return Object(r.a)(a,[{key:"handleFixtureChange",value:function(e){this.props.onFixtureChange(this.props.fixture.id,e.target.value)}},{key:"handleMinus",value:function(){var e=this.props.fixture.quantity>0?this.props.fixture.quantity-=1:0;this.props.onFixtureChange(this.props.fixture.id,e)}},{key:"handlePlus",value:function(){var e=this.props.fixture.quantity;Number(e)&&Number(e)<99?e=Number(e)+1:99!==Number(e)&&(e=1),this.props.onFixtureChange(this.props.fixture.id,e)}},{key:"render",value:function(){var e=this.props.fixture,t=!0;return(e.quantity||0===e.quantity)&&(t=!1),s.a.createElement("div",{className:"fixture-change"},s.a.createElement("div",{onClick:this.handleMinus,className:t?"hidden":""},s.a.createElement(d.e,{className:"fixture-change-icon"})),s.a.createElement("form",{className:"quantity-input ".concat(t?"hidden":""),onKeyPress:function(e){"Enter"===e.key&&e.preventDefault()}},s.a.createElement("input",{type:"text",pattern:"\\d*",maxLength:"2",value:e.quantity,onChange:this.handleFixtureChange,onKeyDown:function(e){return["e","E","+","-"].includes(e.key)&&e.preventDefault()}})),s.a.createElement("div",{onClick:this.handlePlus},s.a.createElement(d.a,{className:"fixture-change-icon"})))}}]),a}(s.a.Component),C=function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).handleFixtureChange=r.handleFixtureChange.bind(Object(i.a)(r)),r.handleRemoveButtonClick=r.handleRemoveButtonClick.bind(Object(i.a)(r)),r.handleFixtureClick=r.handleFixtureClick.bind(Object(i.a)(r)),r}return Object(r.a)(a,[{key:"handleFixtureChange",value:function(e,t){this.props.onFixtureChange(e,t)}},{key:"handleRemoveButtonClick",value:function(){this.props.onRemoveButtonClick(this.props.fixture.id)}},{key:"handleFixtureClick",value:function(e){this.props.onFixtureClick(this.props.fixture)}},{key:"render",value:function(){var e,t=this.props.fixture;t.selected,b(t).apparentPower&&(e=Math.ceil(Number(b(t).apparentPower))+"VA");return s.a.createElement("li",{className:"fixture-row"},s.a.createElement("div",{className:"side-img-container"},s.a.createElement("img",{alt:"",className:"side-img",src:"images/"+t.id+"_small.png",onError:function(e){e.target.src="images/"+t.type+"_small.png"}})),s.a.createElement("div",null,s.a.createElement("h3",{className:"fixture-row-title",onClick:this.handleFixtureClick},t.manufacturer," ",t.name),s.a.createElement("p",{className:"fixture-in-row-details"},Math.ceil(t.weight),"kg \xb7 ",e)),s.a.createElement(E,{onFixtureChange:this.handleFixtureChange,fixture:this.props.fixture}))}}]),a}(s.a.Component),g=(a(22),function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).handleFixtureChange=r.handleFixtureChange.bind(Object(i.a)(r)),r.handleRemoveButtonClick=r.handleRemoveButtonClick.bind(Object(i.a)(r)),r.handleFixtureClick=r.handleFixtureClick.bind(Object(i.a)(r)),r}return Object(r.a)(a,[{key:"handleFixtureChange",value:function(e,t){this.props.onFixtureChange(e,t)}},{key:"handleRemoveButtonClick",value:function(e){this.props.onRemoveButtonClick(e)}},{key:"handleFixtureClick",value:function(e){this.props.onFixtureClick(e)}},{key:"render",value:function(){var e=this,t=this.props.filterText,a=[];return this.props.fixtures.forEach((function(n){if(function(e,t){var a=!0;return e.split(" ").forEach((function(e){t.manufacturer.toLowerCase().includes(e.toLowerCase())||t.name.toLowerCase().includes(e.toLowerCase())||(a=!1)})),a}(t,n)){var r=n;e.props.selectedFixtures&&e.props.selectedFixtures.forEach((function(e){e.id!==n.id||(r=e)})),a.push(s.a.createElement(C,{fixture:r,key:n.id,onFixtureChange:e.handleFixtureChange,onRemoveButtonClick:e.handleRemoveButtonClick,onFixtureClick:e.handleFixtureClick}))}})),0===a.length?"build"===this.props.mode?s.a.createElement("div",{className:"search-fail-text"},"No matches :("):"review"===this.props.mode?s.a.createElement("div",{className:"search-fail-text"},"No fixtures selected!"):s.a.createElement("div",null):s.a.createElement("ul",{className:"fixture-table"},a)}}]),a}(s.a.Component)),k=(a(23),a(24),a(25),function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).componentDidMount=function(){return r.handleScroll()},r.handleScroll=function(){var e=r.props;e.index===e.selected&&r.childDiv.current.scrollIntoView({behavior:"auto"})},r.childDiv=s.a.createRef(),r}return Object(r.a)(a,[{key:"render",value:function(){var e=function(e,t){var a=0,n=0;return e&&e.forEach((function(e){e.quantity>=1&&(b(e).apparentPower&&(a+=Number(b(e).apparentPower)*Number(e.quantity)),n+=Number(e.weight)*Number(e.quantity))})),{power:a,weight:n,current:a/t}}(this.props.selectedFixtures,230);return s.a.createElement("div",{ref:this.childDiv,className:"totals"},s.a.createElement("div",{className:"review-power"},s.a.createElement("span",{className:"review-total"},x(e.power).number),s.a.createElement("span",{className:"review-unit"},x(e.power).unit,"VA")),s.a.createElement("div",{className:"review-weight"},s.a.createElement("span",{className:"review-total"},Math.ceil(e.weight)),s.a.createElement("span",{className:"review-unit"},"kg")),s.a.createElement("div",{className:"review-amps"},s.a.createElement("span",{className:"review-total "},Math.ceil(e.current)),s.a.createElement("span",{className:"review-unit"},"A",s.a.createElement("sup",null,"(",230,"V)"))))}}]),a}(s.a.Component)),O=function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).handleFixtureChange=r.handleFixtureChange.bind(Object(i.a)(r)),r.handleRemoveButtonClick=r.handleRemoveButtonClick.bind(Object(i.a)(r)),r.handleFilterTextChange=r.handleFilterTextChange.bind(Object(i.a)(r)),r.handleFixtureClick=r.handleFixtureClick.bind(Object(i.a)(r)),r}return Object(r.a)(a,[{key:"handleFilterTextChange",value:function(e){this.props.onFilterTextChange(e)}},{key:"handleFixtureClick",value:function(e){this.props.onFixtureClick(e)}},{key:"handleFixtureChange",value:function(e,t){this.props.onFixtureChange(e,t)}},{key:"handleRemoveButtonClick",value:function(e){this.props.onRemoveButtonClick(e)}},{key:"render",value:function(){var e=0;return this.props.selectedFixtures.forEach((function(t){Number(t.quantity)&&(e+=Number(t.quantity))})),s.a.createElement("div",null,s.a.createElement(k,{selectedFixtures:this.props.selectedFixtures,name:"Totals"}),s.a.createElement("div",{className:"selected-heading"},s.a.createElement("h2",null,"Selected Fixtures (",e,")")),s.a.createElement(g,{mode:this.props.mode,fixtures:this.props.selectedFixtures,filterText:"",onFixtureChange:this.handleFixtureChange,onRemoveButtonClick:this.handleRemoveButtonClick,onFixtureClick:this.handleFixtureClick}))}}]),a}(s.a.Component),w=function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){var e,t=this.props.fixture,a=b(t).apparentPower;return a&&(e=a/230),s.a.createElement("div",{className:"totals"},s.a.createElement("div",{className:"review-power"},s.a.createElement("span",{className:"review-total"},Math.ceil(a)),s.a.createElement("span",{className:"review-unit"},"VA")),s.a.createElement("div",{className:"review-weight"},s.a.createElement("span",{className:"review-total"},Math.ceil(t.weight)),s.a.createElement("span",{className:"review-unit"},"kg")),s.a.createElement("div",{className:"review-amps"},s.a.createElement("span",{className:"review-total "},e.toFixed(1)),s.a.createElement("span",{className:"review-unit"},"A",s.a.createElement("sup",null,"(",230,"V)"))))}}]),a}(s.a.Component),y=(a(26),function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props.fixture,t=[];return"TRUE1"===e.powerIn?t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(d.k,{className:"details-icon true1"}),s.a.createElement("div",null,"TRUE1"))):"PowerCon"===e.powerIn&&t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(d.k,{className:"details-icon powercon"}),s.a.createElement("div",null,"PCon"))),"TRUE1"===e.powerOut?t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(d.k,{className:"details-icon"}),s.a.createElement("div",null,"TRUE1"))):"PowerCon"===e.powerOut&&t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(d.k,{className:"details-icon"}),s.a.createElement("div",null,"PCon"))),e.RDM&&t.push(s.a.createElement("div",{className:"details-top-tile"},s.a.createElement(d.g,{className:"details-icon"}),s.a.createElement("div",null,"RDM"))),e.IP&&t.push(s.a.createElement("div",{className:"details-top-tile"},s.a.createElement(d.l,{className:"details-icon"}),s.a.createElement("div",null,"IP",e.IP))),e.wireless&&t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(d.h,{className:"details-icon"}),s.a.createElement("div",null,"Optional"===e.wireless?"(Option)":"Wireless"))),s.a.createElement("div",{className:"icon-callout"},t)}}]),a}(s.a.Component));a(27);function F(){return(F=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function j(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var N=s.a.createElement("path",{d:"M12.64 23.06a3 3 0 113.84-1.8 3 3 0 01-3.84 1.8zM17.45 28.59a3 3 0 11-4.18-.74 3 3 0 014.18.74z"}),P=s.a.createElement("circle",{cx:24,cy:35,r:3}),T=s.a.createElement("path",{d:"M35.47 32a3 3 0 11-.74-4.18 3 3 0 01.74 4.18zM35.36 23.06a3 3 0 111.8-3.85 3 3 0 01-1.8 3.85z"}),M=s.a.createElement("path",{d:"M24 4a20 20 0 1020 20A20 20 0 0024 4zm0 37a17 17 0 1117-17 17 17 0 01-17 17z"}),R=function(e){var t=e.svgRef,a=e.title,n=j(e,["svgRef","title"]);return s.a.createElement("svg",F({viewBox:"0 0 48 48",ref:t},n),a?s.a.createElement("title",null,a):null,N,P,T,M)},B=s.a.forwardRef((function(e,t){return s.a.createElement(R,F({svgRef:t},e))}));a.p;function S(){return(S=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function z(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var A=s.a.createElement("path",{d:"M24 7a17 17 0 1017 17A17 17 0 0024 7zM10.84 19.21a3 3 0 111.8 3.85 3 3 0 01-1.8-3.85zm5.87 13.56a3 3 0 11.74-4.18 3 3 0 01-.74 4.18zM24 38a3 3 0 113-3 3 3 0 01-3 3zm11.47-6a3 3 0 11-.74-4.18 3 3 0 01.74 4.18zm-.11-9a3 3 0 111.8-3.85 3 3 0 01-1.8 3.91z"}),D=s.a.createElement("path",{d:"M24 2a22 22 0 1022 22A22 22 0 0024 2zm0 42a20 20 0 1120-20 20 20 0 01-20 20z"}),V=s.a.createElement("path",{d:"M24 7a17 17 0 1017 17A17 17 0 0024 7zM10.84 19.21a3 3 0 111.8 3.85 3 3 0 01-1.8-3.85zm5.87 13.56a3 3 0 11.74-4.18 3 3 0 01-.74 4.18zM24 38a3 3 0 113-3 3 3 0 01-3 3zm11.47-6a3 3 0 11-.74-4.18 3 3 0 01.74 4.18zm-.11-9a3 3 0 111.8-3.85 3 3 0 01-1.8 3.91z"}),q=s.a.createElement("path",{d:"M24 7a17 17 0 1017 17A17 17 0 0024 7zM10.84 19.21a3 3 0 111.8 3.85 3 3 0 01-1.8-3.85zm5.87 13.56a3 3 0 11.74-4.18 3 3 0 01-.74 4.18zM24 38a3 3 0 113-3 3 3 0 01-3 3zm11.47-6a3 3 0 11-.74-4.18 3 3 0 01.74 4.18zm-.11-9a3 3 0 111.8-3.85 3 3 0 01-1.8 3.91z"}),I=function(e){var t=e.svgRef,a=e.title,n=z(e,["svgRef","title"]);return s.a.createElement("svg",S({viewBox:"0 0 48 48",ref:t},n),a?s.a.createElement("title",null,a):null,A,D,V,q)},L=s.a.forwardRef((function(e,t){return s.a.createElement(I,S({svgRef:t},e))}));a.p;function W(){return(W=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function _(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var U=s.a.createElement("path",{d:"M18.09 25a4 4 0 11-4.63-3.24A4 4 0 0118.09 25z"}),X=s.a.createElement("circle",{cx:24,cy:34,r:4}),J=s.a.createElement("path",{d:"M37.79 26.43a4 4 0 11-3.25-4.63 4 4 0 013.25 4.63z"}),K=s.a.createElement("path",{d:"M24 4a20 20 0 1020 20A20 20 0 0024 4zm0 37a17 17 0 1117-17 17 17 0 01-17 17z"}),G=function(e){var t=e.svgRef,a=e.title,n=_(e,["svgRef","title"]);return s.a.createElement("svg",W({viewBox:"0 0 48 48",ref:t},n),a?s.a.createElement("title",null,a):null,U,X,J,K)},H=s.a.forwardRef((function(e,t){return s.a.createElement(G,W({svgRef:t},e))}));a.p;function Q(){return(Q=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function Y(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var Z=s.a.createElement("path",{d:"M24 7a17 17 0 1017 17A17 17 0 0024 7zm-9.15 22.68A4 4 0 1118.09 25a4 4 0 01-3.24 4.68zM24 38a4 4 0 114-4 4 4 0 01-4 4zm9.15-8.32a4 4 0 114.64-3.25 4 4 0 01-4.64 3.25z"}),$=s.a.createElement("path",{d:"M24 2a22 22 0 1022 22A22 22 0 0024 2zm0 42a20 20 0 1120-20 20 20 0 01-20 20z"}),ee=function(e){var t=e.svgRef,a=e.title,n=Y(e,["svgRef","title"]);return s.a.createElement("svg",Q({viewBox:"0 0 48 48",ref:t},n),a?s.a.createElement("title",null,a):null,Z,$)},te=s.a.forwardRef((function(e,t){return s.a.createElement(ee,Q({svgRef:t},e))}));a.p;function ae(){return(ae=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function ne(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var re,ie=s.a.createElement("path",{d:"M24 2a22 22 0 1022 22A22 22 0 0024 2zm0 42a20 20 0 1120-20 20 20 0 01-20 20z"}),le=s.a.createElement("path",{d:"M24 7a17 17 0 1017 17A17 17 0 0024 7zm12 24h-6v4h-2v2h-8v-2h-2v-4h-6V17h24z"}),ce=function(e){var t=e.svgRef,a=e.title,n=ne(e,["svgRef","title"]);return s.a.createElement("svg",ae({viewBox:"0 0 48 48",ref:t},n),a?s.a.createElement("title",null,a):null,ie,le)},oe=s.a.forwardRef((function(e,t){return s.a.createElement(ce,ae({svgRef:t},e))})),se=(a.p,function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props.fixture,t=[];return e.DMX5in&&t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(B,{className:"details-icon smaller-connector"}),s.a.createElement("div",null,"5-pin in"))),e.DMX5out&&t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(L,{className:"details-icon"}),s.a.createElement("div",null,"5-pin out"))),e.DMX3in&&t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(H,{className:"details-icon  smaller-connector"}),s.a.createElement("div",null,"3-pin in"))),e.DMX3out&&t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(te,{className:"details-icon"}),s.a.createElement("div",null,"3-pin out"))),e.ethernetIn&&t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(oe,{className:"details-icon"}),s.a.createElement("div",null,"EtherCon"))),e.ethernetOut&&t.push(s.a.createElement("div",{className:"details-bottom-tile"},s.a.createElement(oe,{className:"details-icon"}),s.a.createElement("div",null,"EtherCon"))),s.a.createElement("div",{className:"icon-callout"},t)}}]),a}(s.a.Component)),ue=function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){var e,t,a,n,r,i,l=this.props.fixture.manual?s.a.createElement("a",{href:this.props.fixture.manual,target:"_blank",rel:"noopener noreferrer"},"Manual"):"",c=this.props.fixture.specSheet?s.a.createElement("a",{href:this.props.fixture.specSheet,target:"_blank",rel:"noopener noreferrer"},"Spec Sheet"):"",o=this.props.fixture.webpage?s.a.createElement("a",{href:this.props.fixture.webpage,target:"_blank",rel:"noopener noreferrer"},"Web Page"):"",u=l||c||o?s.a.createElement("div",null,l," ",c," ",o):s.a.createElement("div",null);if(this.props.fixture.realPower&&(e=s.a.createElement("div",null,"Real Power:"),t=s.a.createElement("div",null,this.props.fixture.realPower+"W")),this.props.fixture.apparentPower&&(a=s.a.createElement("div",null,"Apparent Power:"),n=s.a.createElement("div",null,this.props.fixture.apparentPower+"VA")),this.props.fixture.powerFactor)i=s.a.createElement("div",null,"Power Factor:"),r=s.a.createElement("div",null,""+this.props.fixture.powerFactor);else switch(this.props.fixture.lampType){case"LED":case"Discharge":r=s.a.createElement("div",null,"0.96"),i=s.a.createElement("div",null,"Power Factor (est):");break;case"Conventional":r=s.a.createElement("div",null,"1"),i=s.a.createElement("div",null,"Power Factor:");break;case"LED-Strobe":r=s.a.createElement("div",null,"0.96"),i=s.a.createElement("div",null,"Power Factor (est):");break;default:r=s.a.createElement("div",null,"1"),i=s.a.createElement("div",null,"Power Factor (est):")}var h="";this.props.fixture.protocols&&this.props.fixture.protocols.forEach((function(e){h&&(h+=", "),h+=e}));var d=[];if(this.props.fixture.realPower){var p=this.props.fixture.realPower+"W";d.push(s.a.createElement("div",null,"Real Power:")),d.push(s.a.createElement("div",null,p))}var m={};return Object.assign(m,this.props.fixture),m.quantity=1,s.a.createElement("article",{className:"fixture-details"},s.a.createElement(y,{fixture:this.props.fixture}),s.a.createElement(w,{fixture:this.props.fixture}),s.a.createElement(se,{fixture:this.props.fixture}),s.a.createElement("div",{className:"detail-table"},s.a.createElement("div",null,"Manufacturer:"),s.a.createElement("div",null,this.props.fixture.manufacturer),s.a.createElement("div",null,"Type:"),s.a.createElement("div",null,this.props.fixture.type),s.a.createElement("div",null,"Light Source:"),s.a.createElement("div",null,this.props.fixture.lampType),s.a.createElement("div",null,"Protocols:"),s.a.createElement("div",null,h),e,t,i,r,a,n,s.a.createElement("div",null,"Documents:"),s.a.createElement("div",null,u)))}}]),a}(s.a.Component),he=function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).state={projectFixtures:[]},r.handleFixtureChange=r.handleFixtureChange.bind(Object(i.a)(r)),r.handleRemoveButtonClick=r.handleRemoveButtonClick.bind(Object(i.a)(r)),r.handleFilterTextChange=r.handleFilterTextChange.bind(Object(i.a)(r)),r.handleFixtureClick=r.handleFixtureClick.bind(Object(i.a)(r)),r}return Object(r.a)(a,[{key:"handleFilterTextChange",value:function(e){this.props.onFilterTextChange(e)}},{key:"handleFixtureClick",value:function(e){this.props.onFixtureClick(e)}},{key:"handleFixtureChange",value:function(e,t){t=parseInt(t);var a=this.state.projectFixtures.slice(),n=function(e,t,a){var n;return e.forEach((function(e){e[t]!==a||(n=Object(v.a)({},e))})),n}(this.props.APPDATA.fixtures,"id",e);if(n){var r=!1;a.forEach((function(a){if(a.id===e)return a.quantity=t,void(r=!0)})),r||(n.quantity=t,n.selected=!0,a.push(n))}this.setState({projectFixtures:a})}},{key:"handleRemoveButtonClick",value:function(e){var t=this.state.projectFixtures.filter((function(t){return e!==t.id}));this.setState({projectFixtures:t})}},{key:"render",value:function(){return this.props.fixtureView?s.a.createElement(ue,{fixture:this.props.selectedFixture}):"build"===this.props.mode?s.a.createElement(g,{mode:this.props.mode,fixtures:this.props.APPDATA.fixtures,selectedFixtures:this.state.projectFixtures,filterText:this.props.filterText,onFixtureChange:this.handleFixtureChange,onRemoveButtonClick:this.handleRemoveButtonClick,onFixtureClick:this.handleFixtureClick}):s.a.createElement(O,{mode:this.props.mode,fixtures:this.props.APPDATA.fixtures,selectedFixtures:this.state.projectFixtures,filterText:this.props.filterText,onFixtureChange:this.handleFixtureChange,onRemoveButtonClick:this.handleRemoveButtonClick,onFixtureClick:this.handleFixtureClick})}}]),a}(s.a.Component),de=function(e){Object(l.a)(a,e);var t=Object(c.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).handleScroll=function(){var e=r.props;e.index===e.selected&&r.mainScroller.current.scrollIntoView({behavior:"auto"})},r.state={mode:"build",projectFixtures:[],filterText:"",selectedFixture:{},fixtureView:!1},r.handleFixtureClick=r.handleFixtureClick.bind(Object(i.a)(r)),r.handleBuildMode=r.handleBuildMode.bind(Object(i.a)(r)),r.handleFilterTextChange=r.handleFilterTextChange.bind(Object(i.a)(r)),r.handleBackClick=r.handleBackClick.bind(Object(i.a)(r)),r.mainScroller=s.a.createRef(),r}return Object(r.a)(a,[{key:"handleBuildMode",value:function(e){var t=e.target.dataset.mode;this.setState({fixtureView:!1}),this.state.mode!==t&&this.setState({mode:e.target.dataset.mode}),this.handleScroll()}},{key:"handleFilterTextChange",value:function(e){this.setState({filterText:e}),this.handleScroll()}},{key:"handleFixtureClick",value:function(e){this.setState({fixtureView:!0,selectedFixture:e}),this.handleScroll()}},{key:"handleBackClick",value:function(e){this.setState({fixtureView:!1,selectedFixture:""})}},{key:"render",value:function(){return s.a.createElement("div",{className:"app"},s.a.createElement(f,{fixtureView:this.state.fixtureView,mode:this.state.mode,selectedFixture:this.state.selectedFixture,onFilterTextChange:this.handleFilterTextChange,onBackClick:this.handleBackClick,filterText:this.state.filterText}),s.a.createElement("section",{className:"page"},s.a.createElement("div",{ref:this.mainScroller}),s.a.createElement(he,{APPDATA:re,fixtureView:this.state.fixtureView,mode:this.state.mode,selectedFixture:this.state.selectedFixture,onFilterTextChange:this.handleFilterTextChange,filterText:this.state.filterText,onFixtureClick:this.handleFixtureClick})),s.a.createElement(p,{mode:this.state.mode,onModeChange:this.handleBuildMode}))}}]),a}(s.a.Component);fetch("fixtureData.json").then((function(e){return console.log(e),e.ok||console.error("Database not found."),e.text()})).then((function(e){re=JSON.parse(e),h.a.render(s.a.createElement(de,null),document.querySelector("#root"))}))}],[[10,1,2]]]);
//# sourceMappingURL=main.b4b11d61.chunk.js.map