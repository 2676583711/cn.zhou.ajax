<%--
  itcast.cn的ajax自动补全实例
--%>
<!--与传统应用的视图层不同 ，这个jsp返回的是xml的数据，因此contentType的值是text/xml-->
<%@ page contentType="text/xml;charset=UTF-8" language="java" %>
<!--返回xml数据的‘视图层暂时不做任何逻辑判断，先将所有单词都返回，待前后台应用可以完整的协作之后，再限制返回的内容’-->
<words>
    <word>absolute</word>
    <word>anyone</word>
    <word>anything</word>
    <word>apple</word>
    <word>abandon</word>
    <word>breach</word>
    <word>break</word>
    <word>boolean</word>
</words>
