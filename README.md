# RPiLamp

## Overview
+ RPiLamp is project for control leds via raspberry and esp

## Description
+ In our project we use Raspberry PI 3+ and ESP8266 NodeMCUv2. On Raspberry we installed apache server and we placed there website for control leds.

## Tools
+ Arduino app 1.8.9
+ CREATE REACT APP

## How to run
+ We shoud connect raspberry and esp to the same network.

## How to compile
+ We need load esp/esp8266x.ino add additional libraries like Adafruit Neopixels and WS2812 FX Library for Arduino and ESP8266 to Arduino.
+ For run dashboard we firstly need insall core packages and compile files. After compile we shoud change path in files from absolute "/" to relative "./" and send /build directory to raspberry server.

## Future improvements
+ Add Cron to planning turn on/off the leds
+ Separate core files to our library

## Attributions
+ [Adafruit Neopixels](https://github.com/adafruit/Adafruit_NeoPixel)
+ [WS2812 FX Library for Arduino and ESP8266](https://github.com/kitesurfer1404/WS2812FX)

## License
The MIT License (MIT)

## Credits
[Sebastian Siejek](http://kontakt@sebastiansiejek.pl) & [Dawid Smalc](mailto:dawid.smalc@gmail.com)

The project was conducted during the Microprocessor Lab course held by the Institute of Control and Information Engineering, Poznan University of Technology.

## Supervisor: Tomasz Mańkowski