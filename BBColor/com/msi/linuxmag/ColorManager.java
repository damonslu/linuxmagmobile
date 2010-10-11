/*
 * ColorManager.java
 *
 * © Research In Motion Limited, 2003-2003
 * Confidential and proprietary.
 */

package com.msi.linuxmag;


import net.rim.device.api.ui.*;
import net.rim.device.api.ui.Color;
import net.rim.device.api.ui.container.VerticalFieldManager;

class ColorManager extends VerticalFieldManager {
    private int bColor;
    
    public ColorManager() {
        super(USE_ALL_HEIGHT | USE_ALL_WIDTH);
        bColor = Color.AZURE;
    }
    
    public ColorManager(int color) {
        super(USE_ALL_HEIGHT | USE_ALL_WIDTH);
        this.bColor  = color;
    }
    
    public void paint(Graphics g) {
        g.setBackgroundColor(bColor);
        g.clear();
        super.paint(g);
    }
} 


