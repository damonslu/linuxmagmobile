//
//  iDGUIViewController.m
//  iDGUI
//
//  Created by Frank Ableson on 2/23/10.
//  Copyright __MyCompanyName__ 2010. All rights reserved.
//

#import "iDGUIViewController.h"
#import "LMEditField.h"

@implementation iDGUIViewController



/*
// The designated initializer. Override to perform setup that is required before the view is loaded.
- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
    if (self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil]) {
        // Custom initialization
    }
    return self;
}
*/


// Implement loadView to create a view hierarchy programmatically, without using a nib.
- (void)loadView {
	
	CGRect halfRect = CGRectMake(0,0,320,480);
	contentView = [[LMScrollView alloc] initWithFrame:halfRect];
	
	btnSubmit= [UIButton buttonWithType:UIButtonTypeRoundedRect];
	[btnSubmit setBounds:CGRectMake(50,50,100,100)];
	[btnSubmit setTitle:@"Hit Me!" forState:UIControlStateNormal];
	[btnSubmit setTitle:@"Hit Me!" forState:UIControlStateHighlighted];
	btnSubmit.center = CGPointMake(160,240);
	[btnSubmit addTarget:self action:@selector(hitbutton:) forControlEvents:UIControlEventTouchUpInside];
	[contentView addSubview:btnSubmit];
	
	
	txtVOffset = 50;
	firstName = [[LMEditField alloc] initWithFrame:CGRectMake(5,txtVOffset,310,40)]; 
	[firstName setup:@"First Name:" defaultValue:@"Frank"];
	[contentView addSubview:firstName];
	
	txtVOffset += 50;
	lastName = [[LMEditField alloc] initWithFrame:CGRectMake(5,txtVOffset,310,40)]; 
	
	[lastName setup:@"Last Name:" defaultValue:@"Ableson"];
	[contentView addSubview:lastName];
	

	
	self.view = contentView;
	[contentView release];
	
}


- (void)hitbutton: (UIButton *) b
{
	NSString * t = [[NSString alloc] initWithFormat:@"%@ %@",[firstName getValue],[lastName getValue]];
	NSLog([[NSString alloc] initWithFormat:@"button hit! [%@]",t]);
//	printf("button hit! [%s]\n",[t cString]);
}

/*
// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
    [super viewDidLoad];
}
*/


/*
// Override to allow orientations other than the default portrait orientation.
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    // Return YES for supported orientations
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}
*/

- (void)didReceiveMemoryWarning {
	// Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
	
	// Release any cached data, images, etc that aren't in use.
}

- (void)viewDidUnload {
	// Release any retained subviews of the main view.
	// e.g. self.myOutlet = nil;
}


- (void)dealloc {
    [super dealloc];
}

@end
