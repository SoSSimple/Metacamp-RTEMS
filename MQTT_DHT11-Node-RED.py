# MQTT를 사용하는 DHT11 센서 프로그램
import time
from umqttsimple import MQTTClient
import ubinascii
import machine
import micropython
import network
import esp
from machine import Pin
import dht
# 디버그를 None으로 설정하고 Garbage collector를 활성화한다.
esp.osdebug(None)
import gc
gc.collect()

# 네트워크 자격 증명과 브로커(mqtt_server) IP 주소를 설정힌다.
#ssid = 'REPLACE_WITH_YOUR_SSID'
#password = 'REPLACE_WITH_YOUR_PASSWORD'
ssid = 'iptime-chowk'
password = 'a12345678'
#mqtt_server = 'REPLACE_WITH_YOUR_MQTT_BROKER_IP'
#EXAMPLE IP ADDRESS
mqtt_server = '192.168.0.18'
# MQTT 클라이언트를 만들기 위한 ESP ID를 가져와 client_id에 저장한다.
client_id = ubinascii.hexlify(machine.unique_id())
# ESP가 메시지를 게시 할 Topic 이름을 저장한다.
topic_pub_temp = b'esp/dht/temperature'
topic_pub_hum = b'esp/dht/humidity'
# WLAN network interface object를 만든다.
station = network.WLAN(network.STA_IF)
# Network interface를 활성화 하고 무선 Network에 연결한다.
station.active(True)
station.connect(ssid, password)

while station.isconnected() == False:
  pass

print('Connection successful')
print(station.ifconfig())

# GPIO14를 DHT11 Single wire 통신에 사용한다.
sensor = dht.DHT11(Pin(14))

# Sensor로 부터 Temperature와 Humidity를 읽는 주기 설정에 필요한 변수
last_message = 0
message_interval = 2

# Broker에 연결한다.
def connect_mqtt():
  global client_id, mqtt_server
  # MQTTClient object(client)를 생성한다.
  client = MQTTClient(client_id, mqtt_server)
  # connect() method를 사용하여 client를 Broker에 연결한다.
  client.connect()
  print('Connected to %s MQTT broker' % (mqtt_server))
  return client

# Broker 연결에 실패한 경우 이 함수가 호출되어 ESP를 Reset 하여 다시 연결을 시도한다.
def restart_and_reconnect():
  print('Failed to connect to MQTT broker. Reconnecting...')
  time.sleep(10)
  machine.reset()

# DHT11 sensor로 부터 Temperature와 Humidity를 읽는다.
def read_sensor():
  try:
    sensor.measure()
    temp = sensor.temperature()
    hum = sensor.humidity()
    if (isinstance(temp, float) and isinstance(hum, float)) or (isinstance(temp, int) and isinstance(hum, int)):
      temp = (b'{0:3.1f},'.format(temp))
      hum =  (b'{0:3.1f},'.format(hum))
      return temp, hum
    else:
      return('Invalid sensor readings.')
  except OSError as e:
    return('Failed to read sensor.')

# MQTT 브로커에 연결한다.
try:
  client = connect_mqtt()
# 만약 MQTT 브로커 연결에 실패한 경우 다시 시도 한다.
except OSError as e:
  restart_and_reconnect()

# while 루프에서 2초 주기로 온습도 센서를 읽어 MQTT에 게시한다.
# Error가 발생할 경우 ESP를 다시 시작 할 수 있도록 try 및 except 문을 사용한다.
while True:
  # 무한 Loop 내에서 Garbage 누적으로 메모리 부족이 발생할 수 있기 때문에 Garbage collector를 실행한다.
  if gc.mem_free() < 102000:
    gc.collect()
  try:
    # 센서 측정 주기(2초)가 되었으면 센서 값을 읽어 출력하고 게시한다.
    if (time.time() - last_message) > message_interval:
      temp, hum = read_sensor()
	  # 개발이 완료되면 센서 값 출력을 Comment 처리하는 것이 좋다.
      print(temp)
      print(hum)
	  # 온도와 습도를 Broker에 게시한다.
      client.publish(topic_pub_temp, temp)
      client.publish(topic_pub_hum, hum)
      # 다음 측정 시간을 결정하기 위하여 현재 시간을 저장한다.
      last_message = time.time()
  # 만약 Error가 발생한 경우 ESP를 Reset 하여 다시 연결을 시도한다.
  except OSError as e:
    restart_and_reconnect()
