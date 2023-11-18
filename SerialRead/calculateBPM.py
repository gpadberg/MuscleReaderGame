import numpy as np
import matplotlib.pyplot as plt
from serialSignalTranslator import SimpleSerial
import serial.tools.list_ports as stlp

from scipy.signal import butter , sosfilt , find_peaks
from sys import argv

portName = stlp.comports()[0].name # attempt port scanning
fileName = "output.txt"

def calculateBPM(signalVals, timeVals):
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
    
    # print('The current BPM is:', BPM)
    return BPM

def do_generateBPM():

    working = False
    while not working:
        try:
            serialObj = SimpleSerial(115200, portName)
            valueList, timeStampList = serialObj.captureLines(10000)
            if len(valueList)==0 or len(timeStampList)==0:
                print("failed")
                raise Exception
            else:
                working = True
        except: 
            pass
    

    bpmVal = calculateBPM(valueList, timeStampList)
    with open(fileName, "a") as myfile:
        myfile.write(f"{bpmVal}\n")
    return
        

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
    argVal = argv[1]
    if argVal == "reset":
        with open(fileName, "w") as myFile:
            pass # empties the file
    elif argVal == "advance":
        print("start Advance")
        do_generateBPM() # writes a new line with new bpm to the file
