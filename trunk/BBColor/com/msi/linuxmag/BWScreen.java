/*
 * bw.java
 *
 * W. F. Ableson
 * for Linux Magazine
 */

package com.msi.linuxmag;

import net.rim.device.api.ui.*;
import net.rim.device.api.ui.container.MainScreen;
import net.rim.device.api.ui.component.LabelField;
    

class BWScreen extends MainScreen  {
    BWScreen() {
        LabelField lbl = new LabelField("Linux Magazine b/w screen");
        this.add(lbl);
    }
} 

