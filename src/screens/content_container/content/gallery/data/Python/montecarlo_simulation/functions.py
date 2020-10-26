import numpy as np

def create_random_space_walks(probability,steps_to_walk, number_simulations):
    space = np.random.binomial(1, probability, (steps_to_walk,number_simulations))
    space = np.vectorize(lambda n:-1 if n == 0 else n)(space)
    space = np.cumsum(space, axis=0)

    minimums = space.min(axis=0)

    for sim in range(space.shape[1]):
        space[:,sim] = space[:,sim] - minimums[sim]
    
    return space