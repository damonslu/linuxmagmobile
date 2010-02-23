//
//  LMScrollView.m
//  iDGUI
//
//  Created by Frank Ableson on 2/23/10.
//  Copyright 2010 __MyCompanyName__. All rights reserved.
//

#import "LMScrollView.h"


@implementation LMScrollView


- (id)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        // Initialization code
		self.backgroundColor = [UIColor greenColor];
		self.scrollEnabled = YES;
		//self.scrollsToTop = YES;
		self.contentSize = CGSizeMake(320,1000);
		self.showsVerticalScrollIndicator = YES;
		self.bounces = YES;
    }
    return self;
}


- (void)drawRect:(CGRect)rect {
    // Drawing code
}


- (void)dealloc {
    [super dealloc];
}


@end
