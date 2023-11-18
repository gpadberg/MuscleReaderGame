import numpy as np
import matplotlib.pyplot as plt
from serialSignalTranslator import SimpleSerial
import cmd
import math
from scipy.signal import butter , sosfilt , find_peaks

phobiaLdb = {}
serialObj = SimpleSerial(115200, "/dev/cu.usbmodem141301")
completekey = 0

class calculateBPM(cmd.Cmd):
    def calculateBPM(self, signalVals, timeVals):

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

    def do_generateBPM(self, line):

        working = False
        while not working:
            try:
                valueList, timeStampList = serialObj.captureLines(10000)
                if len(valueList)==0 or len(timeStampList)==0:
                    raise Exception
                else:
                    working = True
            except: 
                pass
        

        phobiaLdb[len(phobiaLdb)] = self.calculateBPM(valueList, timeStampList)

        return
        
    def do_rankBPM(self, line):

        # print(phobiaLdb)

        temp = sorted(phobiaLdb.keys(), key = phobiaLdb.get, reverse=True)

        for bpm in temp:
            print('{} {}'.format(phobiaLdb[bpm], bpm)+'\n')
        
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
    app = calculateBPM()

    app.cmdloop()

    pass