package com.msi.linuxmagazine;

import android.content.Context;
import android.content.ComponentName;
import android.content.Intent;
import android.appwidget.AppWidgetProvider;
import android.appwidget.AppWidgetManager;
import android.widget.RemoteViews;
import android.util.Log;

public class LMAppEyes extends AppWidgetProvider {
	
	
	private final String tag = "LMAppEyes";
	private String lastMessage = "Waiting on Message";
	private String lastSender = "";
	@Override
	public void onUpdate(Context context,AppWidgetManager appWidgetManager,int[] appWidgetIds ) {
		
		super.onUpdate(context, appWidgetManager, appWidgetIds);
		int count = appWidgetIds.length;
		Log.i(tag,"onUpdate::" + count);
		// we may have multiple instances of this widget ... make sure we hit each one ...
		for (int i=0;i<count;i++) {
			Log.i(tag,"Updating text view ....");
			RemoteViews views = new RemoteViews(context.getPackageName(),R.layout.main);
			if (lastSender.equals(""))
				views.setTextViewText(R.id.senderName, lastSender);
			else
				views.setTextViewText(R.id.senderName, lastSender + " says:");
			views.setTextViewText(R.id.lastMessage, lastMessage);

			appWidgetManager.updateAppWidget(appWidgetIds[i],views);	
		}
	}
	
	public void onDeleted(Context context,int[] appWidgetIds) {
		super.onDeleted(context, appWidgetIds);
		Log.i(tag,"onDeleted()" + appWidgetIds.length);
	}
	
	
	public void onDisabled(Context context) {
		super.onDisabled(context);
		Log.i(tag,"onDisabled()");
	}
	
	public void onEnabled(Context context) {
		super.onEnabled(context);
		Log.i(tag,"onEnabled");
		/*
		AlarmManager am = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
		Intent intent = new Intent("com.msi.linuxmagazine.UPDATELABEL");
		PendingIntent pendIntent =  PendingIntent.getBroadcast(context,0,intent,0); 
		am.setInexactRepeating(AlarmManager.ELAPSED_REALTIME, 15000, 15000, pendIntent);
		*/
	}
	
	public void onReceive(Context context,Intent intent) {
		super.onReceive(context, intent);
		Log.i(tag,"onReceive()::" + intent.getAction());
		
		
		if (intent.getAction().equals("com.msi.linuxmagazine.TRACEME")) {
			lastMessage = intent.getStringExtra("msg");
			lastSender = intent.getStringExtra("sender");
	
			Log.i(tag,lastMessage + " from " + lastSender);
	
			
			AppWidgetManager appManager = AppWidgetManager.getInstance(context);
			int [] ids = appManager.getAppWidgetIds(new ComponentName(context,LMAppEyes.class));
			onUpdate(context,appManager,ids);
		}
		
	}
}
