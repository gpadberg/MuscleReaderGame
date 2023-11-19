import tkinter as tk
from tkinter import messagebox
from PIL import ImageTk, Image
from numpy import random
import calculateBPM as calcB
from os import listdir
import os



# folder_dir = "/Users/johnalvaro/Documents/desktopPhobiaTester/Application/Image"
folder_dir = './Image'
imageObj = []
for images in os.listdir(folder_dir):
	# check if the image ends with png
	if (images.endswith(".jpeg")):
		print(images)
		imageObj.append(images)

# set colours


bpmCount = {}
bg_colour = '#0d0329'
pastelPink = "#f48686"



# load custom fonts
#pyglet.font.add_file("fonts/Shanti-Bold.ttf")
#pyglet.font.add_file("fonts/Shanti-Regular.ttf")

def clear_widgets(frame):
	# select all frame widgets and delete them
	for widget in frame.winfo_children():
		widget.destroy()

def load_frame1():
	clear_widgets(frame2)
	clear_widgets(frame3)
	
	# stack frame 1 above frame 2
	frame1.tkraise()
	# prevent widgets from modifying the frame
	frame1.pack_propagate(False)
	old_img = Image.open('./Logo/phobiatestlogo.png')
	resize_old = old_img.resize((200,150))
	logo_img = ImageTk.PhotoImage(resize_old)
	logo_widget = tk.Label(frame1, image=logo_img, bg=bg_colour)
	#logo_widget = tk.Label(frame1, text='Welcome to Phobia Test', font=('Shanti', 20), bg=bg_colour)
	logo_widget.image = logo_img
	logo_widget.pack()

	# create label widget for instructions
	tk.Label(
		frame1, 
		text="Welcome to the 'Phobia Test'!",
		bg=bg_colour,
		fg=pastelPink,
		font=("Shanti", 50, 'bold')
		).pack()
	
	tk.Label(
		frame1, 
		text='''This test will show you a series of images that will
attempt to induce fear
while at the same time, we will record your heart rate!

------- INSTRUCTIONS -------

After clicking 'Start Test', the first 10-15 seconds 
will be used to record your resting heart rate.

After that, expect to see some images 
related to certain phobies! Just watch the
screen and try not to look away.

At the end of the test, there will be a 
'Finish Testing' button. Click on that 
when no more images pop up.

-----------------------------

Good Luck!
		''',
		bg=bg_colour,
		fg="white",
		font=("Shanti", 14)
		).pack(pady=20)
	tk.Label(
		frame1, 
		text="Press 'Start Test' To Find Your Fears!",
		bg=bg_colour,
		fg="white",
		font=("Shanti", 14)
		).pack()

	# create button widget
	tk.Button(
		frame1,
		text="Start Test",
		font=("Shanti", 20),
		bg="#28393a",
		fg="black",
		activebackground="#badee2",
		activeforeground="black",
		command=lambda:load_frame2()
		).pack(pady=20)
	
def load_frame2():
	clear_widgets(frame1)
	# stack frame 2 above frame 1
	frame2.tkraise()
	bpm = calcB.doGenerateBPM()
	

	# lbl = tk.Label(frame2, text='Your Resting Heart Rate is: {}'.format(bpm), font=('Shanti', 25))
	# lbl.pack(padx=30)
	
	target = len(imageObj)
	i = 0
	while i < target:
		imName = imageObj[i]
		# phobiaName = imageObj[i].split('/')[1].split('.')[0]
		phobiaName = imageObj[i].split('.')[0]
		img = Image.open('./Image/'+imName)
		img.show()
		bpm = calcB.doGenerateBPM()
		bpmCount[phobiaName] = bpm
		print(bpmCount)
		# for proc in psutil.process_iter():
		# 	print(proc.name())
		# 	if proc.name() == 'display':
		# 		proc.kill()
		# 	pass
		img.close()
		i+=1


	
	tk.Button(
		frame2,
		text="Finish Testing",
		font=("Shanti", 40, 'bold'),
		bg="#28393a",
		fg="#0500a5",
		activebackground="#badee2",
		activeforeground="black",
		command=lambda:load_frame3()
		).place(relx=.5,rely=.5,anchor="center")


def load_frame3():
	clear_widgets(frame2)
	frame3.tkraise()
	tk.Label(
		frame3, 
		text='Results',
		bg=bg_colour,
		fg="#00e0fa",
		font=("Shanti", 45, 'bold')
		).pack(pady=25, padx=25)
	
	sortedPhobias = sorted(bpmCount, reverse=True)
	maxBPM = max(bpmCount.values())
	maxPhobia = []
	lowPhobia = []
	
	for key in sortedPhobias:
		if bpmCount[key] == maxBPM:
			maxPhobia.append(key)
		else:
			lowPhobia.append(key)
	
	lowPhobia.sort(reverse=True)
		
	tk.Label(
		frame3, 
		text='Most Likely Phobia',
		bg=bg_colour,
		fg=pastelPink,
		font=("Shanti", 25, 'bold')
		).pack(pady=25, padx=25)
	
	for phobia in maxPhobia:
		a = phobia.split('_')
		phobiaName = a[0]
		pictureName = a[1]
		tk.Label(frame3,text='{} | {} | BPM: {}'.format(pictureName, phobiaName,bpmCount[phobia]),bg=bg_colour,font=('Shanti',15)).pack(pady=15, padx=15)
	
	tk.Label(
		frame3, 
		text='Least Likely Phobia',
		bg=bg_colour,
		fg=pastelPink,
		font=("Shanti", 25, 'bold')
		).pack(pady=25, padx=25)
	
	for phobia in lowPhobia:
		a = phobia.split('_')
		phobiaName = a[0]
		pictureName = a[1]
		tk.Label(frame3,text='{} | {} | BPM: {}'.format(pictureName, phobiaName ,bpmCount[phobia]),bg=bg_colour,font=('Shanti',15)).pack(pady=15, padx=15)
		

	

	# 'back' button widget
	tk.Button(
		frame3,
		text="Re-Do Test?",
		font=("Shanti", 18),
		bg="#28393a",
		fg="#0500a5",
		activebackground="#badee2",
		activeforeground="black",
		command=lambda:load_frame1()
		).pack(pady=20)
# initiallize app with basic settings
root = tk.Tk()
root.title("Phobia Test")
root.eval("tk::PlaceWindow . center")

# place app in the center of the screen (alternative approach to root.eval())
# x = root.winfo_screenwidth() // 2
# y = int(root.winfo_screenheight() * 0.1)
# root.geometry('500x600+' + str(x) + '+' + str(y))
 
# create a frame widgets
frame1 = tk.Frame(root, width=700, height=800, bg=bg_colour)
frame2 = tk.Frame(root, bg=bg_colour)
frame3 = tk.Frame(root, bg=bg_colour)

# place frame widgets in window
for frame in (frame1, frame2, frame3):
	frame.grid(row=0, column=0, sticky="nesw")

# load the first frame
load_frame1()

# run app
root.mainloop()