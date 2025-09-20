import json
import re

# Carregue seu JSON (substitua pelo caminho correto do arquivo se necessário)
with open("data/posters.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Regex para capturar o ID do PDF
id_pattern = re.compile(r"(G\d{2}-\d{3})")

# Percorrer todos os grupos e projetos
for group_name, projects in data.items():
    for project_entry in projects:
        pdf_url = project_entry["project"].get("pdfUrl", "")
        match = id_pattern.search(pdf_url)
        if match:
            project_entry["project"]["id"] = match.group(1)
        else:
            # Se não encontrar, deixa vazio (ou já estava vazio)
            project_entry["project"]["id"] = project_entry["project"].get("id", "")

# Salvar o JSON atualizado
with open("posters_updated.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("JSON atualizado com IDs extraídos do pdfUrl!")
