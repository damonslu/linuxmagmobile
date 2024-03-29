/*
 * color.java
 *
 * W. F. Ableson
 * for Linux Magazine
 */

package com.msi.linuxmag;

import net.rim.device.api.ui.*;
import net.rim.device.api.ui.container.MainScreen;
import net.rim.device.api.ui.component.LabelField;
import net.rim.device.api.ui.Color;


class ColorScreen extends MainScreen  {
    ColorScreen() {
        // background
        ColorManager cm = new ColorManager(Color.TEAL);
        
        // traditional label field
        LabelField lbl = new LabelField("Linux Magazine color screen");
        cm.add(lbl);
        
        // color label field (subclassed by us)
        ColorLabel clbl = new ColorLabel(Color.WHEAT);
        clbl.setText("color label");
        cm.add(clbl);
        
        this.add(cm);
    }
} 




