/**
 * 
 */
package com.msi.linuxmagazine;

import net.rim.device.api.ui.UiApplication;
import net.rim.blackberry.api.menuitem.*;                           // ApplicationMenuItemRepository

/**
 * @author fableson
 *
 */
public class MenuDemo extends UiApplication {

    // one and only instance of our application
    static MenuDemo theApp = null;

	// constructor
    public MenuDemo()
    {
    	// setup menu(s)
        LMMenu lmm = new LMMenu(0);
        ApplicationMenuItemRepository.getInstance().addMenuItem(ApplicationMenuItemRepository.MENUITEM_SYSTEM ,lmm);

    
    }
	/**
	 * @param args
	 */
	public static void main(String[] args) {
        theApp = new MenuDemo();
        if (theApp != null)
        {
            theApp.enterEventDispatcher();
        }

	}

}
