import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key  = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("missing key")

genai.configure(api_key=api_key)

def generate_flashcards(topic : str, num_of_flashcards  : int  = 5) -> list[dict]:

    try:
        
        model = genai.GenerativeModel('gemini-2.5-pro')


        prompt = f"""
        Generate {num_of_flashcards} educational flashcards on the topic: {topic}.
        Answer shouldn`t be too long 
        Each flashcard should be in the following format:
        Question: ... | Answer: ...


        Example:
        Question: What is photosynthesis? | Answer: The process of producing energy by plants.
        """

        response = model.generate_content(prompt)


        flashcards = []
        lines = response.text.strip().split('\n')
        
        for line in lines:
            if '|' in line:
                parts = line.split('|', 1)
                if len(parts) == 2 :
                    question = parts[0].replace("Question:","").replace("*", "").strip()
                    answer = parts[1].replace("Answer:", "").replace("*","").strip()
                    flashcards.append({"question": question, "answer": answer})
        
        return flashcards[:num_of_flashcards]

    except Exception as e:
        print(f"Error occured while creating flashcards :{e}")
        return []    


