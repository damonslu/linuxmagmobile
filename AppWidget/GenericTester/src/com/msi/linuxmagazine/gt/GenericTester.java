package com.msi.linuxmagazine.gt;



import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Button;

public class GenericTester extends Activity {
	 
	private int counter = 0;
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        
        
        final Button btnSendMessage = (Button) findViewById(R.id.SendMessage);
        final EditText etInputText = (EditText) findViewById(R.id.inputText);
        etInputText.setText("some message");
        
        btnSendMessage.setOnClickListener(new View.OnClickListener(){
            
        	public void onClick(View v){
        		Log.i(GenericTester.class.getName(),"Button Clicked! " + counter);
        		try {
        			Intent traceIntent = new Intent();
        			traceIntent.setAction("com.msi.linuxmagazine.TRACEME"); 
        			counter++;
        			traceIntent.putExtra("msg", etInputText.getText().toString());
        			traceIntent.putExtra("sender",GenericTester.class.getSimpleName());
        			sendBroadcast(traceIntent);
        			
        		} catch (Exception e) {
        			Log.e(GenericTester.class.getName(),"Error occured [" + e.getMessage() + "]");
        		}
        	}
        });
        
        
        
    }
}