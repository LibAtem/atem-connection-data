# ATEM connection data dump

This is a very simple application to read the connection data of an atem and write it in hex form to a file.

These connection data files are useful to help understand the protocol, or for unit tests to ensure a library can correctly interpret various bits of commands.

These files are used by:
* [atem-connection](https://github.com/nrkno/tv-automation-atem-connection) for unit tests to ensure that errors are not thrown while parsing commands during connection [examples](https://github.com/nrkno/tv-automation-atem-connection/tree/master/src/__tests__/connection)
* [LibAtem.ComparisonTests](https://github.com/LibAtem/LibAtem.ComparisonTests) to serve as the basis for the mock tests which verify behaviour against the sdk and so need a full data snapshot to open connections [examples](https://github.com/LibAtem/LibAtem.ComparisonTests/tree/master/LibAtem.MockTests/TestFiles/Handshake)

There is not yet any other tooling to help interpret/use these files, but that may be implemented as needed.
