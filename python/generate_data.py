import random
import pymongo

def generate_task(description: str, complete: bool, user_assigned: str, due_date: str, days_to_complete: int):
    return{
        "description" : description,
        "complete" : complete,
        "userAssigned" : user_assigned,
        "dueDate" : due_date,
        "estimatedDaysToComplete" : days_to_complete
    }

def generate_project(name, team_members: list[str], team_size: int, budget: int, workload: int, days_to_complete: int, task_ids: list[str] = []):
    return{
        "name" : name,
        "teamMembers" : team_members,
        "teamSize" : team_size,
        "budget" : budget,
        "workload" : workload,
        "daysToComplete" : days_to_complete,
        "taskIds" : task_ids
    }

def generate_one_thousand_projects():
    projects = []
    for _ in range(1000):
        name = ""
        team_members = []
        team_size = random.randint(1,10)
        budget = random.randint(1000, 15000)
        workload = random.choice([1, 2, 3, 5, 8, 13])
        days_to_complete = random.randint(3, 100)
        projects.append(generate_project(name, team_members, team_size, budget, workload, days_to_complete))

    return projects


if __name__ == '__main__':
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["project_management"]
    collection = db["projects"]

    projects = generate_one_thousand_projects()
    collection.insert_many(projects)

