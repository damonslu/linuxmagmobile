//
//  iDGUIAppDelegate.m
//  iDGUI
//
//  Created by Frank Ableson on 2/23/10.
//  Copyright __MyCompanyName__ 2010. All rights reserved.
//

#import "iDGUIAppDelegate.h"
#import "iDGUIViewController.h"

@implementation iDGUIAppDelegate

@synthesize window;
@synthesize viewController;


- (void)applicationDidFinishLaunching:(UIApplication *)application {    
    
    // Override point for customization after app launch    
    [window addSubview:viewController.view];
    [window makeKeyAndVisible];
}


- (void)dealloc {
    [viewController release];
    [window release];
    [super dealloc];
}


@end
