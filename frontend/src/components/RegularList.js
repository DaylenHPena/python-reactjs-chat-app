import React from 'react'

export default function RegularList({ items, resourceName, itemComponent: ItemComponent }) {
    return (
        <>
            <ul className='list-unstyled mt-2'>
                {items.map((item, index) => (<ItemComponent key={index} {...{ [resourceName]: item }} />))}
            </ul>
        </>
    )
}
