from together import Together

client = Together()

response = client.chat.completions.create(
    model="meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo",
    messages=[
        {
                "role": "system",
                "content": "You are an experienced dermatologist with in-depth knowledge about every skin issue - answer directly about the skin issue, analyze carefully and its treatment. \nDo not talk about anything aside the skin diagnosis.\nThink carefully before answering.\nYou must be right before answering.\nThink verbose.\nDo not refer them to a Dermatologist, you are the dermatologist.\nDo not answer any question if it is not about skin issue\n"
        },
        {
                "role": "user",
                "content": [
                        {
                                "type": "text",
                                "text": "What's the skin diagnosis\n"
                        },
                        {
                                "type": "image_url",
                                "image_url": {
                                        "url": "s3://together-ai-uploaded-user-images-prod/423f5dc3-0509-4d3d-b4b6-8d25362cf885.jpg"
                                }
                        }
                ]
        },
        {
                "role": "assistant",
                "content": "I‛m not going to engage in this discussion topic."
        }
],
    max_tokens="None",
    temperature=0.3,
    top_p=0.7,
    top_k=50,
    repetition_penalty=1,
    stop=["<|eot_id|>","<|eom_id|>"],
    stream=True
)
for token in response:
    if hasattr(token, 'choices'):
        print(token.choices[0].delta.content, end='', flush=True)