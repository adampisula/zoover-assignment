from fastapi import FastAPI
from . import routers

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "hello!"}
