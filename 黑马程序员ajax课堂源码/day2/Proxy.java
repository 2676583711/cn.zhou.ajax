import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.OutputStreamWriter;
import java.net.*;
import java.util.Enumeration;

public class Proxy extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response)
            throws javax.servlet.ServletException, java.io.IOException  {
        response.setContentType("text/html;charset=GB2312");
        String url = request.getParameter("url");
        StringBuffer param = new StringBuffer();
        Enumeration enu = request.getParameterNames();
        int total = 0;
        while(enu.hasMoreElements()){
            String name = (String)enu.nextElement();
            if(!name.equals("url")){
                if(total == 0){
                    param.append(name).append("=").append(URLEncoder.encode(request.getParameter(name),"UTF-8"));
                } else{
                    param.append("&").append(name).append("=").append(URLEncoder.encode(request.getParameter(name),"UTF-8"));
                }
                total++;

            }
        }
        PrintWriter out = response.getWriter();
        if(url != null){
            URL connect = new URL(url.toString());
            URLConnection connection = connect.openConnection();
            connection.setDoOutput(true);
            OutputStreamWriter paramout = new OutputStreamWriter(connection.getOutputStream());
            paramout.write(param.toString());
            paramout.flush();
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(),"GB2312"));
            String line;
            while((line = reader.readLine()) != null){
               out.println(line);
            }
            paramout.close();
            reader.close();
        }

    }
    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, java.io.IOException {
        response.setContentType("text/html;charset=GB2312");
        StringBuffer url = new StringBuffer();
        url.append(request.getParameter("url"));
        Enumeration enu = request.getParameterNames();
        int total = 0;
        while(enu.hasMoreElements()){
            String name = (String)enu.nextElement();
            if(!name.equals("url")){
                if(total == 0){
                    url.append("?").append(name).append("=").append(URLEncoder.encode(request.getParameter(name),"UTF-8"));
                } else{
                    url.append("&").append(name).append("=").append(URLEncoder.encode(request.getParameter(name),"UTF-8"));
                }
                total++;

            }
        }
        PrintWriter out = response.getWriter();
        if(url != null){
             URL connect = new URL(url.toString());
             BufferedReader reader = new BufferedReader(new InputStreamReader(connect.openStream(),"GB2312"));
             String line;
             while((line = reader.readLine()) != null){
                out.println(line);
             }
             reader.close();
        }

        http://www.sohu.com/index.html?name=123&id=000
        Proxy?url=http://www.sohu.com/index.html&name=123&id=000

        url=http://www.sohu.com/index.html&name=123&id=000

        http://www.sohu.com/index.html?id=000&name=123

//ฮารว
}
}
