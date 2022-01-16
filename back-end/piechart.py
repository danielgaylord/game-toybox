import matplotlib.pyplot as plt
import os 

def GeneratePie(data, colors, wedge):
    # turn inputs into usable lists
    data = [float(i) for i in data.split(',')]
    colors = ['#' + i for i in colors.split(',')]

    # Make a matplotlib (high res) pie chart!
    fig1, ax1 = plt.subplots(figsize=(20,20))
    patches, texts = ax1.pie(data,explode=[float(wedge) for w in
    range(0,len(data))], colors = colors, startangle=90)

    # Equal aspect ratio ensures that pie is drawn as a circle
    ax1.axis('equal')
    plt.tight_layout()

    # Save the image temporary on the local machine
    plt.savefig(os.getcwd() + '/test.png')