from django.shortcuts import render

def home(request):
    profile_data = {
        "name": "Danniela Adizas",
        "title": "Computer Science Student | Tech Enthusiast",
        "bio": "I’m a third-year Computer Science student passionate about building functional and beautiful digital experiences. I love diving into backend development and crafting UIs that tell a story.",
        "skills": ["Python", "TypeScript", "React", "Flutter", "PHP", "JavaScript", "HTML", "CSS"],
        "projects": [
            {"name": "Backpackers Hub", "description": "A travel community app using Firebase and FireAuth."},
            {"name": "RentMyPlace", "description": "An event venue and decoration rental platform for Region 8."},
            {"name": "Event Ticketing System", "description": "Web-based ticket platform using PHP, JS, and CSS."},
            {"name": "Online Hotel Booking", "description": "Flutter-based hotel reservation system."}
        ],
        "contact": {
            "email": "danniela@example.com",
            "github": "https://github.com/danniela",
            "linkedin": "https://linkedin.com/in/danniela"
        }
    }
    return render(request, 'portfolio/home.html', profile_data)
