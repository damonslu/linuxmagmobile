import android       # core Android routines
import httplib       # for talking to web servers
import urllib        # to format our status update nicely
import base64        # to encode our username and password for Basic authentication

print 'Cool, we\'re running!'       # sorry, had to do this...

# get an instance of Android
droid = android.Android()

# where are we posting data to?
twitterhost = 'twitter.com'
uri = '/statuses/update.xml?'

# get our status update from user
statusmsg = droid.getInput('Twitter Update','Whatcha Doin?')

#extract the "textual" portion of the response
statusdata = "%(result)s" % statusmsg

# uncomment the next line to display the message to the terminal screen
#print statusdata

# uncomment the next line to display a notification to the user
#droid.makeToast(statusdata)

# clean up the data so it can be sent as the 'querystring'
statusupdate = urllib.urlencode({'status':statusdata})

# setup your username and password here...
username = 'yourusername'
password = 'yourpassword'
credentials = username + ":" + password

# uncomment the next line to see what credentials you are using....
#print credentials

encodedcredentials = base64.encodestring(credentials)

# connect to server
h = httplib.HTTP(twitterhost)

# build url we want to request
fullurl = uri + statusupdate

#uncomment the next line to see the url printed
#print fullurl

# POST our data.  Twitter requires status updates to be POSTed
h.putrequest('POST',uri + statusupdate)

# setup the authentication header
h.putheader('Authorization','Basic ' + base64.encodestring(credentials))

# setup the user agent
h.putheader('user-agent','Android-Scripting-Engine-Python')

# we're done with the headers....
h.endheaders()


# get the response from the request
returncode,returnmsg,headers = h.getreply()

# should compare the returncode to 200 for a good response, etc.

#display whatever the results are....
f = h.getfile()
print f.read()


