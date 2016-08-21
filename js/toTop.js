/**
 * Created by Administrator on 2016/8/13.
 */
var oBtn=document.getElementsById('toTop')
var timer=null;
var bOk=false;
window.onscroll=computedDisplay;
function computedDisplay(){//手动触发--鼠标滚轮滑动
    if(bOk){
        clearInterval(timer);
    }
    bOk=true;//只有当手动触发--鼠标滚轮滑动时才能变成true；否则就是false；
    if(utils.win('scrollTop')>utils.win('clientHeight')){
        oBtn.style.display='block';
    }else{
        oBtn.style.display='none';
    }
}
oBtn.onclick=function(){
    var target=utils.win('scrollTop');
    var duration=500;
    var interval=30;
    var step=target/duration*interval;
    timer=setInterval(function(){
        var curTop=utils.win('scrollTop');
        if(curTop<=0){
            clearInterval(timer);
            return;
        }
        curTop-=step;
        utils.win('scrollTop',curTop);
        bOk=false;
    },interval)
}