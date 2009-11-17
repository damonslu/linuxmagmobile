package com.msi.linuxmagazine;

import net.rim.blackberry.api.menuitem.*;
import net.rim.blackberry.api.browser.*;

class LMMenu extends ApplicationMenuItem {

	LMMenu(int order)
	{
		super(order);
	}
	public Object run(Object arg0) {
		// handle the action of our menu
		try {
		System.out.println("Our menu was hit!");
		Browser.getDefaultSession().displayPage("http://www.linux-mag.com/blogs/fableson");
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return null;
	}

	public String toString() {
		// this is the label for our menu
		return "Linux Magazine";
	}

}
