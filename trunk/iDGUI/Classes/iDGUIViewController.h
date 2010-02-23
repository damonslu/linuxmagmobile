//
//  iDGUIViewController.h
//  iDGUI
//
//  Created by Frank Ableson on 2/23/10.
//  Copyright __MyCompanyName__ 2010. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "LMScrollView.h"
#import "LMEditField.h"

@interface iDGUIViewController : UIViewController {
	LMScrollView * contentView;
	int txtVOffset;
	UIButton * btnSubmit;
	LMEditField * firstName;
	LMEditField * lastName;
	
}

@end

