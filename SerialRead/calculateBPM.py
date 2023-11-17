import numpy as np
import matplotlib.pyplot as plt
from SimpleSerial import SimpleSerial

def serialParse(inputData):
    signalVals = []
    timeVals = []
    for i in inputData:
        cleanLine = i.strip()
        splitTerms = cleanLine.split(b",")
        signalVals.append(float(splitTerms[0].split(b":")[1]))
        timeVals.append(int(splitTerms[1].split(b":")[1]))
    return np.asarray(timeVals), np.asarray(signalVals)

class SineParser(SimpleSerial):
    """Subclass to demonstrate custom parsing method"""
    def _postProcess(self, rawData):
        return serialParse(rawData)


# Data collected from SimpleSerial then passed through serialParse
print("Recording with SimpleSerial class")
sampleRawData = SimpleSerial(115200,"COM3").captureLines(200)
plt.plot(*serialParse(sampleRawData), label="Simple Serial")
print("Finished recording with SimpleSerial class")

print("Recording with SineParser class")
# Data collected with subclass of SimpleSerial
sampleProcessedData = SineParser(115200,"COM3").captureLines(200)
print("Finished Recording with SineParser class")

plt.plot(*sampleProcessedData, label="Sine Parser")
plt.xlabel("Time [ms]")
plt.ylabel("Signal")
plt.title("Sampled Data")
plt.legend()
plt.show()