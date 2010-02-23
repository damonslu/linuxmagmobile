//
//  LMEditField.m
//  iDGUI
//
//  Created by Frank Ableson on 2/23/10.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import "LMEditField.h"


@implementation LMEditField


- (id)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        // Initialization code
    }
    return self;
}

-(BOOL)textFieldShouldReturn:(UITextField *) theTextField {
	NSLog(@"textFieldShouldReturn");
	[theTextField resignFirstResponder];
	return YES;
}

-(NSString *) getValue
{
	return txt.text;
}

-(void)setup:(NSString *) lbl defaultValue:(NSString *)dv  {
	CGRect bounds = self.bounds;
	label = [[UILabel alloc] initWithFrame:CGRectMake(0,0,bounds.size.width /2,bounds.size.height)];
	[label setText:lbl];
	[self addSubview:label];
	txt = [[UITextField alloc] initWithFrame:CGRectMake(bounds.size.width / 2,0,bounds.size.width/2,bounds.size.height)];
	[txt setText:dv];
	txt.textAlignment = UITextAlignmentRight;
	txt.backgroundColor = [UIColor yellowColor];
	txt.font = [UIFont systemFontOfSize:20];
	[txt setReturnKeyType:UIReturnKeyDone];
	[txt setEnablesReturnKeyAutomatically:YES];
	txt.delegate = self;
	[self addSubview:txt];

}

- (void)drawRect:(CGRect)rect {
    // Drawing code

}


- (void)dealloc {
    [super dealloc];
}


@end
