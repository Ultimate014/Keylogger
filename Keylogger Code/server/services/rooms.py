import json
from datetime import datetime
from pymongo import MongoClient
from utils.constants import GATEWAY, MG_CONN_STR

client = MongoClient(MG_CONN_STR)
# init collection
db = client.winserv_stroke

hooks_db =  db['hooks_db']

def add_connection_id_to_hook(hook_id: str, connection_id: str):
    try:
        # print(hooks_db)
        hook = hooks_db.find_one({'hook_id': hook_id})
        if hook:
            connections: list = hook.get('connections', [])
            connections.append(connection_id)
            hooks_db.find_one_and_update({'hook_id': hook_id}, {
                "$set": dict({
                    'connections': connections
                })
            })
        else:
            hooks_db.insert_one({'hook_id': hook_id, 'connections': [connection_id], "createdAt": datetime.utcnow()})
    except Exception as e:
        print(e)
        
def remove_connection_id_from_hook(connection_id: str, hook_id: str):
    try:
        hook = hooks_db.find_one({'hook_id': hook_id})
        if hook:
            connections: list = hook.get('connections', [])
            connections.remove(connection_id)
            hooks_db.find_one_and_update({'hook_id': hook_id},{
                "$set": dict({
                    'connections': connections
                })
            })
    except Exception as e:
        print("Remove:", e)

def broadcast_message_to_hook(sender_conection_id: str, message: dict, hook_id: str):
    hook = hooks_db.find_one({'hook_id': hook_id})
    connections: list = hook.get('connections', [])
    for connection_id in connections:
        try:
            if connection_id != sender_conection_id:
                GATEWAY.post_to_connection(ConnectionId=connection_id, Data=json.dumps(message).encode('utf-8'))
        except Exception as e:
            remove_connection_id_from_hook(connection_id=connection_id, hook_id=hook_id)
            print("Broadcast: ",e)
            
def send_private_message(connection_id: str, message: dict):
    try:
        GATEWAY.post_to_connection(ConnectionId=connection_id, Data=json.dumps(message).encode('utf-8'))
    except Exception as e:
        print("Broadcast: ",e)