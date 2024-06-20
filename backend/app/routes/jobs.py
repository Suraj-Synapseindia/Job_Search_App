
from fastapi import APIRouter, Query, HTTPException
from app.db import job_collection
from app.schemas import JobResponse
from typing import List
import Levenshtein

router = APIRouter()

def fuzzy_match(query: str, choices: List[str], threshold: float = 0.6):
    results = []
    for choice in choices:
        similarity = Levenshtein.ratio(query.lower(), choice.lower())
        if similarity >= threshold:
            results.append((choice, similarity))
    results.sort(key=lambda x: x[1], reverse=True)
    return results

@router.get("/", response_model=List[JobResponse])
async def get_jobs(title: str = Query(None)):
    try:
        # Fetch all jobs from the database
        jobs_cursor = job_collection.find()
        jobs = await jobs_cursor.to_list(length=100)

        if not title:
            # If no title is provided, return all jobs
            return jobs

        # Extract job names from MongoDB cursor
        job_names = [job['job_name'] for job in jobs]

        # Perform fuzzy matching
        matched_jobs = fuzzy_match(title, job_names)
        matched_job_names = [job[0] for job in matched_jobs]

        # Filter jobs based on matched job names
        filtered_jobs = [job for job in jobs if job['job_name'] in matched_job_names]

        return filtered_jobs
    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {e}")
