from functions import create_random_space_walks
import matplotlib.pyplot as plt
from datetime import datetime as dt
from datetime import timedelta as td
now = dt.now()

space = create_random_space_walks(.7, 1000, 10)

ls_times = []
number_simulations = space.shape[1]
for sim in range(number_simulations):
    now1 = dt.now()
    plt.plot(space[:,sim])





    ls_times.append( (dt.now()-now1).microseconds )
    print('\tDrawing simulations:\t{}'.format(
            str(td(microseconds=sum(ls_times)/len(ls_times)) * (number_simulations-sim))
    ), end='\r' if number_simulations != sim else '\n')

plt.savefig('graph.png')
print('\n\tFinished in:\t\t{}'.format(dt.now()-now))
