//��ʾ��ǰ�����Ľڵ�
var highlightindex = -1;
$(document).ready(function() {
    var wordInput = $("#word");
    var wordInputOffset = wordInput.offset();
    //�Զ���ȫ���ʼӦ����������
    $("#auto").hide().css("border","1px black solid").css("position","absolute")
            .css("top",wordInputOffset.top + wordInput.height() + 5 + "px")
            .css("left",wordInputOffset.left + "px").width(wordInput.width() + 2);

    //���ı�����Ӽ��̰��²�������¼�
    wordInput.keyup(function(event) {
        //�����ı����еļ����¼�
        var myEvent = event || window.event;
        var keyCode = myEvent.keyCode;
        //������������ĸ��Ӧ�ý��ı��������µ���Ϣ���͸�������
        //�����������˸����ɾ������ҲӦ�ý��ı����е�������Ϣ���͸�������
        if (keyCode >= 65 && keyCode <= 90 || keyCode == 8 || keyCode == 46) {
            //1.���Ȼ�ȡ�ı����е�����
            var wordText = $("#word").val();
            var autoNode = $("#auto");
            if (wordText != "") {
                //2.���ı����е����ݷ��͸���������
                $.post("AutoComplete",{word:wordText},function(data){
                    //��dom����dataת����JQuery�Ķ���
                    var jqueryObj = $(data);
                    //�ҵ����е�word�ڵ�
                    var wordNodes = jqueryObj.find("word");
                    //�������е�word�ڵ㣬ȡ���������ݣ�Ȼ�󽫵���������ӵ���������
                    //��Ҫ���ԭ��������
                    autoNode.html("");
                    wordNodes.each(function() {
                        //��ȡ��������
                        var wordNode = $(this);
                        //�½�div�ڵ㣬���������ݼ��뵽�½��Ľڵ���
                        //���½��Ľڵ���뵽������Ľڵ���
                        $("<div>").html(wordNode.text()).appendTo(autoNode);
                    });
                    //����������������ݷ��أ�����ʾ������
                    if (wordNodes.length > 0) {
                        autoNode.show();
                    } else {
                        autoNode.hide();
                        //���������ص�ͬʱ�������ڵ�����ֵҲ�Ƴ�-1
                        highlightindex = -1;
                    }
                },"xml");
            } else {
                autoNode.hide();
                highlightindex = -1;
            }
        } else if (keyCode == 38 || keyCode == 40) {
            //��������������38����40����
            if (keyCode == 38) {
                //����
                var autoNodes = $("#auto").children("div")
                if (highlightindex != -1) {
                    //���ԭ�����ڸ����ڵ㣬�򽫱���ɫ�ĳư�ɫ
                    autoNodes.eq(highlightindex).css("background-color","white");
                    highlightindex--;
                } else {
                    highlightindex = autoNodes.length - 1;    
                }
                if (highlightindex == -1) {
                    //����޸�����ֵ�Ժ�index���-1��������ֵָ�����һ��Ԫ��
                    highlightindex = autoNodes.length - 1;
                }
                //�����ڸ��������ݱ�ɺ�ɫ
                autoNodes.eq(highlightindex).css("background-color","red");
            }
            if (keyCode == 40) {
                //����
                var autoNodes = $("#auto").children("div")
                if (highlightindex != -1) {
                    //���ԭ�����ڸ����ڵ㣬�򽫱���ɫ�ĳư�ɫ
                    autoNodes.eq(highlightindex).css("background-color","white");
                }
                highlightindex++;
                if (highlightindex == autoNodes.length) {
                    //����޸�����ֵ�Ժ�index���-1��������ֵָ�����һ��Ԫ��
                    highlightindex = 0;
                }
                //�����ڸ��������ݱ�ɺ�ɫ
                autoNodes.eq(highlightindex).css("background-color","red");
            }
        } else if (keyCode == 13) {
            //���������ǻس�

            //�������и�������
            if (highlightindex != -1) {
                //ȡ�������ڵ���ı�����
                var comText = $("#auto").hide().children("div").eq(highlightindex).text();
                highlightindex = -1;
                //�ı����е����ݱ�ɸ����ڵ������
                $("#word").val(comText);
            } else {
                //������û�и�������
                alert("�ı����е�[" + $("#word").val() + "]���ύ��");
            }
        }
    });

    //����ť����¼�����ʾ�ı����е����ݱ��ύ
    $("input[type='button']").click(function() {
        alert("�ı����е�[" + $("#word").val() + "]���ύ��");
    });
})