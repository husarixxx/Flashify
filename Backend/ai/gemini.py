import os
import google.generativeai as genai
from dotenv import load_dotenv
from typing import List, Dict, Literal
import random
import json

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


def generate_quizz(
        topic: str,
        num_of_questions: int = 10,
        question_types: list[Literal["multiple-choice", "single-choice", "true-false"]] = None

) -> List[Dict]:
    if question_types is None:
        question_types = ["multiple-choice", "single-choice", "true-false"]
    
    try:
        
        model = genai.GenerativeModel('gemini-2.5-pro')

        questions_per_type = {}
        base_count = num_of_questions // len(question_types)
        remainder = num_of_questions % len(question_types)

        for i , q_type in enumerate(question_types):
            questions_per_type[q_type] = base_count + (1 if i < remainder else 0)
        
        all_questions = []

        for q_type, count in questions_per_type.items():
            if count == 0:
                continue
                
            if q_type == "multiple-choice":
                prompt = f"""
                Generate {count} multiple-choice questions about {topic}.
                Format each question as valid JSON:
                {{
                    "question": "question text",
                    "type": "multiple-choice",
                    "answers": [
                        {{"text": "answer 1", "is_correct": false}},
                        {{"text": "answer 2", "is_correct": true}},
                        {{"text": "answer 3", "is_correct": true}},
                        {{"text": "answer 4", "is_correct": false}}
                    ]
                }}
                
                IMPORTANT: Multiple-choice means MORE THAN ONE correct answer is possible.
                Each question should have 4 answers with at least 2 correct answers.
                Return only a JSON array of questions.
                """
                
            elif q_type == "single-choice":
                prompt = f"""
                Generate {count} single-choice questions about {topic}.
                Format each question as valid JSON:
                {{
                    "question": "question text",
                    "type": "single-choice",
                    "answers": [
                        {{"text": "answer 1", "is_correct": false}},
                        {{"text": "answer 2", "is_correct": true}},
                        {{"text": "answer 3", "is_correct": false}},
                        {{"text": "answer 4", "is_correct": false}}
                    ]
                }}
                
                IMPORTANT: Single-choice means EXACTLY ONE correct answer.
                Each question should have 4 answers with only 1 correct answer.
                Return only a JSON array of questions.
                """
                
            else:  # true - false
                prompt = f"""
                Generate {count} true/false questions about {topic}.
                Format each question as valid JSON:
                {{
                    "question": "statement that is either true or false",
                    "type": "true-false",
                    "answers": [
                        {{"text": "True", "is_correct": true/false}},
                        {{"text": "False", "is_correct": true/false}}
                    ]
                }}
                
                Make sure one answer is correct and one is incorrect.
                Return only a JSON array of questions.
                """
            
            response = model.generate_content(prompt)
            
            
            try:
                # Clean 
                text = response.text.strip()
            
                start_idx = text.find('[')
                end_idx = text.rfind(']') + 1
                if start_idx != -1 and end_idx > start_idx:
                    json_text = text[start_idx:end_idx]
                    questions = json.loads(json_text)
                    all_questions.extend(questions[:count])
            except json.JSONDecodeError:
                print(f"Failed to parse JSON for {q_type}, trying fallback method")
                continue
       
        random.shuffle(all_questions)
        
        return all_questions[:num_of_questions]
        
    except Exception as e:
        print(f"Error occurred while creating quiz: {e}")
        return []