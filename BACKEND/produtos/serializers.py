from rest_framework import serializers
from .models import Produto
# ProdutoImagem



# class ProdutoImagemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ProdutoImagem
#         fields = ["url"]



class ProdutoSerializer(serializers.ModelSerializer):
    # imagens = ProdutoImagemSerializer(many=True)

    class Meta:
        model = Produto
        fields = "__all__"

    # def create(self, validated_data):
    #     imagens_data = validated_data.pop("imagens", [])
    #     produto = Produto.objects.create(**validated_data)

    #     for imagem in imagens_data:
    #         ProdutoImagem.objects.create(produto=produto, **imagem)

    #     return produto
