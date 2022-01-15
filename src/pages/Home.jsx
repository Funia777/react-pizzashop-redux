import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  Categories,
  SortPopup,
  PizzaBlock,
  PizzaLoadingBlock,
} from '../components'

import { setCategory, setSortBy } from '../redux/actions/filters'
import { fetchPizzas } from '../redux/actions/pizzas'
import { addPizzaToCart } from '../redux/actions/cart'

const catNames = ['Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']

const sorItems = [
  { name: 'популярности', type: 'popular', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавиту', type: 'name', order: 'asc' },
]

export default function Home() {
  const dispatch = useDispatch()
  const items = useSelector(({ pizzas }) => pizzas.items)
  const cartItems = useSelector(({ cart }) => cart.items)
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded)
  const { category, sortBy } = useSelector(({ filters }) => filters)

  useEffect(() => {
    dispatch(fetchPizzas(sortBy, category))
  }, [category, sortBy])

  const onSelectCategory = useCallback((type) => {
    dispatch(setCategory(type))
  }, [])

  const onSelectSortType = useCallback((index) => {
    dispatch(setSortBy(index))
  }, [])
  const handleAddPizzaToCart = (obj) => {
    dispatch(addPizzaToCart(obj))
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={catNames}
        />
        <SortPopup
          activeSortType={sortBy.type}
          items={sorItems}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? items.map((obj) => (
              <PizzaBlock
                onClickAddPizza={handleAddPizzaToCart}
                key={obj.id}
                addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                {...obj}
              />
            ))
          : Array(12)
              .fill(0)
              .map((_, index) => <PizzaLoadingBlock key={index} />)}
      </div>
    </div>
  )
}
