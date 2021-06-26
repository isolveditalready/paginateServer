#!/usr/bin/perl

use warnings;
use strict;

for (1..1000) {
   print '{id:'  . $_ . ", name: 'User " . $_ . "'}," . "\n";
}

__END__