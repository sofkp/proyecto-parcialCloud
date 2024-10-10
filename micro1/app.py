from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from fastapi.responses import JSONResponse
import os

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50))
    email = Column(String(100))
    celular = Column(String(15))
    tipo = Column(String(50))


class Cliente(Base):
    __tablename__ = "clientes"

    id = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer)
    pedidos = Column(Text)
    direccion_id = Column(Integer)


class Empleado(Base):
    __tablename__ = "empleados"

    id = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer)
    cargo = Column(String(50))

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Usuarios
@app.get('/usuarios')
def get_all_usuarios(db: Session = Depends(get_db)):
    usuarios = db.query(Usuario).all()
    return JSONResponse(content=[usuario.__dict__ for usuario in usuarios])

@app.post('/usuarios')
def create_usuario(nombre: str, email: str, celular: str, tipo: str, db: Session = Depends(get_db)):
    nuevo_usuario = Usuario(nombre=nombre, email=email, celular=celular, tipo=tipo)
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return JSONResponse(content={'message': 'Usuario creado correctamente', 'id': nuevo_usuario.id}, status_code=201)

@app.get('/usuarios/{id}')
def get_usuario(id: int, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.id == id).first()
    if usuario:
        return JSONResponse(content=usuario.__dict__)
    else:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

@app.put('/usuarios/{id}')
def update_usuario(id: int, nombre: str = None, email: str = None, celular: str = None, tipo: str = None, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.id == id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    if nombre is not None:
        usuario.nombre = nombre
    if email is not None:
        usuario.email = email
    if celular is not None:
        usuario.celular = celular
    if tipo is not None:
        usuario.tipo = tipo

    db.commit()
    return JSONResponse(content={'message': 'Usuario actualizado correctamente'})

@app.delete('/usuarios/{id}')
def delete_usuario(id: int, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.id == id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    db.delete(usuario)
    db.commit()
    return JSONResponse(content={'message': 'Usuario eliminado correctamente'})

# Clientes
@app.get('/clientes')
def get_all_clientes(db: Session = Depends(get_db)):
    clientes = db.query(Cliente).all()
    for cliente in clientes:
        cliente.pedidos = cliente.pedidos.split(',') if cliente.pedidos else []
    return JSONResponse(content=[cliente.__dict__ for cliente in clientes])

@app.post('/clientes')
def create_cliente(id_usuario: int, pedidos: list = [], direccion_data: dict = None, db: Session = Depends(get_db)):
    direccion_id = None
    if direccion_data:
        try:
            direccion_response = requests.post(f"{MICRO3_URL}/direcciones", json=direccion_data)
            if direccion_response.status_code == 201:
                direccion_id = direccion_response.json().get('id')
        except requests.exceptions.RequestException as e:
            raise HTTPException(status_code=500, detail="Error al comunicar con el microservicio de direcciones")

    pedidos_str = ','.join(pedidos)
    nuevo_cliente = Cliente(id_usuario=id_usuario, pedidos=pedidos_str, direccion_id=direccion_id)
    db.add(nuevo_cliente)
    db.commit()
    db.refresh(nuevo_cliente)
    return JSONResponse(content={'message': 'Cliente creado correctamente', 'id': nuevo_cliente.id}, status_code=201)

@app.get('/clientes/{id}')
def get_cliente(id: int, db: Session = Depends(get_db)):
    cliente = db.query(Cliente).filter(Cliente.id == id).first()
    if cliente:
        cliente.pedidos = cliente.pedidos.split(',') if cliente.pedidos else []
        return JSONResponse(content=cliente.__dict__)
    else:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

@app.put('/clientes/{id}')
def update_cliente(id: int, pedidos: list = [], direccion_data: dict = None, db: Session = Depends(get_db)):
    cliente = db.query(Cliente).filter(Cliente.id == id).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    if pedidos:
        cliente.pedidos = ','.join(pedidos)

    if direccion_data:
        try:
            direccion_response = requests.post(f"{MICRO3_URL}/direcciones", json=direccion_data)
            if direccion_response.status_code == 201:
                cliente.direccion_id = direccion_response.json().get('id')
        except requests.exceptions.RequestException as e:
            raise HTTPException(status_code=500, detail="Error al comunicar con el microservicio de direcciones")

    db.commit()
    return JSONResponse(content={'message': 'Cliente actualizado correctamente'})


@app.delete('/clientes/{id}')
def delete_cliente(id: int, db: Session = Depends(get_db)):
    cliente = db.query(Cliente).filter(Cliente.id == id).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    db.delete(cliente)
    db.commit()
    return JSONResponse(content={'message': 'Cliente eliminado correctamente'})

# Empleados
@app.get('/empleados')
def get_all_empleados(db: Session = Depends(get_db)):
    empleados = db.query(Empleado).all()
    return JSONResponse(content=[empleado.__dict__ for empleado in empleados])

@app.post('/empleados')
def create_empleado(id_usuario: int, cargo: str, db: Session = Depends(get_db)):
    nuevo_empleado = Empleado(id_usuario=id_usuario, cargo=cargo)
    db.add(nuevo_empleado)
    db.commit()
    db.refresh(nuevo_empleado)
    return JSONResponse(content={'message': 'Empleado creado correctamente', 'id': nuevo_empleado.id}, status_code=201)

@app.get('/empleados/{id}')
def get_empleado(id: int, db: Session = Depends(get_db)):
    empleado = db.query(Empleado).filter(Empleado.id == id).first()
    if empleado:
        return JSONResponse(content=empleado.__dict__)
    else:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")

@app.put('/empleados/{id}')
def update_empleado(id: int, cargo: str, db: Session = Depends(get_db)):
    empleado = db.query(Empleado).filter(Empleado.id == id).first()
    if not empleado:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")

    empleado.cargo = cargo
    db.commit()
    return JSONResponse(content={'message': 'Empleado actualizado correctamente'})

@app.delete('/empleados/{id}')
def delete_empleado(id: int, db: Session = Depends(get_db)):
    empleado = db.query(Empleado).filter(Empleado.id == id).first()
    if not empleado:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")

    db.delete(empleado)
    db.commit()
    return JSONResponse(content={'message': 'Empleado eliminado correctamente'})

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8081)
