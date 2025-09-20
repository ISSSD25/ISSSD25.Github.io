import json

# abre o arquivo JSON original
with open("data/posters.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# percorre os grupos e itens
for grupo, itens in data.items():
    for item in itens:
        # limpa profileImg
        item["profileImg"] = ""
        # limpa audioUrl e pdfUrl dentro do projeto
        if "project" in item:
            item["project"]["audioUrl"] = ""
            item["project"]["pdfUrl"] = ""

# salva o JSON atualizado
with open("data/posters.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✅ profileImg, audioUrl e pdfUrl foram limpos!")
