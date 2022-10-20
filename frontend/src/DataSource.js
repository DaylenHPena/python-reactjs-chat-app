import React from 'react'

export const DataSource = async (url) => {
    let response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
    })

    return await response.json()
}

rf