<h1>
 <img src="./Frontend/src/assets/flashify.png" alt="Flashify" width="250" height="250"/>
</h1>

**Flashify** was created to make learning easier. Thanks to combining manual learning with AI tools, you can spend less time on preparing learning materials and focus on actual learning.

Flashify has 3 main features:
* Flashcards
* Quizzes
* Notes 


<h2>🚀 Used stack</h2>
<div align="left">
 <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/JavaScript.svg" alt="javascript" width="45" height="45"/>
 <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/HTML.svg" alt="html" width="45" height="45"/>
 <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/CSS.svg" alt="css" width="45" height="45"/>
 <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/React-Dark.svg" alt="react" width="45" height="45"/>
 <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/TailwindCSS-Dark.svg" alt="tailwind" width="45" height="45"/>
 <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/Figma-Dark.svg" alt="figma" width="45" height="45"/>
 <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/Python-Dark.svg" alt="python" width="45" height="45"/>
 <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/FastAPI.svg" alt="fastapi" width="45" height="45"/>
 <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/Git.svg" alt="git" width="45" height="45"/>
 <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/VSCode-Dark.svg" alt="vsc" width="45" height="45"/>
</div>

<h2>⚙️ Setup guide</h2>

**Clone the repository**

```bash
git clone git@github.com:husarixxx/Flashify.git
cd ./Flashify
```

 <h3>Frontend</h3>
 
 1. Install dependencies and run server
    ```bash
     cd ./Frontend
     npm install
     npm run dev
     ```
    App will be available at http://localhost:5173

 <h3>Backend</h3>

1. Create environment and install dependencies
    **Linux(bash)**
     ```bash
    cd ./Backend
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```
    **Windows(cmd)**
    ```cmd
    cd ./Backend
    python -m venv venv
    venv\Scripts\activate.bat
    pip install -r requirements.txt
    ```

2. Set up environment variables
    * Create file .env
    * Copy code from .env.example
    * Set GEMINI_API_KEY from Google AI Studio
    * Set SECRET_KEY as you like

3. Run server
    ```bash
    uvicorn backend.main:app --reload
    ```
    App will be available at http://127.0.0.1:8000/docs


## 👥Team

Frontend - [Dawid Gorszka](https://github.com/dawidtt)

Backend - [Jan Kaszuba](https://github.com/husarixxx)

