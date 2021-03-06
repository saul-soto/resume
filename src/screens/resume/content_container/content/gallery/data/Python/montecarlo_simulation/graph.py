from functions import create_random_space_walks
import matplotlib.pyplot as plt
from datetime import datetime as dt
from datetime import timedelta as td
now = dt.now()

space = create_random_space_walks(probability=.70, steps_to_walk=300, number_simulations=100)

ls_times = []
number_simulations = space.shape[1]
for sim in range(number_simulations):
    now1 = dt.now()
    plt.plot(
        space[:,sim], 
        color='#740a01', 
        alpha=.3,
        linewidth=.5
    )

    ls_times.append( (dt.now()-now1).microseconds )
    print('\tDrawing simulations:\t{}'.format(
            str(td(microseconds=sum(ls_times)/len(ls_times)) * (number_simulations-sim))
    ), end='\n' if number_simulations == sim+1 else '\r')

plt.savefig('graph.svg', format='svg', dpi=1200)
plt.savefig('graph.png')

# REMOVE THE <metadata> TAG TO AVOID ISSUES WITH IMPORTING
svg_string = open('graph.svg','r').read()
svg_string = svg_string.replace('<metadata'+svg_string.split('metadata')[1]+'metadata>','')
open('graph.svg','+w').write(svg_string)

print('\n\tFinished in:\t\t{}'.format(dt.now()-now))
