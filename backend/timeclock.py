from datetime import datetime

def time_between(start_time: str, end_time: str) -> list:
    start_time = datetime.strptime(start_time.replace("%20", " "), "%a, %d %b %Y %H:%M:%S %Z")
    end_time = datetime.strptime(end_time.replace("%20", " "), "%a, %d %b %Y %H:%M:%S %Z")
    difference = end_time - start_time
    days = difference.days
    hrs = difference.seconds // 3600
    mins = (difference.seconds % 3600) // 60
    return [days, hrs, mins]

def get_time() -> datetime:
    return datetime.now()