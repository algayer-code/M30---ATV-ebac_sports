import Produto from '../components/Produto'
import * as S from './styles'
import { useGetProdutosQuery } from '../store/api'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Produto as ProdutoType } from '../types'

const ProdutosComponent = () => {
  const { data: produtos = [], isLoading, isError } = useGetProdutosQuery()
  const favoritos = useSelector((state: RootState) => state.cart.favorites)

  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    const IdsDosFavoritos = favoritos.map((f) => f.id)
    return IdsDosFavoritos.includes(produto.id)
  }

  if (isLoading) return <div>Carregando...</div>
  if (isError) return <div>Erro ao carregar produtos</div>

  return (
    <>
      <S.Produtos>
        {produtos.map((produto) => (
          <Produto
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
            key={produto.id}
            produto={produto}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
