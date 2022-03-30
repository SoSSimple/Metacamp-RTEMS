# -*- coding: utf-8 -*- 
#---- subscriber.py  데이터 받기 
import paho.mqtt.client as mqtt
import time


def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

def on_disconnect(client, userdata, flags, rc=0):
    print(str(rc))

#서버로부터 publish message를 받을 때 호출되는 콜백
def on_subscribe(client, userdata, mid, granted_qos):
    print("subscribed: " + str(mid) + " " + str(granted_qos))
    
def on_message(client, userdata, msg):
    print(f'type(msg): {type(msg)}')
    print(str(msg.payload.decode("utf-8")))
    

client = mqtt.Client() #client 오브젝트 생성
# 콜백 함수 설정 on_connect(브로커에 접속), on_disconnect(브로커에 접속중료), on_subscribe(topic 구독),
# on_message(발행된 메세지가 들어왔을 때)
client.on_connect = on_connect #콜백설정
client.on_disconnect = on_disconnect
client.on_subscribe = on_subscribe
client.on_message = on_message #콜백설정


#set the will message, when the raspberry pi is power off or network disconnect
client.will_set('dist/dist',b'{"status":"off"}')
client.connect('192.168.138.100', 1883)  # 라즈베리파이 커넥트  
client.subscribe('dist/dist', 1)  # 토픽 : dist/dist  | qos : 1
client.loop_forever()

