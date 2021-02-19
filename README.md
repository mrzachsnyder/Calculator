# Simple calculator in react-native

## Overview
I still use my TI-84 graphing calculator, mostly because I've spent countless hours with it and know it like the back of my hand. I'd love to start using infinitely more powerful phone in my pocket, but the TI-84 has one specific feature that the iOS calculator doesn't: it allow you to both view and access your previous entries.

The MVP goal here is to add history to the iOS calculator, but I'm sure I'll think of additional touch-specific gestures that could be useful in the future.

## Authors
[mrzachsnyder](https://github.com/mrzachsnyder)

## To-do checklist in no particular order
* Double or long press on C to clear history
* Shrink text instead of wrapping it
* Speed up button press handling function (<Button onPress{() => buttonPress(props)} /> is slow)
* Fix history floating up with iOS system stuff
* Look into Android? (if this thing is just for me I'm not going to bother)
* Insert previous answer if operator button is pressed with empty input
* Consult with visual designer