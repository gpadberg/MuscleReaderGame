from sys import argv 
from random import randint
fileName = "output.txt"
from calculateBPM import do_generateBPM

if __name__ == "__main__":
    argVal = argv[1]
    if argVal == "reset":
        with open(fileName, "w") as myFile:
            pass # empties the file
    elif argVal == "advance":
        # print("start Advance")
        # do_generateBPM
        with open(fileName, "a") as myFile:
            intVal = randint(100, 150)
            myFile.write(f"{intVal}\n")

    elif argVal == "display":
        # print("start Advance")
        # do_generateBPM
        with open(fileName, "r") as myFile:
            print(myFile.readlines())

        print("Test")

