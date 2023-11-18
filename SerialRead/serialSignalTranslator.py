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
    
    def _postProcess(self, rawData):
        # binary data in a string
        """Overwrite in subclasses to post process data"""
        # Mess around with this area 
        cleanList = []
        for dataPoint in rawData:
            sample = dataPoint.split(b',')
            print(sample)
            #value = float(sample[0])
            #time = int(sample[1])

            # print('value {}, time {}'.format(value, time))
            #cleanList.append([value, time])
        # print(cleanList)

        return cleanList

    def captureLines(self, timeInterval = None):
        """Records lines from serial port into a list"""
        cleanData = []
        with self.ser as ser:
            timeStamp = 0
            while timeStamp < timeInterval:
                point = ser.readline().split(b',')
                value = int(point[0])
                timeStamp = int(point[1].split(b"\r")[0])
                cleanData.append([value, timeStamp])
        return cleanData
    
if __name__ == "__main__":
    sampleRawData = SimpleSerial(115200,"/dev/cu.usbmodem141301").captureLines(5000)
    print(sampleRawData)
    pass