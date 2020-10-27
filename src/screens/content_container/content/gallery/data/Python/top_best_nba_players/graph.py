import matplotlib.pyplot as plt
import numpy as np

domain = np.linspace(0,2*np.pi,500)
image = np.vectorize(lambda x: np.sin(x**2)**2)(domain)

plt.plot(domain, image)
plt.savefig('graph.png')
plt.savefig('graph.svg', format='svg')

svg_string = open('graph.svg','r').read() 
svg_string = svg_string.replace('<metadata'+svg_string.split('metadata')[1]+'metadata>','') 
open('graph.svg','+w').write(svg_string) 