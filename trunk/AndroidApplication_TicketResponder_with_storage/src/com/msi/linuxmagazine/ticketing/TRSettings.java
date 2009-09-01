/*
 * 
 * 
 * TRSettings.java
 * Ticketing sample application written for Linux Magazine
 * Author: Frank Ableson, fableson@msiservices.com
 * More details: http://www.linux-mag.com/blogs/fableson
 * September 2009
 * 
 */
package com.msi.linuxmagazine.ticketing;

import android.app.Activity;
import android.content.Context;
import android.view.View;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.util.Log;
import android.app.AlertDialog;

import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;

public class TRSettings extends Activity {
	
	
	final String tag = "TRSettings";
	private SharedPreferences prefs = null;
	private Editor editor = null;
	
	
	public static final String SERVERADDRESS = "serveraddress";
	public static final String USERNAME = "username";
	public static final String PASSWORD = "password";
	public static final String PREFERENCESNAME = "TicketResponder";
	
	
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.settings);
        
        
        final EditText serverAddress = (EditText) findViewById(R.id.serverAddress);
        final EditText userName = (EditText) findViewById(R.id.userName);
        final EditText password = (EditText) findViewById(R.id.password);
        final Button saveButton = (Button) findViewById(R.id.saveButton);
        
        
        prefs = this.getSharedPreferences("TicketResponder", Context.MODE_PRIVATE);
        editor = prefs.edit();
        serverAddress.setText(prefs.getString(TRSettings.SERVERADDRESS, "http://servernamegoeshere/"));
        userName.setText(prefs.getString(TRSettings.USERNAME, "user"));
        password.setText(prefs.getString(TRSettings.PASSWORD,"password"));
        
        saveButton.setOnClickListener(new Button.OnClickListener() {

            public void onClick(View v) {
                try {
                	String server = serverAddress.getText().toString();
                	String user = userName.getText().toString();
                	String pword = password.getText().toString();
                	Log.i(tag,"server address is [" + server + "]");
                	Log.i(tag,"username is [" + user + "]");
                	Log.i(tag,"password address is [" + pword + "]");
                	
                	// let's do some basic input filtering
                	if (user.trim().length() == 0 || server.trim().length() == 0 || pword.trim().length() == 0)
                	{
                		AlertDialog.Builder adb = new AlertDialog.Builder(v.getContext());
                        AlertDialog ad = adb.create();
                        ad.setMessage("All fields are required.");
                        ad.show();
                        return;
                	}
                	// let's store in a shared preference
                	editor.putString(TRSettings.SERVERADDRESS,server);
                	editor.putString(TRSettings.USERNAME,user);
                	editor.putString(TRSettings.PASSWORD,pword);
                	editor.commit();
                	finish();
                	
                } catch (Exception e) {
                    Log.i(tag, "Error occurred [" + e.getMessage() + "]");
                }
            }
        });
        
    }
}

