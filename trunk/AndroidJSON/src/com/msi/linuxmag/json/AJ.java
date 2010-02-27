package com.msi.linuxmag.json;



import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import java.io.*;
import org.json.*;


public class AJ extends Activity {
    
	
	JSONObject obj = null;
	String staticObject = "{\"firstname\":\"Steve\",\"lastname\":\"Jobs\",\"cellphones\":\"0\"}";
	
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        Button btn = (Button) findViewById(R.id.btnTest);
        btn.setOnClickListener(new Button.OnClickListener()
        {
        	public void onClick(View v)
        	{
        		buildObject();
        	}
        });
        
        Button btnFile = (Button) findViewById(R.id.btnTestFile);
        btnFile.setOnClickListener(new Button.OnClickListener()
        {
        	public void onClick(View v)
        	{
        		buildObjectFromFile();
        	}
        });
        
        
        
    }
    
    void buildObject()
    {
    	try
    	{
    		obj = new JSONObject(staticObject);
    		String x = obj.get("firstname").toString() + " " + obj.get("lastname").toString() + " has " + obj.getInt("cellphones") + " Android phones.";
    		setStatus(x);
    	}
    	catch (JSONException je)
    	{
    		setStatus("Error occured " + je.getMessage());
    	}
    }
    
    
    
    void buildObjectFromFile()
    {
    	try
    	{
    		String x = "";
    		InputStream is = this.getResources().openRawResource(R.raw.interview);
    		byte [] buffer = new byte[is.available()];
    		while (is.read(buffer) != -1);
    		String json = new String(buffer);
    		obj = new JSONObject(json);
    		x = obj.getString("firstname") + " " + obj.getString("lastname") + "\n";
    		x += obj.getString("occupation") + "\n";
    		
    		
    		JSONObject interview =  obj.getJSONObject("interview");
    		x += "Interview source:" + interview.getString("source")  + "\n";
    		
    		JSONArray questions = interview.getJSONArray("questions");
    		x += "Number of questions: " + questions.length()  + "\n\n";
    		
    		
    		int i;
    		for (i=0;i<questions.length();i++)
    		{
    			JSONObject qa = questions.getJSONObject(i);
    			x += "------------\n";
    			x += "Q" + (i+1) + ". " + qa.getString("Question") + "\n\n";
    			x += "A" + (i+1) + ". " + qa.getString("Answer") + "\n";
    		}
    		setStatus(x);
    	}
    	catch (Exception je)
    	{
    		setStatus("Error w/file: " + je.getMessage());
    	}
    }
    void setStatus(String x)
    {
		TextView tv = (TextView) findViewById(R.id.txtStatus);
		tv.setText(x);    	
    }
}