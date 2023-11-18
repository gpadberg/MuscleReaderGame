from dataclasses import dataclass
from functools import cached_property
import serial

@dataclass
class SimpleSerial:
    baudrate: int
    port: str


    @cached_property
    def ser(self):
        """PySerial serial object"""
        serObj = serial.Serial()
        serObj.baudrate = self.baudrate
        serObj.port = self.port
        return serObj

    def captureLines(self, timeInterval = None):
        """Records lines from serial port into a list"""
        valueList = []
        timeStampList = []

        # set under while not done loop
        # break if done

        try:
            # print('trying')
            with self.ser as ser:
                timeStamp = 0
                while timeStamp < timeInterval:
                    point = ser.readline().split(b',')
                    # print(point)
                    valueList.append(float(point[0]))
                    timeStamp = float(point[1].split(b"\r")[0])
                    timeStampList.append(timeStamp)
        except:
            pass

        return valueList, timeStampList
    
if __name__ == "__main__":
    sampleRawData = SimpleSerial(115200,"/dev/cu.usbmodem141301")

    print(sampleRawData.captureLines(5000)[0])
    pass