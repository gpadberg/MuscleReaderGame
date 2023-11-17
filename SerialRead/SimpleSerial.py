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
        """Overwrite in subclasses to post process data"""
        return rawData

    def captureLines(self, numLines):
        """Records lines from serial port into a list"""
        with self.ser as ser:
            rawData = [ser.readline() for _ in range(numLines+10)] # Record some extra samples to discard
        # drop first line
        cleanData = self._postProcess(rawData[10:])
        return cleanData