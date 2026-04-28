from rest_framework import viewsets
from .models import Produto
# from .models import ProdutoImagem
# from .serializers import ProdutoImagemSerializer

from .serializers import ProdutoSerializer
from django.db.models import Q

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer

    def get_queryset(self):
        queryset = Produto.objects.filter(ativo=True)
        params = self.request.query_params

        search = params.get("search")
        if search:
            queryset = queryset.filter(nome__icontains=search)


        filtros_mapeados = {
            'categoria': 'categoria',
            'cor': 'cor',
            'ambiente': 'ambiente'
        }

        for param_name, field_name in filtros_mapeados.items():
            valores_raw = params.getlist(param_name)
            
            if valores_raw:
                lista_limpa = []
                for item in valores_raw:
                    lista_limpa.extend([val.strip() for val in item.split(",") if val.strip()])

                filtro_q = Q()
                for val in lista_limpa:
                    filtro_q |= Q(**{f"{field_name}__icontains": val})
                    
                    if val.lower().endswith('s'):
                        filtro_q |= Q(**{f"{field_name}__icontains": val[:-1]})
                
                queryset = queryset.filter(filtro_q)

        preco = params.get("preco")
        if preco:
            try:
                partes = preco.split("-")
                if len(partes) == 2:
                    min_preco, max_preco = partes
                    queryset = queryset.filter(preco__gte=min_preco, preco__lte=max_preco)
            except ValueError:
                pass

        destaque = params.get("destaque")
        if destaque and destaque.lower() == "true":
            queryset = queryset.filter(destaque=True)

        ordering = params.get("ordering")
        if ordering:
            queryset = queryset.order_by(ordering)
        else:
            queryset = queryset.order_by("-criado_em")

        return queryset


# class ProdutoImagemViewSet(viewsets.ModelViewSet):
#     queryset = ProdutoImagem.objects.all()
#     serializer_class = ProdutoImagemSerializer