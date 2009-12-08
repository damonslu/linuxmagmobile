//
//  hiaAppDelegate.m
//  hia
//
//  Created by Frank Ableson on 12/7/09.
//  Copyright MSI Services, Inc. 2009. Use as you like :)
//

#import "hiaAppDelegate.h"

@implementation hiaAppDelegate

@synthesize window;
@synthesize browser;


- (void)applicationDidFinishLaunching:(UIApplication *)application {    

    // Override point for customization after application launch
	
	[window makeKeyAndVisible];

	browser = [[UIWebView alloc] initWithFrame:CGRectMake(0,20,320,460)];
    browser.delegate = self;		
	NSURL *startUrl = [NSURL fileURLWithPath:[[NSBundle mainBundle]  pathForResource:@"index" ofType:@"html"]];
	NSURLRequest * startRequest = [NSURLRequest requestWithURL:startUrl];// cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:20.0];
	
	
	[browser loadRequest:startRequest];
	[window addSubview:browser];
	
//	[[UIApplication sharedApplication] setStatusBarHidden:YES];
}



- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {
	NSLog(@"shouldStartLoadWithRequest");
	
	NSURL *url = [request URL];
	
	if (url == nil) {
		NSLog(@"bad URL?"); 
		return YES;
	}
	
	NSLog([NSString stringWithFormat:@"URL is : [%@]",[url absoluteString]]);

	NSLog(@"after description??");
	
	switch(navigationType) {
		case UIWebViewNavigationTypeLinkClicked:
			NSLog(@"Nav type: Link selected.");
			break;
		case UIWebViewNavigationTypeFormSubmitted:
			NSLog(@"Nav type: Form Submitted.");
			break;
		case UIWebViewNavigationTypeBackForward:
			NSLog(@"Nav type: Back/Forward");
			break;
		case UIWebViewNavigationTypeReload:
			NSLog(@"Nav type: Reload");
			break;
		case UIWebViewNavigationTypeFormResubmitted:
			NSLog(@"Nav type: Form Re-Submitted?");
			break;
		case UIWebViewNavigationTypeOther:
			NSLog(@"Nav type: Other");
			break;
		default:
			NSLog(@"Nav type: Something else...");
			break;
	}
	if ([[url scheme] isEqualToString:@"linuxmag"]) {
		NSLog([NSString stringWithFormat:@"host is [%@] query is [%@] path is [%@] paramterString is [%@]",(NSString *) [url host],(NSString *) [url query],(NSString *) [url path],(NSString *) [url parameterString]]);
	
		if ([[url host] isEqualToString:@"color"]) {
			if ([[url path] isEqualToString:@"/background"]) {
				[webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"document.getElementById('msg').style.backgroundColor = \"%@\";",[url query]]];
			}
		}
	    [webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"document.getElementById('msg').innerHTML = \"%@\";",[[NSDate date] description]]];
	}
	return YES;
}




- (void)dealloc {
    [window release];
	[browser release];
    [super dealloc];
}


@end
