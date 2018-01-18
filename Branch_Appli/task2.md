## 任务描述
如示例图![](http://7xrp04.com1.z0.glb.clouddn.com/task_2_30_1.jpg)
中所示，基于上一个任务，在页面中添加多个表单<br>
要求:<br>
表单获得焦点时，下方显示表单填写规则<br>
表单失去焦点时校验表单内容<br>
校验结果正确时，表单边框显示绿色，并在下方显示验证通过的描述文字<br>
校验结果错误时，表单边框显示红色，并在下方显示验证错误的描述文字<br>
点击提交按钮时，对页面中所有输入进行校验，校验结果显示方式同上。若所有表单校验通过，弹窗显示“提交成功”，否则显示“提交失败”<br>

效果预览：http://htmlpreview.github.io/?https://github.com/ChloeFancy/BaiduIFE/blob/master/Branch_Appli/task2.html<br>

## 遇到的问题
* 事件委托给form元素失败
原因：focus、blur事件不能冒泡。因此用focusin、focusout事件替代它们。
* 在<input>标签中，pattern特性中的正则表达式验证失败
原因：pattern特性的值不需要//两条斜线，以及^$来表示开始和结尾，pattern中的模式自动会从开头匹配到结尾。

## 收获
* 学习了字段的validaty属性中的多种属性：<br>
valueMissing——标签中required特性是true的字段，如果没有填写内容，则返回true<br>
patternMismatch——标签中的pattern特性与字段的值不匹配，则返回true<br>
valid——符合标签中所有特性的格式要求，则返回true<br>
typeMismatch——type是mail/url，不满足正确格式，则返回true
