import os

def get_target_areas() -> list:
    areas = os.environ.get('TARGET_AREAS', '中野区,新宿区')
    return [area.strip() for area in areas.split(',')]
