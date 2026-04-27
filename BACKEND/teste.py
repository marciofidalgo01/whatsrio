import os
import django
import json

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from produtos.models import Produto

FILE_NAME = "produtos.json"

with open(FILE_NAME, "r", encoding="utf-8") as file:
    produtos = json.load(file)

print(f"Iniciando a inserção de {len(produtos)} produtos...")

for item in produtos:
    dados = item["fields"]

    Produto.objects.create(
        nome=dados["nome"],
        preco=dados.get("preco"),
        descricao=dados.get("descricao", ""),
        ambiente=dados.get("ambiente"),
        cor=dados.get("cor"),
        categoria=dados["categoria"],
        imagem_url=dados.get("imagem_url") # Inserindo a URL diretamente no produto
    )

print("Inseridos com sucesso")

# import os
# import django
# import json
# import uuid

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
# django.setup()

# from produtos.models import Produto, ProdutoImagem
# from django.utils.text import slugify


# with open("produtos.json", "r", encoding="utf-8") as file:
#     produtos = json.load(file)

# mapa_produtos = {} 

# for item in produtos:
#     dados = item["fields"]

#     Produto.objects.create(
#         nome=dados["nome"],
#         preco=dados["preco"],
#         # destaque=dados.get("destaque", False),
#         descricao=dados.get("descricao", ""),
#         ambiente=dados.get("ambiente"),
#         cor=dados.get("cor"),
#         categoria=dados["categoria"],
       
#     )

#     # produto, criado = Produto.objects.update_or_create(
#     #     sku=dados["sku"],
#     #     defaults={
#     #         "nome": dados["nome"],
#     #         "preco": dados["preco"],
#     #         "estoque": dados.get("estoque", 0),
#     #         "ativo": dados.get("ativo", True),
#     #         "destaque": dados.get("destaque", False),
#     #         "descricao": dados.get("descricao", ""),
#     #         "categoria": categoria,
#     #     }
#     # )

#     # if criado:
#     #     produto.slug = f"{slugify(dados['nome'])}-{uuid.uuid4().hex[:6]}"
#     #     produto.save()



# with open("imagens.json", "r", encoding="utf-8") as file:
#     imagens = json.load(file)

# for item in imagens:
#     dados = item["fields"]

#     try:
#         produto = Produto.objects.get(id=dados["produto"])
#     except Produto.DoesNotExist:
#         print(f"Produto ID {dados['produto']} não encontrado")
#         continue

#     ProdutoImagem.objects.get_or_create(
#         produto=produto,
#         url=dados["url"]
#     )
# print("Inseridos com sucesso")

