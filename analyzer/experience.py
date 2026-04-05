import re

def extract_experience(text):
    text = text.lower()

    # Match patterns like "2 years", "3+ years"
    matches = re.findall(r'(\d+)\+?\s*years?', text)

    if matches:
        return max([int(x) for x in matches])  # take highest value

    return 0
def extract_education(text):
    text = text.lower()

    if "b.tech" in text or "bachelor" in text:
        return "Bachelor's Degree"
    elif "m.tech" in text or "master" in text:
        return "Master's Degree"
    elif "phd" in text:
        return "PhD"
    
    return "Not Found"