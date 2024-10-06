from flask import Flask, request, json, Response
from pymongo import MongoClient
import logging as log

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017/") 
db = client['nombre_de_tu_base_de_datos']
direcciones_collection = db['direcciones'] 
pedidos_collection = db['pedidos']  

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
        result = pedidos_collection.insert_one(nuevo_pedido)
        return Response(response=json.dumps({'id': str(result.inserted_id)}), status=201, mimetype='application/json')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001, debug=True)
from flask import Flask, request, jsonify
from pymongo import MongoClient
import logging as log

app = Flask(__name__)

class MongoAPI:
    def __init__(self, collection):
        log.basicConfig(level=log.DEBUG, format='%(asctime)s %(levelname)s:\n%(message)s\n')
        self.client = MongoClient("mongodb://localhost:27017")  
        self.collection = self.client['mi_basededatos'][collection] 

    def read_all(self):
        log.info('Reading All Data')
        documents = self.collection.find()
        output = [{item: data[item] for item in data if item != '_id'} for data in documents]
        return output

    def write(self, data):
        log.info('Writing Data')
        response = self.collection.insert_one(data)
        return {'Status': 'Successfully Inserted', 'Document_ID': str(response.inserted_id)}

    def update(self, filter, update_data):
        log.info('Updating Data')
        response = self.collection.update_one(filter, {"$set": update_data})
        return {'Status': 'Successfully Updated' if response.modified_count > 0 else "Nothing was updated."}

    def delete(self, filter):
        log.info('Deleting Data')
        response = self.collection.delete_one(filter)
        return {'Status': 'Successfully Deleted' if response.deleted_count > 0 else "Document not found."}

@app.route('/direccion', methods=['GET'])
def get_direcciones():
    api = MongoAPI('direccion')
    return jsonify(api.read_all()), 200

@app.route('/direccion', methods=['POST'])
def create_direccion():
    data = request.json
    api = MongoAPI('direccion')
    return jsonify(api.write(data)), 201

@app.route('/direccion/<int:id>', methods=['PUT'])
def update_direccion(id):
    data = request.json
    api = MongoAPI('direccion')
    filter = {'id': id}
    return jsonify(api.update(filter, data)), 200

@app.route('/direccion/<int:id>', methods=['DELETE'])
def delete_direccion(id):
    api = MongoAPI('direccion')
    filter = {'id': id}
    return jsonify(api.delete(filter)), 200

@app.route('/pedido', methods=['GET'])
def get_pedidos():
    api = MongoAPI('pedido')
    return jsonify(api.read_all()), 200

@app.route('/pedido', methods=['POST'])
def create_pedido():
    data = request.json
    api = MongoAPI('pedido')
    return jsonify(api.write(data)), 201

@app.route('/pedido/<int:id>', methods=['PUT'])
def update_pedido(id):
    data = request.json
    api = MongoAPI('pedido')
    filter = {'id': id}
    return jsonify(api.update(filter, data)), 200

@app.route('/pedido/<int:id>', methods=['DELETE'])
def delete_pedido(id):
    api = MongoAPI('pedido')
    filter = {'id': id}
    return jsonify(api.delete(filter)), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8003, debug=True)
