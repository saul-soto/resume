import matplotlib.pyplot as plt
import numpy as np

domain = np.linspace(0,2*np.pi,500)

ls_fun = [
    lambda x: np.sin(  x/2        ),
    lambda x: np.cos( (x+np.pi)/2 ),
]

for f in ls_fun:
    image = np.vectorize(f)(domain)
    plt.plot(domain, image)

plt.scatter(domain.max()/2, 0, color='blue', marker='o', s=4000)

plt.savefig('graph.png')
plt.savefig('graph.svg', format='svg')

svg_string = open('graph.svg','r').read() 
svg_string = svg_string.replace('<metadata'+svg_string.split('metadata')[1]+'metadata>','') 
open('graph.svg','+w').write(svg_string) 