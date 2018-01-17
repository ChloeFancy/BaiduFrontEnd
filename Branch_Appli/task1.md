任务一：表单（一）单个表单项的检验<br>
----
如示例图![](http://7xrp04.com1.z0.glb.clouddn.com/task_2_29_1.jpg)中所示，在页面中实现一个输入框与按钮，要求点击验证按钮后，对输入框中内容进行格式校验，并在其下方显示校验结果<br>
校验规则：<br>
1.字符数为4~16位<br>
2.每个英文字母、数字、英文符号长度为1<br>
3.每个汉字，中文符号长度为2<br>
没有加很多样式的结果：http://htmlpreview.github.io/?https://github.com/ChloeFancy/BaiduIFE/blob/master/Branch_Appli/task1.html
<br>
## 遇到的问题
### 如何检验汉字？<br>
"首先，寻常的字符（数字、字母、标点符号等），都可以用8位的ASCII码表示，范围就是/[\x00-\xff]/<br>
而为了表示全球所有的符号，就有了Unicode——Universal Multiple-Octet Coded Character Set”，简称 UCS, 俗称 "unicode".<br>
汉字就是Unicode能表示的符号的一部分。<br>
然后，meta元字段中的UTF-8的意思是：Unicode Tranfer Format-8，每次以8位传输数据<br>
在这种方式中，一个字符就是两个字节。它可以使用1~4个字节表示一个符号，根据不同的符号而变化字节长度，<br>
当字符在ASCII码的范围时，就用一个字节表示，保留了ASCII字符一个字节的编码做为它的一部分，<br>
注意的是unicode一个中文字符占2个字节，而UTF-8一个中文字符占3个字节。"

以上内容摘自 <br>
作者：于洋 <br>
链接：https://www.zhihu.com/question/23374078/answer/69732605 <br>
来源：知乎 <br>
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br>

<br>
在检验"名称"这个输入框的信息时，就通过文本框的值判断其中汉字和英文数字等的个数，得出它们的字符数。<br>
刚开始在元字段中就使用了默认的UTF-8，但是由于在UTF-8字符集下，汉字占3个字节，不满足要求，因此将其改成GBK。

### 正则表达式
在正则表达式中，\x代表ASCII码字符，\x00-\xff就可以匹配ASCII表中的所有字符，/[\x41-\x5A]/就相当于/[A-Z]/.<br>
g——global的含义是匹配到字符串的末尾，reg.exp(string)返回的数组就会包含所有的匹配项。
在匹配一个字符的时候不加g也是可以的。
