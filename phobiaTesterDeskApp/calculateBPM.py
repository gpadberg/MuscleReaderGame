import numpy as np
import matplotlib.pyplot as plt
from serialSignalTranslator import SimpleSerial
import serial.tools.list_ports as stlp

from scipy.signal import butter , sosfilt , find_peaks
from sys import argv


def doCalculateBPM(signalVals, timeVals):
    unPeaks = find_peaks(signalVals, height = 900)
    fullHeartB = len(unPeaks[0])

    '''
    for i in range(len(signalVals)):
        try:
            if signalVals[i+1] == 0 and signalVals[i] == 1:
                fullHeartB += 1
                # print('added half beat')
        except:
            pass
    '''

    BPM = round(fullHeartB / (max(timeVals) / 1000) * 60)
    if BPM == 0:
        print('wrong bpm == 0')
        BPM = doGenerateBPM()
    # print('The current BPM is:', BPM)
    return BPM

def doGenerateBPM():
    testTimeMs = 5000
    working = False
    while not working:
        try:
            serialObj = SimpleSerial(115200, '/dev/cu.usbmodem141201')
            valueList, timeStampList = serialObj.captureLines(testTimeMs)
            if len(valueList)==0 or len(timeStampList)==0:
                print("failed")
                raise Exception
            else:
                working = True
        except: 
            pass
    

    bpmVal = doCalculateBPM(valueList, timeStampList) 
    return bpmVal

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
    bpm = doGenerateBPM()
    print(bpm)
    pass