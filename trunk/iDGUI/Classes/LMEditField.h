//
//  LMEditField.h
//  iDGUI
//
//  Created by Frank Ableson on 2/23/10.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>


@interface LMEditField : UIView <UITextFieldDelegate>{
	UILabel * label;
	UITextField * txt;

	
}
-(void)setup:(NSString *) lbl defaultValue:(NSString *)dv;
//-(BOOL)textFieldShouldReturn:(UITextField *) theTextField;
-(NSString *) getValue;
@end
