/**
 * Created by Administrator on 2016/7/25.
 */
function Banner(idName,interval,effect){
    this.oBig=document.getElementById(idName);
    this.oBoxInner=this.oBig.getElementsByTagName('div')[0]
    this.oDiv=this.oBoxInner.getElementsByTagName('div')
    this.aImg=this.oBoxInner.getElementsByTagName('img')
    this.oDat=this.oBig.getElementsByTagName('ul')[0]
    this.aLi=this.oDat.getElementsByTagName('li')
    this.aAa=this.oDat.getElementsByTagName('i')
    this.oBtnL=this.oBig.getElementsByTagName('a')[0]
    this.oBtnR=this.oBig.getElementsByTagName('a')[1]
    this.interval=interval||1000
    this.myEffect=effect||0
    this.step=0
    this.autoTimer=null
    this.init()
}

Banner.prototype= {
    constructor: Banner,
    init: function () {
        var _this = this;
        this.lazyImg()
        clearInterval(this.autoTimer)
         this.autoTimer=setInterval(function () {
         _this.autMove()
         },this.interval);
        this.blockNone();
        this.handlePosition();
        this.leftRight()
    },
    lazyImg: function lazyImg() {
        for (var i = 0; i < this.aImg.length; i++) {
            var _this = this;
            (function (index) {
                var tmpImg = new Image;
                tmpImg.src = _this.aImg[i].getAttribute('r')
                tmpImg.onload = function () {
                    _this.aImg[index].src = this.src;
                    utils.css(_this.oDiv[0], 'zIndex', 1);
                    zhufengAnimate(_this.oDiv[0], {opacity: 1}, 500)
                    tmpImg = null
                }
            })(i)
        }
    },
    autMove: function () {
        if (this.step >= this.oDiv.length - 1) {
            this.step = -1
        }
        this.step++
        this.setBanner()
    },
    setBanner: function () {
        for (var i = 0; i < this.oDiv.length; i++) {
            var curEle = this.oDiv[i]
            if (i === this.step) {
                utils.css(curEle, 'zIndex', 1)
                zhufengAnimate(curEle, {opacity: 1}, 500, function () {
                    var siblings = utils.siblings(this);
                    for (var k = 0; k < siblings.length; k++) {
                        utils.css(siblings[k], 'opacity', 0)
                    }
                })
            } else {
                utils.css(curEle, 'zIndex', 0)
            }
        }
        this.bannerTip()
    },
    bannerTip: function () {
        for(var i=0;i<this.aLi.length;i++){
            this.aLi[i].className=i===this.step?'bg':'';
        }
    },
    blockNone: function () {
        var _this=this;
        this.oBig.onmouseover= function () {
            clearInterval(_this.autoTimer)
            _this.oBtnL.style.display=_this.oBtnR.style.display='block'
        }
        this.oBig.onmouseout= function () {
            _this.autoTimer=setInterval(function () {
                _this.autMove()
            },_this.interval)
            _this.oBtnL.style.display=_this.oBtnR.style.display='none'
        }
    },
    handlePosition: function () {
        var _this=this;
        for(var i=0;i<this.aLi.length;i++){
            (function (index) {
                _this.aLi[i].onclick= function () {
                    _this.step=index
                    _this.setBanner()
                }
            })(i)
        }
    },
    leftRight: function () {
        var _this=this;
        this.oBtnL.onclick= function () {
            if(_this.step<=0){
                _this.step=_this.oDiv.length;
            }
            _this.step--
            _this.setBanner()
        }
        this.oBtnR.onclick= function () {
            _this.autMove()
        }
    }

}

