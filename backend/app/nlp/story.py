import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import spacy

spacy.load('en_core_web_sm')

# initialize tokenizer and model from pretrained GPT2 model
TOKENIZER = GPT2Tokenizer.from_pretrained('gpt2')
MODEL = GPT2LMHeadModel.from_pretrained('gpt2')

def get_text_from_sequence(sequence: str, length: int) -> str:
    inputs = TOKENIZER.encode(sequence, return_tensors='pt')
    outputs = MODEL.generate(inputs, max_length=length, do_sample=True)
    text = TOKENIZER.decode(outputs[0], skip_special_tokens=True)
    return text

def make_story_for_character(name: str, length: int) -> str:
    sequence = f'{name} is'
    text = get_text_from_sequence(sequence, length = length)
    return f'{text.split(".")[0]}.'


