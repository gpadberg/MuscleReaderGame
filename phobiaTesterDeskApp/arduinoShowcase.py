import serial as sr
import matplotlib.pyplot as plt
import numpy as np
from scipy.signal import butter , sosfilt , find_peaks


s = sr.Serial('/dev/cu.usbmodem141201', 115200)
plt.close('all')
plt.figure()
plt.ion()
plt.show()

data = np.array([])

i = 0

valueList = []
timeMSList = []
calculate = True
while i < 500:
    a = s.readline()
    a.decode()
    print('this is a decoded\n',a)
    b = a.split(b',')
    print(b)
    valueList.append(float(b[0]))
    timeMSList.append(float(b[1].split(b'\r')[0]))
    print(i)
    # data = np.append(data, b)
    i += 1

if calculate:
# interpolates time
    lowTime = min(timeMSList)
    highTime = max(timeMSList)
    interpTime = np.arange(lowTime, highTime, 8)
    finalValue = np.interp(interpTime, timeMSList, valueList)

    # applies filter
    filter = butter(4, [0.5,44.5], btype = 'bandpass' , fs = 125, output = 'sos')
    filteredSignal = sosfilt(filter, finalValue)

    # find peaks of function
    peaks = find_peaks(filteredSignal)
    peakList = np.zeros(np.shape(interpTime))

    #for p in peaks[0]:
        #peakList[p] = max(filteredSignal)

    unPeaks = find_peaks(valueList, height=900)
    print(unPeaks[0])
    unPeakList = np.zeros(np.shape(timeMSList))
    for up in unPeaks[0]:
        unPeakList[up] = max(valueList)


    # plots the graph
    plt.plot(timeMSList, valueList, label = 'original')
    # might not do filter
    # plt.plot(interpTime, filteredSignal, label = "filtered")
    # plt.stem(interpTime, peakList, label = 'peaks')
    plt.stem(timeMSList, unPeakList, label = 'peaks')
    plt.xlabel('Time [ms]')
    plt.ylabel('Sensor Value')
    plt.title('ECG Signal Graph')

    plt.legend(loc = 4)
    print('Showing plot')
    plt.show()

    input()

    plt.close()
