/*!
	Picbox v2.2
	(c) 2010 Ben Kay <http://bunnyfire.co.uk>

	Based on code from Slimbox v1.7 - The ultimate lightweight Lightbox clone
	(c) 2007-2009 Christophe Beyls <http://www.digitalia.be>
	
	Uses jQuery-mousewheel Version: 3.0.2
	(c) 2009 Brandon Aaron <http://brandonaaron.net>
	
	MIT-style license.
*/
(function(b){function ca(){var a={x:k.scrollLeft(),y:k.scrollTop()};r=k.width()/2;s=k.height()/2;if(N){r+=a.x;s+=a.y;b(l).css({left:a.x,top:a.y,width:k.width(),height:k.height()})}b(h).css({top:s,left:r,width:"1px",height:"1px"})}function O(a){e.hideFlash&&b.each(["object","embed"],function(d,f){b(f).each(function(){if(a)this._picbox=this.style.visibility;this.style.visibility=a?"hidden":this._picbox})});l.style.display="";var c=a?"bind":"unbind";b(document)[c]("keydown",da);b(document)[c]("mousewheel", ea);b(document)[c]("mousemove",G);b(n)[c]("mouseover",function(){P(1)});b(n)[c]("mouseout",P)}function da(a){a=a.keyCode;return b.inArray(a,e.closeKeys)>=0?Q():b.inArray(a,e.nextKeys)>=0?R():b.inArray(a,e.previousKeys)>=0?S():false}function G(){T([n,w,zoomBtn,x])}function T(a,c){clearTimeout(H);b(a).fadeIn();a=c?b.merge(a,c):a;H=setTimeout(function(){b(a).fadeOut()},e.controlsFadeDelay)}function P(a){a=1==a?"unbind":"bind";b(document)[a]("mousemove",G);clearTimeout(H)}function S(){return I(y,true)} function R(){return I(z,true)}function I(a,c){if(a>=0){o=a;D=i[a][0];y=(o||(e.loop?i.length:0))-1;z=(o+1)%i.length||(e.loop?0:-1);U();l.className="pbLoading";b(h).css("display","none");i[o][1]?b(J).html(i[o][1]).show():b(J).html("").hide();b(V).html((i.length>1&&e.counterText||"").replace(/{x}/,o+1).replace(/{y}/,i.length));if(y>=0){W.src=i[y][0];b(w).removeClass(A)}if(z>=0){X.src=i[z][0];b(x).removeClass(A)}j=new Image;j.onload=function(){fa(c)};j.src=D}return false}function fa(a){Y();var c=k.width()- e.margins,d=k.height()-e.margins,f=1;if(j.width>c||j.height>d){f=Math.min(c/j.width,d/j.height);b(zoomBtn).removeClass(A);K=false}else{b(zoomBtn).addClass(A);K=true}t=L=f;B(f,a);b(h).attr("src",D);b(h).css("display","");l.className="";T([n],[w,zoomBtn,x])}function B(a,c){var d=a/t;u=r-(r-u)*d;v=s-(s-v)*d;t=a;d=j.width*a;var f=j.height*a,g=u-d/2>>0,p=v-f/2>>0;c=c?0:e.resizeDuration;a=0==a?function(){b(h).hide()}:function(){};b(h).animate({width:d,height:f,top:p,left:g},{queue:false,duration:c,easing:e.resizeEasing, complete:a});return false}function Y(){u=r;v=s}function ea(a,c){b(zoomBtn).addClass(C);return B(t+c*t/10)}function Z(){if(t==L&&u==r&&v==s&&!K){b(zoomBtn).addClass(C);return B(1)}else{b(zoomBtn).removeClass(C);Y();return B(L)}}function U(){j.onload=function(){};j.src=W.src=X.src=D;b(h).stop();b([w,x]).addClass(A);b(zoomBtn).removeClass(C)}function Q(){if(o>=0){U();o=y=z=-1;B(0);O();b(n).stop().hide();b(l).stop().fadeOut()}return false}function M(a){var c=[].slice.call(arguments,1),d=0;a=b.event.fix(a|| window.event);a.type="mousewheel";if(a.wheelDelta)d=a.wheelDelta/120;if(a.detail)d=-a.detail/3;c.unshift(a,d);return b.event.handle.apply(this,c)}var k=b(window),e,i,o=-1,D,y,z,ga=window.XMLHttpRequest==undefined&&ActiveXObject!=undefined,N,r,s,u,v,t,L,H,K,j={},W=new Image,X=new Image,l,$,h,w,x,n,J,V,C="pbzoomed",A="pbgreyed";b(document).ready(function(){b(document.body).append(b([l=b('<div id="pbOverlay" />').click(Q).append($=b('<div id="pbCloseBtn" />')[0])[0],h=b('<img id="pbImage" />').dblclick(Z)[0], n=b('<div id="pbBottom" />').append([J=b('<div id="pbCaption" />')[0],b('<div id="pbNav" />').append([w=b('<a id="pbPrevBtn" href="#" />').click(S)[0],zoomBtn=b('<a id="pbZoomBtn" href="#" />').click(Z)[0],x=b('<a id="pbNextBtn" href="#" />').click(R)[0]])[0],V=b('<div id="pbNumber" />')[0]])[0]]).css("display","none"));(N=ga||l.currentStyle&&l.currentStyle.position!="fixed")&&b([l,$,h,n]).css("position","absolute");b(h).tinyDrag(function(){var a=b(h),c=a.position();u=c.left-k.scrollLeft()+a.width()/ 2;v=c.top-k.scrollTop()+a.height()/2;b(zoomBtn).addClass(C)})});b.picbox=function(a,c,d){e=b.extend({loop:false,overlayOpacity:0.8,overlayFadeDuration:200,resizeDuration:300,resizeEasing:"swing",controlsFadeDelay:3E3,counterText:false,hideFlash:true,closeKeys:[27,88,67],previousKeys:[37,80],nextKeys:[39,78],margins:0},d||{});if(typeof a=="string"){a=[[a,c]];c=0}b(l).css("opacity",0).fadeTo(e.overlayFadeDuration,e.overlayOpacity);b(n).css("display","");G();ca();O(1);i=a;e.loop=e.loop&&i.length>1;return I(c)}; b.fn.picbox=function(a,c,d){c=c||function(g){return[g.href,g.title]};d=d||function(){return true};var f=this;b(f).unbind("click").click(function(){var g=this,p=[];filteredLinks=b.grep(f,function(E){return d.call(g,E)});for(var m=0;m<filteredLinks.length;m++)p[m]=c(filteredLinks[m]);return b.picbox(p,b.inArray(this,filteredLinks),a)});return f};b.fn.tinyDrag=function(a){return b.tinyDrag(this,a)};b.tinyDrag=function(a,c){function d(q){var aa=q.pageX;q=q.pageY;if(m)a.css({left:p.x+(aa-g.x),top:p.y+ (q-g.y)});else if(ba(aa-g.x)>1||ba(q-g.y)>1)m=true;return false}function f(){E.unbind("mousemove",d).unbind("mouseup");m&&c&&c()}var g,p,m,E=b(document),ba=Math.abs;a.mousedown(function(q){m=false;g={x:q.pageX,y:q.pageY};p={x:parseInt(a.css("left")),y:parseInt(a.css("top"))};E.mousemove(d).mouseup(f);return false});return a};var F=["DOMMouseScroll","mousewheel"];b.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=F.length;a;)this.addEventListener(F[--a],M,false);else this.onmousewheel= M},teardown:function(){if(this.removeEventListener)for(var a=F.length;a;)this.removeEventListener(F[--a],M,false);else this.onmousewheel=null}};b.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);
