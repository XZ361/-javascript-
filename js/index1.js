// 实现瀑布流，加载所有的图片
window.onload=function(){
    imgLocation("container","box");
    var imgData={"data":[{"src":"14.jpg"},{"src":"15.jpg"},{"src":"16.jpg"},{"src":"17.jpg"},{"src":"18.jpg"},{"src":"19.jpg"},{"src":"20.jpg"},{"src":"21.jpg"},
    {"src":"22.jpg"},{"src":"23.jpg"},{"src":"24.jpg"},{"src":"25.jpg"},{"src":"26.jpg"},{"src":"27.jpg"},]};
    window.onscroll=function(){
        if(checkHeight()){
            var cparent=document.getElementById("container");
           for(var i=0;i<imgData.data.length;i++){
           
            var oBox=document.createElement("div");
            oBox.className="box";
            cparent.appendChild(oBox);
            var boxImg=document.createElement("div");
            boxImg.className="box_img";
            oBox.appendChild(boxImg);
            var oImg=document.createElement("img");
            oImg.src="./images/"+imgData.data[i].src;
            boxImg.appendChild(oImg);
           }
        imgLocation("container","box");
        }
    }
}
// 加载所有的图片
function imgLocation(parent,content){
    var cparent=document.getElementById(parent);
    var ccontent=getChildElement(cparent,content);
    var imgWidth=ccontent[0].offsetWidth;
    var cols=Math.floor(document.documentElement.clientWidth/imgWidth);
    cparent.style.cssText="width:"+imgWidth*cols+"px;margin:0 auto;";

    // 将第二行的第一张图片放置在第一张高度最小的图片下
    // 首先获取第一行的所有图片，并将其存入数组
    // 多数组中的数值进行排序，拿到最小的图片高度
    var attrHeight=[];
    for(var i=0;i<ccontent.length;i++){
        if(i<cols){
            attrHeight[i]=ccontent[i].offsetHeight;
        }else{
            // min函数不能直接判断数组，所以用apply函数，岂有两个参数，null和要处理的数组
            var minHeight=Math.min.apply(null,attrHeight);
            var minIndex=getMinHeightLocation(attrHeight,minHeight);
            ccontent[i].style.position="absolute";
            ccontent[i].style.top=minHeight+"px";
            ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
            attrHeight[minIndex]=attrHeight[minIndex]+ccontent[i].offsetHeight;
        }
    }
}
function checkHeight(){
    var cparent=document.getElementById("container");
    var ccontent=getChildElement(cparent,"box");
    var lastContentHeight=ccontent[ccontent.length-1].offsetTop;
    // 当页面高度+scrollTop的高度大于图片最后一张距离顶部的高度时，开始加载图片资源数据
    var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    if(lastContentHeight<pageHeight+scrollTop){
        return true;
    }
}
function getMinHeightLocation(attrHeight,minHeight){
    for(var i in attrHeight){
        if(attrHeight[i]==minHeight){
            return i;
        }
    }
}
function getChildElement(parent,content){
    // *代表匹配任意元素
    var allContent=parent.getElementsByTagName('*');
    var attr=[];
    for(var i=0;i<allContent.length;i++){
        if(allContent[i].className==content){
            console.log(allContent[i])      ;
            attr.push(allContent[i]);
        }
    }
    
    return attr;
}