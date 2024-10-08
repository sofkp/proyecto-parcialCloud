from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mysql.connector
from typing import List

app = FastAPI()

def get_db_connection():
    conn = mysql.connector.connect(
        host='44.217.181.55',
        user='root',
        password='utec',
        database='micro1'
    )
    return conn

# Modelos
class Usuario(BaseModel):
    nombre: str
    email: str
    celular: str
    tipo: str

class Cliente(BaseModel):
    id_usuario: int
    pedidos: List[str]

class Empleado(BaseModel):
    id_usuario: int
    cargo: str

# USUARIOS
@app.get("/usuarios")
def get_all_usuarios():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios")
    usuarios = cursor.fetchall()
    conn.close()
    return usuarios

@app.post("/usuarios", status_code=201)
def create_usuario(usuario: Usuario):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = "INSERT INTO usuarios (nombre, email, celular, tipo) VALUES (%s, %s, %s, %s)"
    cursor.execute(query, (usuario.nombre, usuario.email, usuario.celular, usuario.tipo))
    conn.commit()
    conn.close()
    return {"message": "Usuario creado correctamente"}

@app.get("/usuarios/{id}")
def get_usuario(id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios WHERE id = %s", (id,))
    usuario = cursor.fetchone()
    conn.close()

    if usuario:
        return usuario
    raise HTTPException(status_code=404, detail="Usuario no encontrado")

@app.put("/usuarios/{id}")
def update_usuario(id: int, usuario: Usuario):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = """
        UPDATE usuarios
        SET nombre = %s, email = %s, celular = %s, tipo = %s
        WHERE id = %s
    """
    cursor.execute(query, (usuario.nombre, usuario.email, usuario.celular, usuario.tipo, id))
    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"message": "Usuario actualizado correctamente"}

@app.delete("/usuarios/{id}")
def delete_usuario(id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM usuarios WHERE id = %s", (id,))
    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"message": "Usuario eliminado correctamente"}

# CLIENTES
@app.get("/clientes")
def get_all_clientes():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM clientes")
    clientes = cursor.fetchall()
    conn.close()
    return clientes

@app.post("/clientes", status_code=201)
def create_cliente(cliente: Cliente):
    conn = get_db_connection()
    cursor = conn.cursor()
    pedidos = ','.join(cliente.pedidos)
    query = "INSERT INTO clientes (id_usuario, pedidos) VALUES (%s, %s)"
    cursor.execute(query, (cliente.id_usuario, pedidos))
    conn.commit()
    conn.close()
    return {"message": "Cliente creado correctamente"}

@app.get("/clientes/{id}")
def get_cliente(id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM clientes WHERE id_usuario = %s", (id,))
    cliente = cursor.fetchone()
    conn.close()

    if cliente:
        cliente['pedidos'] = cliente['pedidos'].split(',')
        return cliente
    raise HTTPException(status_code=404, detail="Cliente no encontrado")

@app.put("/clientes/{id}")
def update_cliente(id: int, cliente: Cliente):
    conn = get_db_connection()
    cursor = conn.cursor()
    pedidos = ','.join(cliente.pedidos)
    query = "UPDATE clientes SET pedidos = %s WHERE id_usuario = %s"
    cursor.execute(query, (pedidos, id))
    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return {"message": "Cliente actualizado correctamente"}

@app.delete("/clientes/{id}")
def delete_cliente(id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM clientes WHERE id_usuario = %s", (id,))
    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return {"message": "Cliente eliminado correctamente"}

# EMPLEADOS
@app.get("/empleados")
def get_all_empleados():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM empleados")
    empleados = cursor.fetchall()
    conn.close()
    return empleados

@app.post("/empleados", status_code=201)
def create_empleado(empleado: Empleado):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = "INSERT INTO empleados (id_usuario, cargo) VALUES (%s, %s)"
    cursor.execute(query, (empleado.id_usuario, empleado.cargo))
    conn.commit()
    conn.close()
    return {"message": "Empleado creado correctamente"}

@app.get("/empleados/{id}")
def get_empleado(id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM empleados WHERE id_usuario = %s", (id,))
    empleado = cursor.fetchone()
    conn.close()

    if empleado:
        return empleado
    raise HTTPException(status_code=404, detail="Empleado no encontrado")

@app.put("/empleados/{id}")
def update_empleado(id: int, empleado: Empleado):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = "UPDATE empleados SET cargo = %s WHERE id_usuario = %s"
    cursor.execute(query, (empleado.cargo, id))
    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")
    return {"message": "Empleado actualizado correctamente"}

@app.delete("/empleados/{id}")
def delete_empleado(id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM empleados WHERE id_usuario = %s", (id,))
    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")
    return {"message": "Empleado eliminado correctamente"}
