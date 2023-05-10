import { useEffect, useState } from 'react'

export const ItemCount = ( { initial, onAdd } ) => {
    const [count, setCount] = useState(parseInt(initial));

    const decrease = () => {
        setCount(count - 1);
    }

    const increase = () => {
        setCount(count + 1);
    }

    useEffect(() => {
      setCount(parseInt(initial));
    }, [initial])
    

  return (
    <div className='counter'>
        <button disabled={count <= 1} onClick={decrease}> - </button>
        <button onClick={increase}> + </button>
        <div>
            <button disabled={count <= 0} onClick={() => onAdd(count)}>Agregar al carrito</button>
        </div>
    </div>
  )
}
