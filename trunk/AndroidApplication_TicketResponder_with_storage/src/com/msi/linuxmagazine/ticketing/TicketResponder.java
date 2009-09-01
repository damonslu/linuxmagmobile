/*
 * 
 * 
 * TicketResponder.java
 * Ticketing sample application written for Linux Magazine
 * Author: Frank Ableson, fableson@msiservices.com
 * More details: http://www.linux-mag.com/blogs/fableson
 * August 2009
 * 
 */
package com.msi.linuxmagazine.ticketing;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.view.View;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.ImageView;
import android.util.Log;
import android.app.AlertDialog;


public class TicketResponder extends Activity {
	
	
	final String tag = "TicketResponder";
	
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        
        
        
        final EditText ticketNumber = (EditText) findViewById(R.id.TicketNumber);
        final Spinner ticketStatus = (Spinner) findViewById(R.id.TicketStatus);
        final Button gobutton = (Button) findViewById(R.id.GoButton);
        gobutton.setOnClickListener(new Button.OnClickListener() {

            public void onClick(View v) {
                try {
                	String ticket = ticketNumber.getText().toString();
                	String status = ticketStatus.getSelectedItem().toString();
                	Log.i(tag,"Ticket Number is [" + ticket + "]");
                	if (ticket.trim().length() == 0)
                	{
                		AlertDialog.Builder adb = new AlertDialog.Builder(TicketResponder.this);
                        AlertDialog ad = adb.create();
                        ad.setMessage("Ticket number required.");
                        ad.show();
                	}
                	else
                	{
                		AlertDialog.Builder adb = new AlertDialog.Builder(TicketResponder.this);
                        AlertDialog ad = adb.create();
                        ad.setMessage("Updating ticket (" + ticket.trim() + ") to (" + status + ")");
                        ad.show();
                	}
                	
                } catch (Exception e) {
                    Log.i(tag, "Failed to process request [" + e.getMessage() + "]");
                }
            }
        });
        
        final ImageView logo = (ImageView) findViewById(R.id.ImageView);
        logo.setOnLongClickListener(new ImageView.OnLongClickListener() {
        	public boolean onLongClick(View v)
        	{
        		
                Intent launchLM = new Intent("android.intent.action.VIEW", android.net.Uri.parse("http://linux-mag.com/blogs/fableson"));
                startActivity(launchLM);

        		return true;
        	}
        }
        );

        final ImageView settingsImage = (ImageView) findViewById(R.id.ImageSettings);
        settingsImage.setOnClickListener(new ImageView.OnClickListener() {
        		public void onClick(View v) {
        			try {
        				Intent in = new Intent(v.getContext(),TRSettings.class);
        				startActivity(in);
        			}
        			catch (Exception e){
        				Log.i(tag,"Failed to launch Settings Activity " + e.getMessage());
        			}
        		}
        }
        );
        
        logo.setOnLongClickListener(new ImageView.OnLongClickListener() {
        	public boolean onLongClick(View v)
        	{
        		
                Intent launchLM = new Intent("android.intent.action.VIEW", android.net.Uri.parse("http://linux-mag.com/blogs/fableson"));
                startActivity(launchLM);

        		return true;
        	}
        }
        );
        
    }
}