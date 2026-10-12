#Crea un menu: apilar caja, desapilar, consultar tope, mostrar pila y cantidad de cajas, salir
#No aceptar codigos vacios ni duplicados 
#Mostrar cantidad de cajas y validar pila vacia

def apilar(pila):
    codigo = input("Ingresa el codigo de la caja: ").strip()

    if not codigo:
        print("Error: el codigo no puede estar vacio.")
    elif codigo in pila:
        print("Error: ese codigo ya existe en la pila.")
    else:
        pila.append(codigo)
        print("Caja apilada correctamente.")

def desapilar(pila):
    if not pila:
        print("La pila esta vacia; no hay cajas para desapilar.")
        return

    print(f"Caja desapilada: {pila.pop()}")

def consultar_tope(pila):
    if not pila:
        print("La pila esta vacia.")
    else:
        print(f"Caja en el tope: {pila[-1]}")

def mostrar_pila(pila):
    if not pila:
        print("La pila esta vacia.")
    else:
        print("Cajas en la pila (del tope a la base):")
        for codigo in reversed(pila):
            print(f"- {codigo}")

    print(f"Cantidad de cajas: {len(pila)}")
 
def main():
    pila = []

    while True:
        print("\n--- Menu de cajas ---")
        print("1. Apilar caja")
        print("2. Desapilar")
        print("3. Consultar tope")
        print("4. Mostrar pila y cantidad de cajas")
        print("5. Salir")

        opcion = input("Selecciona una opcion: ").strip()

        if opcion == "1":
            apilar(pila)
        elif opcion == "2":
            desapilar(pila)
        elif opcion == "3":
            consultar_tope(pila)
        elif opcion == "4":
            mostrar_pila(pila)
        elif opcion == "5":
            print("Hasta luego.")
            break
        else:
            print("Opcion invalida. Selecciona un numero del 1 al 5.")