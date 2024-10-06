from flask import Flask, request, json, Response
from pymongo import MongoClient
import logging as log
import requests

app = Flask(__name__)

client = MongoClient("mongodb://44.217.181.55:27017")
db = client['micro3']
direcciones_collection = db['direcciones']
pedidos_collection = db['pedidos']

MICROSERVICIO_USUARIOS = "http://LB-Prod-164609483.us-east-1.elb.amazonaws.com:8001"
MICROSERVICIO_PRODUCTOS = "http://LB-Prod-164609483.us-east-1.elb.amazonaws.com:8002"

@app.route('/direccion', methods=['GET', 'POST'])
def direccion_api():
    if request.method == 'GET':
        direcciones = list(direcciones_collection.find())
        for direccion in direcciones:
            direccion['_id'] = str(direccion['_id'])
        return Response(response=json.dumps(direcciones), status=200, mimetype='application/json')
    
    elif request.method == 'POST':
        nueva_direccion = request.json
        result = direcciones_collection.insert_one(nueva_direccion)
        return Response(response=json.dumps({'id': str(result.inserted_id)}), status=201, mimetype='application/json')

@app.route('/pedido', methods=['GET', 'POST'])
def pedido_api():
    if request.method == 'GET':
        pedidos = list(pedidos_collection.find())
        for pedido in pedidos:
            pedido['_id'] = str(pedido['_id'])
        return Response(response=json.dumps(pedidos), status=200, mimetype='application/json')

    elif request.method == 'POST':
        nuevo_pedido = request.json
        cliente_id = nuevo_pedido.get('cliente_id')
        productos_ids = nuevo_pedido.get('productos_ids', [])

        cliente_response = requests.get(f"{MICROSERVICIO_USUARIOS}/clientes/{cliente_id}")
        if cliente_response.status_code != 200:
            return Response(response=json.dumps({"error": "Cliente no encontrado"}), status=404, mimetype='application/json')

        productos_validos = []
        for producto_id in productos_ids:
            producto_response = requests.get(f"{MICROSERVICIO_PRODUCTOS}/productos/{producto_id}")
            if producto_response.status_code == 200:
                productos_validos.append(producto_id)

        if len(productos_validos) != len(productos_ids):
            return Response(response=json.dumps({"error": "Algunos productos no fueron encontrados"}), status=404, mimetype='application/json')

        nuevo_pedido['productos_ids'] = productos_validos
        result = pedidos_collection.insert_one(nuevo_pedido)
        return Response(response=json.dumps({'id': str(result.inserted_id)}), status=201, mimetype='application/json')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8003, debug=True)
