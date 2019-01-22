import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;

/**
 * Created by IntelliJ IDEA.
 * User: ming
 * Date: 2008-6-14
 * Time: 14:17:00
 * To change this template use File | Settings | File Templates.
 * 接收用户端请求
 */
public class AutoComplete extends HttpServlet{
    protected void doGet(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws ServletException, IOException {
        //表示页面传过来的字符串，用于和服务器段的单词进行完整匹配
        String word = httpServletRequest.getParameter("word");
        //将字符串保存在request对象中
        httpServletRequest.setAttribute("word",word);
        //将请求转发给视图层（注意AJAX中，这个所谓的视图层不返回页面，只返回数据，所以也可以称作使一个数据层）
        httpServletRequest.getRequestDispatcher("wordxml.jsp").
                forward(httpServletRequest, httpServletResponse);

    }

    protected void doPost(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws ServletException, IOException {
        doGet(httpServletRequest, httpServletResponse);    //To change body of overridden methods use File | Settings | File Templates.
    }
}
