# -*- coding: utf-8 -*- 
#---- publisher.py   보내기 (브로커 : 라즈베리파이 )
import RPi.GPIO as GPIO#
import datetime as dt
import time
import board
import adafruit_dht
import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish
import Adafruit_DHT
import urllib
import json
sensor = Adafruit_DHT.DHT11
pin = 4

GPIO.setmode(GPIO.BCM)#

GPIO.setup(pin, GPIO.IN)#

# broker_address="192.xxx.x.xx" # WindowsPC
broker_address="192.168.138.100"  # raspberryPi
broker_port=1883
client = mqtt.Client() #create new instance
print("connecting to broker")
client.connect(host=broker_address, port=broker_port)
print("Subscribing to topic","temp/temp")
# client.publish("temp/temp","HI~~~~")   #publish


# Initial the dht device, with data pin connected to:
dhtDevice = adafruit_dht.DHT11(board.D4)

# you can pass DHT22 use_pulseio=False if you wouldn't like to use pulseio.
# This may be necessary on a Linux single board computer like the Raspberry Pi,
# but it will not work in CircuitPython.
# dhtDevice = adafruit_dht.DHT22(board.D18, use_pulseio=False)

while True:
    try:
        # Print the values to the serial port
        temperature_c = dhtDevice.temperature
        temperature_f = temperature_c * (9 / 5) + 32
        humidity = dhtDevice.humidity
        data = {"temperature": temperature_c, "humidity": humidity}
        #client.publish("temp/temp", str(temperature_c))
        #client.publish("temp/temp", str(humidity))
        strdata = json.dumps(data)
        json_data = json.loads(strdata)
        client.publish("temp/temp", strdata)
        print(
            "Temp: {:.1f} F / {:.1f} C    Humidity: {}% ".format(
                temperature_f, temperature_c, humidity
            )
        )
        time.sleep(2.0)

    except RuntimeError as error:
        # Errors happen fairly often, DHT's are hard to read, just keep going
        print(error.args[0])
        time.sleep(2.0)
        continue
    except Exception as error:
        #x=input()
        #print(x)
        dhtDevice.exit()
        raise error
    
    except KeyboardInterrupt:
        dhtDevice.exit()
        print ('KeyboardInterrupt exception is caught')