//
//  hiaAppDelegate.h
//  hia
//
//  Created by Frank Ableson on 12/7/09.
//  Copyright MSI Services, Inc. 2009. Use as you like :)
//

#import <UIKit/UIKit.h>

@interface hiaAppDelegate : NSObject <UIApplicationDelegate,UIWebViewDelegate> {
    UIWindow *window;
	UIWebView *browser;
}

@property (nonatomic, retain) IBOutlet UIWindow *window;
@property (nonatomic, retain) UIWebView *browser;
@end

