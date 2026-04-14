from rest_framework.routers import DefaultRouter
from .views import ProdutoViewSet, ProdutoImagemViewSet

router = DefaultRouter()
router.register(r'produtos', ProdutoViewSet)
router.register(r'produtosimg', ProdutoImagemViewSet)

# http://127.0.0.1:8000/api/produtos/delete/1
#  para deletar um produto de ID específico

urlpatterns = router.urls