package com.example.nodejsmysql;

import android.app.Activity;
import android.app.DownloadManager;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.io.IOException;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.sql.*;
import java.util.List;

import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
public class MainActivity extends Activity {

    private TextView responseText;
    private TextView detailText;

    //DBService 对象
    public static MainActivity dbService=null;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        responseText = (TextView) findViewById(R.id.response);
        detailText=(TextView) findViewById(R.id.detail);
    }

    public static MainActivity getDbService(){
        if(dbService==null){
            dbService=new MainActivity();
        }
        return dbService;
    }

    public void add(View view){
        sendRequestWithOkHttp("4");
    }

    public void del(View view){
        sendRequestWithOkHttp("3");
    }

    public void change(View view){
        sendRequestWithOkHttp("2");
    }

    public void search(View view){
        sendRequestWithOkHttp("1");
    }

    private void sendRequestWithOkHttp(final String itemnum){
        new Thread(new Runnable(){
            @Override
            public void run(){
                try{
                    OkHttpClient client = new OkHttpClient();
                    Request request = new Request.Builder()
                            .url("http://39.105.75.192:3000/get/"+itemnum)
                            .build();
                    Response response = client.newCall(request).execute();
                    String responseData = response.body().string();
                    System.out.println(responseData);
                    showResponse(responseData);
                    parseJSONWithJSONObject(responseData);
                }catch(Exception e){
                    e.printStackTrace();
                }
            }
        }).start();
    }

    private void showResponse(final String response){
        runOnUiThread(new Runnable(){
            @Override
            public void run(){
                responseText.setText(response);
            }
        });
    }

    private void parseJSONWithJSONObject(String jsonData) {
        try
        {
            JSONArray jsonArray = new JSONArray(jsonData);
            for (int i=0; i < jsonArray.length(); i++)    {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                String b = jsonObject.getString("B");
                System.out.println("b:"+b);
                detailText.setText(b);
            }
        }
        catch (Exception e)
        {
            detailText.setText("");
            e.printStackTrace();
        }
    }

}
class Person{
    private int A;
    private String B;
    public String getB(){
        return B;
    }
    public int getA(){return A;}
    public void setA(int a){
        A=a;
    }
    public void setB(String b){
        B=b;
    }
}
