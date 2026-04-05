import spacy

nlp = spacy.load("en_core_web_sm")

SKILLS_DB = [
    "python", "django", "html", "css", "javascript",
    "sql", "git", "github", "rest api",
    "linux", "statistics", "machine learning","statistics"
    "data analysis", "pandas", "numpy","artificial intelligence","generative ai","aws"
]

def extract_skills(text):
    doc = nlp(text.lower())
    found_skills = set()

    for token in doc:
        for skill in SKILLS_DB:
            if skill in token.text:
                found_skills.add(skill)

    # Also check full text (important for multi-word skills)
    for skill in SKILLS_DB:
        if skill in text.lower():
            found_skills.add(skill)

    return list(found_skills)