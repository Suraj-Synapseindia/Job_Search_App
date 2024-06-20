from motor.motor_asyncio import AsyncIOMotorClient
import urllib.parse

# Replace with your properly encoded MongoDB Atlas connection string
username = "jrmenon31"
password = "Suraj@2002"
cluster = "cluster0.3fbwebd.mongodb.net"
database_name = "job_search"

# Encode username and password
username = urllib.parse.quote_plus(username)
password = urllib.parse.quote_plus(password)

MONGO_DETAILS = f"mongodb+srv://{username}:{password}@{cluster}/{database_name}?retryWrites=true&w=majority"

client = AsyncIOMotorClient(MONGO_DETAILS)
database = client.job_search

# Define your collections here
job_collection = database.job_postings
user_collection = database.users  # Adjust this according to your actual collection name

# Export collections as needed
__all__ = ["job_collection", "user_collection"]
