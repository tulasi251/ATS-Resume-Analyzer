def calculate_score(resume_skills, jd_skills):
    resume_set = set(resume_skills)
    jd_set = set(jd_skills)

    matched = list(resume_set & jd_set)
    missing = list(jd_set - resume_set)

    if not jd_skills:
        return {
            "score": 0,
            "matched": [],
            "missing": [],
            "suggestions": []
        }

    # 🔥 Skill match weight (70%)
    skill_score = (len(matched) / len(jd_skills)) * 70

    # 🔥 Missing penalty
    penalty = len(missing) * 5

    # 🔥 Base score (ensures not too low)
    base_score = 20

    final_score = max(0, min(100, int(skill_score - penalty + base_score)))

    # 🔥 Suggestions (NEW)
    suggestions = []
    for skill in missing:
        suggestions.append(f"Add '{skill}' to your resume")

    return {
        "score": final_score,
        "matched": matched,
        "missing": missing,
        "suggestions": suggestions
    }