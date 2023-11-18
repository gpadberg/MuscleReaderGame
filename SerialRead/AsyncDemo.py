from SimpleSerial import SimpleSerial
from multiprocessing import Process, Value
from time import sleep
timeCount = Value("i",0)


def recordSerial(serObj, timeObj):
    with serObj as ser:
        while True:
            x = ser.readline()
            try:
                print(x)
                timeObj.value = int(x.strip().split(b',')[1].split(b':')[1])
            except:
                timeObj.value = 0
            sleep(1)
            
def outputCount(timeObj):
    while True:
        print(f"Time: {timeObj.value}")
        sleep(2)

if __name__ == '__main__':
    ser = SimpleSerial(115200,"COM3").ser 
    p1 = Process(target=recordSerial, args=[ser, timeCount])
    p1.start()
    p2 = Process(target=outputCount, args = [timeCount])
    p2.start()

