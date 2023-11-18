import sys

def reset():
    print("Test has been reset")

def advance():
    print("Advanced slide")

def calculate():
    print("Calculate sum stuff")

def process_command(command):
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

def main():
    running = True
    while running:
        command = sys.stdin.readline().strip()  # Read a line from stdin
        if command:
            running = not process_command(command)

if __name__ == '__main__':
    main()
