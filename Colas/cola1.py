from collections import deque

cola = deque()

def agregar(dato):
    cola.append(dato)

def show():
    return cola

def trash():
    if cola:
        return cola.popleft()
    return "La cola esta vacia..."

print(trash())