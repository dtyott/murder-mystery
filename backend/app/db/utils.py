import numpy as np

alphabet=[l for l in 'abcdefghijklmnopqrstuvwxyz']

def get_random_unused_id(ids, length = 5): 
    res = "".join(np.random.choice(alphabet, size=length))
    return res if res not in ids else get_random_unused_id(ids, length=length)