package com.msi.linuxmag.goingnative;

import android.app.Activity;
import android.os.Bundle;

import android.webkit.WebView;
import android.webkit.WebSettings;
import android.webkit.WebChromeClient;

import android.util.Log;

public class MainAct extends Activity {
    /** Called when the activity is first created. */
    private WebView browser = null;
	@Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        // connect to our browser so we can manipulate it
        browser = (WebView) findViewById(R.id.mybrowser);

        // get settings so we can config our WebView instance
        WebSettings settings = browser.getSettings();
        
        // JavaScript?  Of course!
        settings.setJavaScriptEnabled(true);
        // clear cache
        browser.clearCache(true);
        
        // this is necessary for "alert()" to work
        browser.setWebChromeClient(new WebChromeClient());
        
        // add our custom functionality to the javascript environment
        browser.addJavascriptInterface(new MyCoolJSHandler(), "linuxmag");
        
        // load a page to get things started
        browser.loadUrl("file:///android_asset/index.html");
        
    }
	
	final class MyCoolJSHandler
	{
		// write to LogCat (Info)
		public void Info(String str) {
			Log.i("GoingNative",str);
		}
		
		// write to LogCat (Error)		
		public void Error(String str) {
			Log.e("GoingNative",str);
		}
		
		// Kill the app		
		public void EndApp() {
			finish();
		}
	}
}
