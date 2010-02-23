//
//  iDGUIAppDelegate.h
//  iDGUI
//
//  Created by Frank Ableson on 2/23/10.
//  Copyright __MyCompanyName__ 2010. All rights reserved.
//

#import <UIKit/UIKit.h>

@class iDGUIViewController;

@interface iDGUIAppDelegate : NSObject <UIApplicationDelegate> {
    UIWindow *window;
    iDGUIViewController *viewController;
}

@property (nonatomic, retain) IBOutlet UIWindow *window;
@property (nonatomic, retain) IBOutlet iDGUIViewController *viewController;

@end

