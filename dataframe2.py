import pandas as pd
import json

# Ler CSV
df = pd.read_csv('drive/Apresentações - Envio Apresentações2 - Apresentações - Envio Apresentações.csv.csv', header=1)

# Criar lookup rápido de Author -> ID
id_lookup = df.set_index('Authors')['ID'].to_dict()

# Carregar JSON existente (uma lista)
with open('saida.json', 'r', encoding='utf-8') as f:
    projects_list = json.load(f)  # lista de projetos

# Inicializar dicionário de grupos vazio
groups = {
    "G1 - Applications of thermoluminescence (dosimetry, dating, industrial, etc.)": [],
    "G2 - Dosimetry (environmental, personal, internal, external, computational, etc.)": [],
    "G3 - Ionizing and non-ionizing radiation": [],
    "G4 - Medical Physics": [],
    "G5 - Radiological Protection": [],
    "G6 - Radiation Sources": [],
    "G7 - Radiobiology": [],
    "G8 - Luminescent materials": []
}

# Função para determinar grupo baseado no título
def categorize_project(title):
    title_lower = title.lower()
    if any(k in title_lower for k in ['thermoluminescence', 'tl', 'osr']):
        return "G1 - Applications of thermoluminescence (dosimetry, dating, industrial, etc.)"
    elif any(k in title_lower for k in ['dosimetry', 'dose']):
        return "G2 - Dosimetry (environmental, personal, internal, external, computational, etc.)"
    elif any(k in title_lower for k in ['radiation', 'ionizing', 'non-ionizing']):
        return "G3 - Ionizing and non-ionizing radiation"
    elif any(k in title_lower for k in ['medical', 'hospital', 'mri', 'ct']):
        return "G4 - Medical Physics"
    elif any(k in title_lower for k in ['protection', 'shielding']):
        return "G5 - Radiological Protection"
    elif any(k in title_lower for k in ['source', 'generator', 'reactor']):
        return "G6 - Radiation Sources"
    elif any(k in title_lower for k in ['biology', 'cell', 'radiobiology']):
        return "G7 - Radiobiology"
    elif any(k in title_lower for k in ['material', 'luminescent', 'phosphor']):
        return "G8 - Luminescent materials"
    else:
        return "G1 - Applications of thermoluminescence (dosimetry, dating, industrial, etc.)"

# Preencher grupos
for proj in projects_list:
    author = proj['author'].strip()
    project_id = id_lookup.get(author, '')  # pega ID do CSV, se existir
    # Atualizar ID
    proj['project']['id'] = project_id
    
    # Se não tiver "presenter", adiciona como o mesmo do autor
    if 'presenter' not in proj:
        proj['presenter'] = proj['author']
    
    # Determinar grupo
    group_name = categorize_project(proj['project']['title'])
    
    # Adicionar ao grupo
    groups[group_name].append(proj)

# Salvar JSON agrupado
with open('saida2.json', 'w', encoding='utf-8') as f:
    json.dump(groups, f, ensure_ascii=False, indent=2)

print("JSON agrupado por grupos e IDs preenchidos!")
