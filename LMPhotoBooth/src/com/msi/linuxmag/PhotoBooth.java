package com.msi.linuxmag;


import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.Button;
import android.view.View;
import android.content.Intent;
import android.graphics.Bitmap;

public class PhotoBooth extends Activity {
	protected ImageView iv = null;
	protected Bitmap b = null;
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        Log.i(PhotoBooth.class.getName(),"Activity Ready to Go!");
        
        final Button  btn = (Button) this.findViewById(R.id.TakePhoto);
        btn.setOnClickListener(new View.OnClickListener(){
        
        	public void onClick(View v){
        		Log.i(PhotoBooth.class.getName(),"Button Clicked!");
        		try {
        			Intent action = new Intent("android.media.action.IMAGE_CAPTURE");
        			startActivityForResult(action,1);
        		} catch (Exception e) {
        			Log.e(PhotoBooth.class.getName(),"Error occured [" + e.getMessage() + "]");
        		}
        	}
        });
        
        iv = (ImageView) this.findViewById(R.id.PictureFrame);
        
    }
    
    
    protected void onActivityResult(int requestCode,int resultCode,Intent data)
    {
    	try {
    		if (requestCode == 1) {
    			Log.i(PhotoBooth.class.getName(),"resultCode is [" + resultCode + "]");
    			if (resultCode == RESULT_OK) {
	    			if (b != null) b.recycle();
	    			b = (Bitmap) data.getExtras().get("data");
	    			if (b != null) {
	    				iv.setImageBitmap(b);
	    			}
    			}
    		}
    	}catch (Exception e) {
    		Log.e(PhotoBooth.class.getName(),"onActivityResult Error [" + e.getMessage() + "]");
    	}
    	
    }
}