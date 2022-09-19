from typing import List
from loguru import logger
from fastapi import WebSocket


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    async def disconnect(self, websocket: WebSocket):
        logger.info(f'removing connection {websocket}')
        logger.info(f'{len(self.active_connections)} connections')
        self.active_connections.remove(websocket)
        logger.info(f'{len(self.active_connections)} connections')


    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)