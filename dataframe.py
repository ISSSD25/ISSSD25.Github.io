import pandas as pd
import json

# 1. Ler a planilha (se for CSV exportado do Google Forms)
df = pd.read_csv("drive/Poster Online Form (Responses) - Form responses 1.csv")

# Lista que vai armazenar todos os projetos
projects = []

for _, row in df.iterrows():
    project_data = {
        "isWinner": False,
        "author": row["Full name"],  # Nome do autor
        "profileImg": row["Insert a profile picture"],  # Caminho da imagem
        "project": {
            "id": "",  # Pode ser preenchido depois
            "title": row["Title of work"],  # Título do trabalho
            "description": " ",  # sempre vazio
            "audioUrl": row["Audio"],  # Caminho do áudio
            "pdfUrl": row["Poster Presentation"]  # Caminho do PDF
        }
    }
    projects.append(project_data)

# Salvar em JSON
with open("saida.json", "w", encoding="utf-8") as f:
    json.dump(projects, f, indent=4, ensure_ascii=False)

print("Arquivo JSON gerado com sucesso!")