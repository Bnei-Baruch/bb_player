# TODO:

## version 0.1
* Draw right player (problem with android devices)
* Support icecast
* 

## version 0.2
* Show slides
* Show error messages
* change language, quality, server location (including setup to enable/disable) - GUI
* send error message to developer
* languegs support
* Make version work - 
* Add special status - refresh - this status forces the client to reconnect to the streams (this status should be used when version is changed).
* filter server list by the specific quality set by a priority list. If
quality isn't found take any first found.


### Completed tasks
* Mobile detection
* Technology detection
* Try next stream in streams array in case of failure. 
* If last stream doesn't play request the server the next technology.
* Technologies array (by priority) - by this array to request the server for streams
