import json
import boto3
from services.rooms import add_connection_id_to_hook, broadcast_message_to_hook, remove_connection_id_from_hook
from utils.constants import HOOK_ID

def lambda_handler(event, context):
    try:
        # extract connectionID from incoming event
        requestContext = event.get('requestContext', {})
        connection_id = requestContext.get('connectionId', "")
        routeKey = requestContext.get('routeKey', "")
        
        if routeKey == "$connect":
            # print("In!")
            add_connection_id_to_hook(hook_id=HOOK_ID, connection_id=connection_id)
            return {'statusCode': 200}
            
        elif routeKey == "$disconnect":
            remove_connection_id_from_hook(connection_id=connection_id, hook_id=HOOK_ID)
            return {'statusCode': 200}
        elif routeKey == "sendStroke":
            body = json.loads(event.get('body'))
            # print(body)
            return sendStroke(body, connection_id)
        else:
            return {'statusCode': 404}
    except Exception as e:
        print(e)
        return {'statusCode': 404}

def sendStroke(body: dict, connection_id: str):
    # hook_id = body.get("hook_id")
    stroke = body.get("stroke")
    # print(stroke)
    message_obj = {"stroke": stroke}
    broadcast_message_to_hook(sender_conection_id=connection_id, message=message_obj, hook_id=HOOK_ID)
    return {'statusCode': 200}
    