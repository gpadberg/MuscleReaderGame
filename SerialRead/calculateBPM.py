import numpy as np
import matplotlib.pyplot as plt
from serialSignalTranslator import SimpleSerial
import math

def createCoords(inputData):
    signalVals = []
    timeVals = []

    for i in inputData:
        signalVals.append(i[0])
        timeVals.append(i[1])
   
    return signalVals, timeVals

def calculateBPM(signalVals, timeVals):
    fullHeartB = 0
    for i in range(len(signalVals)):
        try:
            if signalVals[i+1] == 0 and signalVals[i] == 1:
                fullHeartB += 1
                # print('added half beat')
        except:
            pass

    BPM = round(fullHeartB / (max(timeVals) / 1000) * 60)

    return BPM



def main():
    # Data collected from SimpleSerial then passed through serialParse
    print("Recording with SimpleSerial class")
    sampleRawData = SimpleSerial(115200,"/dev/cu.usbmodem141301").captureLines(5000)
    
    signalVals, timeVals = createCoords(sampleRawData)

    BPM = calculateBPM(signalVals, timeVals)
    print('BPM:', BPM)

    return BPM
# make graph
'''
    plt.plot(timeVals, signalVals, label="Simple Serial")
    plt.xlabel("Time [ms]")
    plt.ylabel("Signal")
    plt.title("Sampled Data")
    plt.legend()
    plt.show()
'''
if __name__ == "__main__":
    main()

