import React from 'react'

export const index = () => {
    const onAdd = (quantity) => {
        console.log(`Compraste ${quantity} productos`)
    }

  return (
    <>
        onAdd = { onAdd }
    </>
  )
}
