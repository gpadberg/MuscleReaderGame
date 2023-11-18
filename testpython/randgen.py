import sys


def reset():
    print("Do some reseting")

def advance():
    print("What happens when next slide is advanced")

def calculate():
    print("Calculate sum stuff")


def main():
    if len(sys.argv) > 1:
        command = sys.argv[1]  # Get the first argument
        
        if command == 'reset':
            reset()
        elif command == 'advance':
            advance()
        elif command == 'calculate':
            calculate()
        elif command == 'exit':
            print('Thank you for using foobar')
            return True
        else:
            print('Unknown command!!!')


if __name__ == "__main__":
    main()
