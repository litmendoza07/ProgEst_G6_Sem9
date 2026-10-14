from __future__ import annotations

from typing import Any

StackItem = dict[str, Any]


def is_empty(stack: list[StackItem]) -> bool:
    """Devuelve True si la pila está vacía."""
    return not stack


def is_full(stack: list[StackItem], capacity: int) -> bool:
    """Devuelve True si la pila ya alcanzó su capacidad máxima."""
    return len(stack) >= capacity


def push(stack: list[StackItem], item: StackItem, capacity: int) -> bool:
    """Agrega un elemento a la pila si aún hay espacio."""
    if is_full(stack, capacity):
        return False

    stack.append(item)
    return True


def peek(stack: list[StackItem]) -> StackItem | None:
    """Muestra el elemento que está en el tope sin quitarlo."""
    if is_empty(stack):
        return None

    return stack[-1]


def pop_stack(stack: list[StackItem]) -> StackItem | None:
    """Quita y devuelve el elemento del tope de la pila."""
    if is_empty(stack):
        return None

    return stack.pop()

