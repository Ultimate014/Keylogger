import boto3, os

HOOK_ID = 'afda7f49-9ce1-485b-8477-31728c84423a'
MG_CONN_STR = os.environ.get("MG_CONN_STR")
ENDPOINT = os.environ.get('ENDPOINT')
GATEWAY = boto3.client('apigatewaymanagementapi', endpoint_url=ENDPOINT)
