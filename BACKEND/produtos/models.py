from django.db import models
from django.db.models import Q


class Produto(models.Model):
    nome = models.CharField(max_length=250)

    categoria = models.CharField(max_length=100)

    ambiente = models.CharField(
        max_length=100,
        null=True,
        blank=True
    )

    cor = models.CharField(
        max_length=50,
        null=True,
        blank=True
    )

    descricao = models.TextField()

    preco = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )

    imagem_url = models.URLField(
        max_length=500, 
        null=True, 
        blank=True
    )

    destaque = models.BooleanField(default=False)
    ativo = models.BooleanField(default=True)

    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-criado_em"]

    def __str__(self):
        return f"{self.nome} ({self.descricao})"

# class ProdutoImagem(models.Model):
#     produto = models.ForeignKey(
#         Produto,
#         on_delete=models.CASCADE,
#         related_name="imagens"
#     )

#     url = models.URLField()

#     def __str__(self):
#         return f"Imagem de {self.produto.nome}"
    
def filtrar_produtos(request):
    produtos = Produto.objects.all()

    categorias = request.GET.getlist("categoria")
    ambientes = request.GET.getlist("ambiente")
    cores = request.GET.getlist("cor")

    if categorias:
        produtos = produtos.filter(categoria__in=categorias)

    if ambientes:
        produtos = produtos.filter(ambiente__in=ambientes)

    if cores:
        q_cor = Q()
        for c in cores:
            q_cor |= Q(cor__icontains=c.strip())
        produtos = produtos.filter(q_cor)

    return produtos