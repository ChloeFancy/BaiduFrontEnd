#任务四：听指令的小方块（一）<br>
<br>任务描述
<br>如图![](http://7xrp04.com1.z0.glb.clouddn.com/task_2_33_1.jpg)，实现一个类似棋盘的格子空间，每个格子用两个数字可以定位，一个红正方形的DOM在这个空间内，正方形中的蓝色边表示这是他的正面，有一个input输入框
<br>在输入框中允许输入如下指令，按下按钮后，使得正方形做相应动作
<br>GO：向蓝色边所面向的方向前进一格（一格等同于正方形的边长）
<br>TUN LEF：向左转（逆时针旋转90度）
<br>TUN RIG：向右转（顺时针旋转90度）
<br>TUN BAC：向右转（旋转180度）
<br>移动不能超出格子空间
<br>预览效果：htmlpreview.github.io/?https://github.com/ChloeFancy/BaiduIFE/blob/master/Branch_Appli/task4.html
##总结：
* CSS3 Animation
<br>在方块的旋转过程中，第一次实现是直接更改div的transform属性，这样实现出的效果比较直接，没有过渡。后来想到了可以做一点动画效果，看起来更好玩，首先想用setTimeout，可以控制旋转角度按固定步长变化，后来想到了CSS3中有animation特性，于是就开始做起来。
<br>首先是需要关键帧（@keyframes frameName），在其中设定关键帧的属性。
```css
@keyframes mymove{
  from{transform:rotate(0deg)}
  to{transform:rotate(90deg)}
}
```
然后就是在#item的样式中设置animation
```css
#item{
  animation: mymove 2s 1;
  /*关键帧名animation-name 动画持续时间animation-duration 动画播放次数animation-iteration-count*/
}
```
在这里我只设置了最初（from）和最后（to）的两帧，还可以增加中间过程的其他帧，用百分号来表示。
```css
@-webkit-keyframes mymove{
  form{transform:rotate(0deg)}
  50%{transform:rotate(180deg)}
  to{transform:rotate(90deg)}
}
```
接下来遇到的问题就是，原来动画播放完1次后，会回到from{...}的状态，因此还需要将item旋转到to的状态。
<br>并且旋转之后，不能再继续旋转了，因为在最开始已经设置了animation-iteration-count为1，为了解决这个问题，我尝试过将一个在样式表中已经设置好动画的className每次重复赋给item、结束后remove它，然而并不能实现。
<br>上网查过后，发现可以每一次在item外加一个wrapper，wrapper上已经设置好了animation属性等等样式，这样就可以实现多次地播放动画，其实质是旋转wrapper，只不过作为wrapper子节点的item也有了旋转的效果。
<br>！！不能直接设置
```javascript
item.outerHTML = "<div id='wrapper'>"+item.outerHTML+"</div>";
```
因为在需要撤下wrapper时，无法定位wrapper，因为这个div不在DOM树中，因此，采用DOM方法创建wrapper节点，将item设为子节点；在撤下wrapper时，将item设为wrapper.parentNode(td元素)的子节点。
```javascript
wrapper.className = 'anim';
		item.parentNode.appendChild(wrapper);
		wrapper.appendChild(item);
		setTimeout(function(){
			item.parentNode.parentNode.appendChild(item);
			item.parentNode.removeChild(item.parentNode.firstChild);
			var rules = sheet.rules;
			sheet.insertRule("#item{transform:rotate("+deg+"deg)}",rules.length-1);
			rules.remove(rules.length-1);
		},1000);
    ```
* CSS table
在tabel的每一个td元素之间是有inline元素的间隙的，因此
```css
table{
  border-collapse:collapse;
}
```
collapse意味着表格的边框会合并为单一的边框，“单一”就解释了为什么给每个td元素1px的border，在table中看到的效果仍然是1px。
而如果设置
```css
table{
  border-spacing:0px;
}
```
效果则是每个边框线的宽度为2px，即每个边框与周围的另一条边框都显示出来了。。
