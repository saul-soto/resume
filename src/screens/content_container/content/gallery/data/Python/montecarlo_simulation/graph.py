from functions import create_random_space_walks
import matplotlib.pyplot as plt
from datetime import datetime as dt
from datetime import timedelta as td
now = dt.now()

space = create_random_space_walks(.65, 500, 50)

ls_times = []
number_simulations = space.shape[1]
for sim in range(number_simulations):
    now1 = dt.now()
    plt.plot(space[:,sim], color='blue', alpha=.3)

    ls_times.append( (dt.now()-now1).microseconds )
    print('\tDrawing simulations:\t{}'.format(
            str(td(microseconds=sum(ls_times)/len(ls_times)) * (number_simulations-sim))
    ), end='\r' if number_simulations != sim else '\n')


plt.title('Monte Carlo Simulation\n#Simulations: {}'.format(number_simulations))
plt.savefig('graph.svg', format='svg')
plt.savefig('graph.png')
print('\n\tFinished in:\t\t{}'.format(dt.now()-now))
