/*
 * bw.java
 *
 * W. F. Ableson
 * for Linux Magazine
 */

package com.msi.linuxmag;

import net.rim.device.api.ui.*;



/**
 * 
 */
class bbcolor extends UiApplication {
    bbcolor() {    
       // BWScreen theScreen = new BWScreen();
        ColorScreen theScreen = new ColorScreen();
        pushScreen(theScreen);
    }
    
    public static void main(String [] args) {
       bbcolor app = new bbcolor();
       
       app.enterEventDispatcher(); 
    }
} 
