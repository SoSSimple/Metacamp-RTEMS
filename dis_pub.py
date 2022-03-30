# -*- coding: utf-8 -*- 
import RPi.GPIO as GPIO#
import datetime as dt
import numpy as np
import random
import time
import board
import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish
import urllib
import json


GPIO.setmode(GPIO.BCM)
TRIG=13 
ECHO=26 
GPIO.setup(TRIG,GPIO.OUT) 
GPIO.setup(ECHO,GPIO.IN) 
GPIO.output(TRIG, GPIO.LOW)

# broker_address="192.xxx.x.xx" # WindowsPC
broker_address="192.168.138.100"  # raspberryPi
broker_port=1883
client = mqtt.Client() #create new instance
print("connecting to broker")
client.connect(host=broker_address, port=broker_port)
print("Subscribing to topic","dist/dist")
# client.publish("dist/dist","HI~~~~")   #publish

def distance_check() :
   GPIO.output(TRIG, GPIO.HIGH) 
   time.sleep(0.001) 
   GPIO.output(TRIG, GPIO.LOW)  
   stop=0
   start=0

   while GPIO.input(ECHO)== GPIO.LOW : 
      start=time.time()                                  
   while GPIO.input(ECHO)== GPIO.HIGH : 

      stop=time.time()                                
   duration=stop-start 
   distance=(duration*340*100)/2 
   return distance
   
while True:
    try:
        # Print the values to the serial port
        distance = distance_check()
        data = {"distance": distance}
        #client.publish("dist/dist", str(distance))
        strdata = json.dumps(data)
        json_data = json.loads(strdata)
        client.publish("dist/dist", strdata)
        print(
            "Distance: {:.1f} ".format(distance)
        )
        time.sleep(2.0)

    except RuntimeError as error:
        print(error.args[0])
        time.sleep(2.0)
        continue
    except Exception as error:
        #x=input()
        #print(x)
        exit()
        raise error
    
    except KeyboardInterrupt:
        exit()
        print ('KeyboardInterrupt exception is caught')