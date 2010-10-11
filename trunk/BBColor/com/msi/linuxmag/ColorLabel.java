/*
 * ColorLabel.java
 *
 * © Research In Motion Limited, 2003-2003
 * Confidential and proprietary.
 */

package com.msi.linuxmag;

import net.rim.device.api.ui.*;
import net.rim.device.api.ui.container.MainScreen;
import net.rim.device.api.ui.component.LabelField;
import net.rim.device.api.ui.Color;


/**
 * 
 */
class ColorLabel extends LabelField {
        private int bColor;
        public ColorLabel(int color) {
            super();
            bColor = color;
        }
        public void paint(Graphics g) {
            g.setColor(bColor);
            g.clear();
            super.paint(g);
        }
    }

