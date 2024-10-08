from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

def get_db_connection():
    conn = mysql.connector.connect(
        host='44.217.181.55',
        user='root',
        password='utec',
        database='micro1' 
    )
    return conn

# USUARIOS
@app.route('/usuarios', methods=['GET'])
def get_all_usuarios():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios")
    usuarios = cursor.fetchall()
    conn.close()
    return jsonify(usuarios)

@app.route('/usuarios', methods=['POST'])
def create_usuario():
    data = request.get_json()
    nombre = data['nombre']
    email = data['email']
    celular = data['celular']
    tipo = data['tipo']

    conn = get_db_connection()
    cursor = conn.cursor()
    query = "INSERT INTO usuarios (nombre, email, celular, tipo) VALUES (%s, %s, %s, %s)"
    cursor.execute(query, (nombre, email, celular, tipo))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Usuario creado correctamente'}), 201

@app.route('/usuarios/<int:id>', methods=['GET'])
def get_usuario(id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios WHERE id = %s", (id,))
    usuario = cursor.fetchone()
    conn.close()

    if usuario:
        return jsonify(usuario)
    else:
        return jsonify({'message': 'Usuario no encontrado'}), 404

@app.route('/usuarios/<int:id>', methods=['PUT'])
def update_usuario(id):
    data = request.get_json()
    nombre = data.get('nombre')
    email = data.get('email')
    celular = data.get('celular')
    tipo = data.get('tipo')

    conn = get_db_connection()
    cursor = conn.cursor()
    query = """
        UPDATE usuarios
        SET nombre = %s, email = %s, celular = %s, tipo = %s
        WHERE id = %s
    """
    cursor.execute(query, (nombre, email, celular, tipo, id))
    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    else:
        return jsonify({'message': 'Usuario actualizado correctamente'})

@app.route('/usuarios/<int:id>', methods=['DELETE'])
def delete_usuario(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM usuarios WHERE id = %s", (id,))
    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    else:
        return jsonify({'message': 'Usuario eliminado correctamente'})

# CLIENTES
@app.route('/clientes', methods=['GET'])
def get_all_clientes():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM clientes")
    clientes = cursor.fetchall()
    conn.close()
    return jsonify(clientes)

@app.route('/clientes', methods=['POST'])
def create_cliente():
    data = request.get_json()
    id_usuario = data['id_usuario']
    pedidos = ','.join(data['pedidos']) 

    conn = get_db_connection()
    cursor = conn.cursor()
    query = "INSERT INTO clientes (id_usuario, pedidos) VALUES (%s, %s)"
    cursor.execute(query, (id_usuario, pedidos))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Cliente creado correctamente'}), 201

@app.route('/clientes/<int:id>', methods=['GET'])
def get_cliente(id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM clientes WHERE id_usuario = %s", (id,))
    cliente = cursor.fetchone()
    conn.close()

    if cliente:
        cliente['pedidos'] = cliente['pedidos'].split(',') 
        return jsonify(cliente)
    else:
        return jsonify({'message': 'Cliente no encontrado'}), 404

@app.route('/clientes/<int:id>', methods=['PUT'])
def update_cliente(id):
    data = request.get_json()

    if 'pedidos' in data:
       pedidos = ','.join(data['pedidos'])
    else:
       return jsonify({'message': 'Pedidos are required'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    query = "UPDATE clientes SET pedidos = %s WHERE id_usuario = %s"
    cursor.execute(query, (pedidos, id))
    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
       return jsonify({'message': 'Cliente no encontrado'}), 404
    else:
       return jsonify({'message': 'Cliente actualizado correctamente'})

@app.route('/clientes/<int:id>', methods=['DELETE'])
def delete_cliente(id):
   conn = get_db_connection()
   cursor = conn.cursor()
   cursor.execute("DELETE FROM clientes WHERE id_usuario = %s", (id,))
   conn.commit()
   conn.close()

   if cursor.rowcount == 0:
       return jsonify({'message': 'Cliente no encontrado'}), 404
   else:
       return jsonify({'message': 'Cliente eliminado correctamente'})

# EMPLEADOS
@app.route('/empleados', methods=['GET'])
def get_all_empleados():
   conn = get_db_connection()
   cursor = conn.cursor(dictionary=True)
   cursor.execute("SELECT * FROM empleados")
   empleados = cursor.fetchall()
   conn.close()
   return jsonify(empleados)

@app.route('/empleados', methods=['POST'])
def create_empleado():
   data = request.get_json()
   id_usuario = data['id_usuario']
   cargo = data['cargo']

   conn = get_db_connection()
   cursor = conn.cursor()
   query = "INSERT INTO empleados (id_usuario, cargo) VALUES (%s, %s)"
   cursor.execute(query, (id_usuario, cargo))
   conn.commit()
   conn.close()

   return jsonify({'message': 'Empleado creado correctamente'}), 201

@app.route('/empleados/<int:id>', methods=['GET'])
def get_empleado(id):
   conn = get_db_connection()
   cursor = conn.cursor(dictionary=True)
   cursor.execute("SELECT * FROM empleados WHERE id_usuario = %s", (id,))
   empleado = cursor.fetchone()
   conn.close()

   if empleado:
       return jsonify(empleado)
   else:
       return jsonify({'message': 'Empleado no encontrado'}), 404

@app.route('/empleados/<int:id>', methods=['PUT'])
def update_empleado(id):
   data = request.get_json()
   
   if 'cargo' not in data:
       return jsonify({'message': 'Cargo is required'}), 400

   cargo = data['cargo']

   conn = get_db_connection()
   cursor = conn.cursor()
   query = "UPDATE empleados SET cargo = %s WHERE id_usuario = %s"
   cursor.execute(query, (cargo, id))
   conn.commit()
   conn.close()

   if cursor.rowcount == 0:
       return jsonify({'message': 'Empleado no encontrado'}), 404
   else:
       return jsonify({'message': 'Empleado actualizado correctamente'})

@app.route('/empleados/<int:id>', methods=['DELETE'])
def delete_empleado(id):
   conn = get_db_connection()
   cursor = conn.cursor()
   cursor.execute("DELETE FROM empleados WHERE id_usuario = %s", (id,))
   conn.commit()
   conn.close()

   if cursor.rowcount == 0:
       return jsonify({'message': 'Empleado no encontrado'}), 404
   else:
       return jsonify({'message': 'Empleado eliminado correctamente'})

if __name__ == '__main__':
     app.run(host='0.0.0.0', port=8081, debug=True)