import datetime

def time_between(start_time=datetime.datetime.now(), end_time=datetime.datetime.now()):
    difference = end_time - start_time
    days = difference.days
    hrs = difference.seconds // 3600
    mins = (difference.seconds % 3600) // 60
    secs = (difference.seconds % 60)
    return (days, hrs, mins, secs)

def get_time():
    return datetime.datetime.now()