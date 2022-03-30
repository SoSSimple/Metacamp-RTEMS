import RPi.GPIO as GPIO
from matplotlib import pyplot as plt
from matplotlib import animation
import numpy as np
import random
import time
import spidev

spi=spidev.SpiDev()
spi.open(0, 0)
spi.max_speed_hz=1000000

def ReadChannel(channel):
    adc=spi.xfer2([1,(8+channel)<<4,0])
    data=((adc[1]&3)<<8)+adc[2]
    return data

mcp3008_channel=0
        

fig = plt.figure()
ax = plt.axes(xlim=(0, 50), ylim=(0, 1024))
line, = ax.plot([], [], lw=1, c='blue', marker='d',ms=2)
max_points = 50
line, = ax.plot(np.arange(max_points), 
                np.ones(max_points, dtype=np.float)*np.nan, lw=1, c='blue',marker='d',ms=2)

def init():
    return line


def animate(i):
    y = ReadChannel(mcp3008_channel) # 이부분만 센서값으로 바꾸어주면 된다.
    old_y = line.get_ydata()
    new_y = np.r_[old_y[1:], y]
    line.set_ydata(new_y)
    print(new_y)
    return line,

anim = animation.FuncAnimation(fig, animate, init_func=init, frames=200, interval=20, blit=False)
plt.show()
