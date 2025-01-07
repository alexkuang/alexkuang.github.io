---
title: extracting apple contacts data
---

As part of building my [[personal cloud]], I want to back up my contacts data. Over the years this has been spread over
a couple places: Google Contacts, various Apple / phone contacts, text files... But I figured Apple Contacts would be a
good start.

So first, the location. On my Mac, the contacts file lived in `~/Library/Application\
Support/AddressBook/Sources/SOME_UUID_HERE/AddressBook-v22.abcddb`. I do have iCloud syncing on and that seems to get
dropped into `Sources/SOME_UUID_HERE`. For my usage I only had one folder under `Sources`. The file itself is, par for the
Apple course, a sqlite file. I recommend exploring with `litecli`, by the same folks behind the excellent `pgclii`.

From there, the primary table of interest is `ZABCDRECORD`, the main contact table that links to everything. Basically
everything else is one-to-many (`ZABCDPHONENUMBER`, `ZABCDEMAILADDRESS`, `ZABCDSOCIALPROFILE`) joined on `ZOWNER =
ZABCDRECORD.Z_PK`. Why all the funny Z and ZABCD prefixes? ¯\\\_(ツ)\_/¯ I'd love to hear the stories behind those.

Most of the data is self-explanatory, but birthday (`ZBIRTHDAY` and `ZBIRTHDAYYEARLESS`) took a little finessing:

- Both columns are stored as second offsets against the Apple CoreData epoch @ Jan 01 2001
- The time component of the timestamp is noon on the given date.
- When the year of the birthday is absent, they use the year 1604.
- `ZBIRTHDAY` contains the full timestamp as specified above.
- `ZBIRTHDAYYEARLESS` always uses the 1604 convention and seems like it's intended to be combined with `ZBIRTHDAYYEAR` to
  get the same info as `ZBIRTHDAY`. I'm guessing this is a backwards compatibility thing?
