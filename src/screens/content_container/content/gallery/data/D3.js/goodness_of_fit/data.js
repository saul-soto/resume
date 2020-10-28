import * as d3 from 'd3';

const create_data = (number_simulations, mu, sigma, bin_size) => {
    const vector = d3.range(1,number_simulations+1).map(_ => { return d3.randomNormal(mu, sigma)() });
    const bins = d3.bin()(vector)

    return {vector, bins}
}

export default create_data;